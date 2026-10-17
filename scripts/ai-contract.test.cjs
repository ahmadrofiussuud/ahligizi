const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const source = fs.readFileSync('src/lib/cekat-ai.ts','utf8');
const compiled = ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
const guidelineExports={};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/lib/scan-guidelines.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText,{exports:guidelineExports});
function load(fetchImpl, key='test-key') {
  const exports={};
  vm.runInNewContext(compiled,{exports,require:(id)=>id==='./scan-guidelines'?guidelineExports:({NextResponse:{json:(body,init)=>({body,...init})}}),process:{env:{GEMINI_API_KEY:key}},fetch:fetchImpl,Buffer,AbortSignal,Date,Map});
  return exports;
}
const photo='data:image/png;base64,'+fs.readFileSync('public/images/logo C cekat.png').toString('base64');
const observation={classification:'non_food',detected_object:'Logo hijau',confidence:'tinggi',items:[],calories:42,protein_g:2,carbs_g:4,fat_g:1,fiber_g:0,health_verdict:'baik',recommendations:[{guideline_id:'diabetes',action:'Pilih sumber serat.',reason:'Lengkapi variasi pangan.'},{guideline_id:'hypertension',action:'Batasi tambahan garam.',reason:'Natrium tidak terlihat dari foto.'}],notes:'Terlihat logo.',suggestion:'Foto makanan.'};
const provider=body=>async()=>({ok:true,status:200,json:async()=>({candidates:[{finishReason:'STOP',content:{parts:[{text:JSON.stringify(body)}]}}]})});

test('All four food verdicts survive validation and are advertised in the provider schema',async()=>{
  for (const verdict of ['sangat_baik','baik','cukup','kurang']) {
    const response = provider({...observation,classification:'food',health_verdict:verdict,items:[{name:'Hidangan',portion_estimate:'200 gram'}]});
    const ai=load(async(url,options)=>{
      const request=JSON.parse(options.body);
      assert.ok(request.generationConfig.responseSchema.properties.health_verdict.enum.includes(verdict));
      return response();
    });
    assert.equal((await ai.analyzeFood(photo)).health_verdict,verdict);
  }
});

test('A non-food or uncertain photo cannot receive even the highest food verdict',async()=>{
  for (const classification of ['non_food','uncertain']) {
    const data=await load(provider({...observation,classification,health_verdict:'sangat_baik'})).analyzeFood(photo);
    assert.equal(data.health_verdict,'belum_dinilai');
    assert.equal(data.calories,null);
    assert.equal(data.detected_object,'Logo hijau');
    assert.equal(data.is_food,false);assert.equal(data.recommendations.length,0);
  }
});
test('Missing key fails rather than fabricating a successful analysis',async()=>{
  const ai=load(()=>{throw new Error('must not call');},'');
  await assert.rejects(ai.analyzeFood(photo),error=>error.status===503);
});

test('Drink volume keeps ml and bare numeric portions are rejected',async()=>{
  const drink={...observation,classification:'food',items:[{name:'Air mineral',portion_estimate:'1 botol (330 ml)'}],calories:0,protein_g:0,carbs_g:0,fat_g:0,fiber_g:0};
  const data=await load(provider(drink)).analyzeFood(photo);
  assert.equal(data.portion_estimate,'1 botol (330 ml)');
  assert.equal(data.calories,0);
  await assert.rejects(load(provider({...drink,items:[{name:'Air mineral',portion_estimate:'330'}]})).analyzeFood(photo),e=>e.status===502);
});
test('Provider failure is not classified as a non-food photograph',async()=>{
  const ai=load(async()=>({ok:false,status:500}));
  await assert.rejects(ai.analyzeFood(photo),error=>error.status===503);
});
test('Timeout or connection failure has no dummy answer',async()=>{
  const ai=load(async()=>{throw new Error('network');});
  await assert.rejects(ai.analyzeFood(photo),error=>error.status===503);
});
test('Rate limited provider is a real error',async()=>{
  const ai=load(async()=>({ok:false,status:429}));
  await assert.rejects(ai.analyzeFood(photo),error=>error.status===429);
});
test('Non-food keeps object prediction but never nutrients',async()=>{
  const data=await load(provider(observation)).analyzeFood(photo);
  assert.equal(data.detected_object,'Logo hijau');assert.equal(data.calories,null);assert.equal(data.protein_g,null);assert.equal(data.is_food,false);assert.equal(data.health_verdict,'belum_dinilai');
});
test('Food with zero fat retains actual zero, not example numbers',async()=>{
  const data=await load(provider({...observation,classification:'food',items:[{name:'Air',portion_estimate:'200 ml'}],calories:0,fat_g:0})).analyzeFood(photo);
  assert.equal(data.calories,0);assert.equal(data.fat_g,0);assert.equal(data.is_food,true);
});
test('Negative nutrients and missing classification are rejected',async()=>{
  await assert.rejects(load(provider({...observation,classification:'food',calories:-1,items:[{name:'Nasi',portion_estimate:'100 gram'}]})).analyzeFood(photo),e=>e.status===502);
  await assert.rejects(load(provider({items:[]})).analyzeFood(photo),e=>e.status===502);
});
test('Malformed images rejected before provider request',async()=>{
  const ai=load(()=>{throw new Error('must not call');});
  await assert.rejects(ai.analyzeFood('data:image/png;base64,aGVsbG8='),e=>e.status===400);
  await assert.rejects(ai.analyzeFood(undefined),e=>e.status===400);
});
test('Truncated answer is rejected and errors cannot be cached',async()=>{
  const ai=load(async()=>({ok:true,status:200,json:async()=>({candidates:[{finishReason:'MAX_TOKENS',content:{parts:[{text:'partial'}]}}]})}));
  await assert.rejects(ai.generateAI('instruction',[]),e=>e.status===502);
  const result=ai.aiFailure(new ai.AIError(503,'Coba lagi'));
  assert.equal(result.status,503);assert.equal(result.body.success,false);assert.match(result.headers['Cache-Control'],/no-store/);
});

test('Food advice is required and citations are controlled by the server',async()=>{
  const food={...observation,classification:'food',items:[{name:'Nasi',portion_estimate:'100 g'}]};
  const data=await load(provider({...food,recommendations:food.recommendations.map(x=>({...x,source:{title:'FAKE',pages:'999'}}))})).analyzeFood(photo);
  assert.match(data.recommendations[0].source.title,/PERKENI/);
  assert.equal(data.recommendations[0].source.pages,'75, 79');
  await assert.rejects(load(provider({...food,recommendations:[]})).analyzeFood(photo),e=>e.status===502);
  await assert.rejects(load(provider({...food,recommendations:[{guideline_id:'fake_source',action:'A',reason:'B'},food.recommendations[1]]})).analyzeFood(photo),e=>e.status===502);
});
