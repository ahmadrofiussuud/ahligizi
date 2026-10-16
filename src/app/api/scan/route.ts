import { AI_MODEL, aiFailure, aiResponse, analyzeFood, readAIRequest } from '@/lib/cekat-ai';
export const maxDuration = 60;
export async function POST(request: Request) {
  try {
    const body = await readAIRequest(request);
    return aiResponse({ success: true, source: AI_MODEL, data: await analyzeFood(body.image_base64) });
  } catch (error) { return aiFailure(error); }
}

