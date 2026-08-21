// Formula Mifflin-St Jeor calculation for BMR and TDEE with PTM (Penyakit Tidak Menular) Clinical Focus

export type PtmFocus = 'obesity_management' | 'blood_sugar_control' | 'hypertension_prevention';

export interface UserHealthProfile {
  name?: string;
  weight_kg: number;
  height_cm: number;
  age: number;
  gender: 'male' | 'female';
  activity_level: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active';
  ptm_focus?: PtmFocus;
}

export interface PtmProfileDetail {
  title: string;
  badge: string;
  description: string;
  diet_protocol: string;
  ggl_guideline: {
    sugar_limit: string;
    salt_limit: string;
    fat_limit: string;
  };
  priority_actions: string[];
}

export const PTM_DETAILS: Record<PtmFocus, PtmProfileDetail> = {
  obesity_management: {
    title: 'Manajemen Obesitas (Penurunan BB)',
    badge: 'Fokus Medis: Pengendalian Berat Badan & IMT',
    description: 'Program defisit energi terstruktur dengan makronutrisi seimbang untuk menurunkan lemak visceral secara aman dan bertahap.',
    diet_protocol: 'Defisit Terkontrol (-350 s/d -500 kcal/hari) + Tinggi Serat (>25g/hari)',
    ggl_guideline: {
      sugar_limit: 'Maks. 25g (2 sdm) / hari',
      salt_limit: 'Maks. 5g (1 sdt garam) / hari',
      fat_limit: 'Maks. 45-50g (3-4 sdm minyak) / hari, hindari trans-fat',
    },
    priority_actions: [
      'Ganti camilan manis/gorengan dengan buah segar atau kacang panggang',
      'Minum 1 gelas air putih 15 menit sebelum makan untuk mengontrol nafsu makan',
      'Aktivitas fisik kardio moderat 30-45 menit minimal 4 kali seminggu',
    ],
  },
  blood_sugar_control: {
    title: 'Kontrol Gula Darah (Pencegahan Diabetes)',
    badge: 'Fokus Medis: Pencegahan Prediabetes & Hiperglikemia',
    description: 'Stabilisasi respons insulin melalui pengaturan indeks glikemik rendah, karbohidrat kompleks, dan pembagian waktu makan teratur.',
    diet_protocol: 'Karbohidrat Kompleks Rendah GI (35-40%) + Protein Cukup + Waktu Makan Teratur',
    ggl_guideline: {
      sugar_limit: 'Maks. 15-20g / hari (Hindari sirup, boba, soda, & pemanis buatan berlebih)',
      salt_limit: 'Maks. 5g / hari',
      fat_limit: 'Maks. 50g / hari, utamakan MUFA & PUFA (Alpukat, Ikan)',
    },
    priority_actions: [
      'Zero Sugar Drink Challenge: Hindari minuman manis dalam kemasan selama 7 hari',
      'Terapkan metode "Piring T": 1/2 sayur non-tepung, 1/4 protein, 1/4 karbo kompleks',
      'Jalan santai 10-15 menit setelah makan besar untuk menekan lonjakan glukosa darah',
    ],
  },
  hypertension_prevention: {
    title: 'Pemeliharaan Tensi (Pencegahan Hipertensi)',
    badge: 'Fokus Medis: Regulasi Tekanan Darah (Pola DASH)',
    description: 'Pencegahan hipertensi dan komplikasi vaskular dengan prinsip diet DASH (Dietary Approaches to Stop Hypertension), kaya kalium, kalsium, dan magnesium.',
    diet_protocol: 'Pola Diet DASH + Restriksi Natrium (< 2.000 mg Na / hari) + Tinggi Kalium',
    ggl_guideline: {
      sugar_limit: 'Maks. 25g / hari',
      salt_limit: 'Ketat: Maks. 3-4g (<1 sdt garam dapur) / hari, batasi kecap & vetsin',
      fat_limit: 'Maks. 40g / hari, hindari santan kental & makanan ultra-proses',
    },
    priority_actions: [
      'Gunakan rempah aromatik (bawang putih, jahe, kunyit) sebagai pengganti MSG/garam',
      'Tingkatkan asupan makanan kaya kalium (pisang, bayam, kentang rebus, tomat)',
      'Batasi makanan olahan, kornet, sosis, mie instan, dan keripik asin',
    ],
  },
};

export function calculateDailyCalorieTarget(profile: UserHealthProfile): {
  bmr: number;
  tdee: number;
  adjusted_calorie_target: number;
  protein_target_g: number;
  carbs_target_g: number;
  fat_target_g: number;
  fiber_target_g: number;
  imt: number;
  imt_category: 'Kekurangan BB' | 'Normal' | 'Kelebihan BB' | 'Obesitas';
  ptm_detail: PtmProfileDetail;
} {
  const { weight_kg, height_cm, age, gender, activity_level, ptm_focus = 'obesity_management' } = profile;

  // IMT Calculation
  const heightInMeters = height_cm / 100;
  const imt = parseFloat((weight_kg / (heightInMeters * heightInMeters)).toFixed(1));
  
  let imt_category: 'Kekurangan BB' | 'Normal' | 'Kelebihan BB' | 'Obesitas' = 'Normal';
  if (imt < 18.5) imt_category = 'Kekurangan BB';
  else if (imt < 23) imt_category = 'Normal';
  else if (imt < 25) imt_category = 'Kelebihan BB';
  else imt_category = 'Obesitas';

  // BMR Formula (Mifflin-St Jeor)
  let bmr = 10 * weight_kg + 6.25 * height_cm - 5 * age;
  if (gender === 'male') {
    bmr += 5;
  } else {
    bmr -= 161;
  }

  // Activity Multipliers
  const activityMultipliers: Record<string, number> = {
    sedentary: 1.2,
    lightly_active: 1.375,
    moderately_active: 1.55,
    very_active: 1.725,
  };

  const multiplier = activityMultipliers[activity_level] || 1.375;
  const tdee = Math.round(bmr * multiplier);

  // Calorie & Macro adjustments based on PTM Focus
  let adjusted_calorie_target = tdee;
  let proteinPercent = 0.25;
  let carbsPercent = 0.50;
  let fatPercent = 0.25;
  let fiber_target_g = 25;

  if (ptm_focus === 'obesity_management') {
    // Deficit for weight management, high protein to preserve lean mass
    adjusted_calorie_target = Math.max(1200, Math.round(tdee - (imt >= 25 ? 450 : 250)));
    proteinPercent = 0.30;
    carbsPercent = 0.45;
    fatPercent = 0.25;
    fiber_target_g = 30;
  } else if (ptm_focus === 'blood_sugar_control') {
    // Lower carb, higher healthy fat & protein for glycemic control
    adjusted_calorie_target = Math.max(1300, Math.round(tdee - (imt >= 25 ? 300 : 0)));
    proteinPercent = 0.30;
    carbsPercent = 0.40;
    fatPercent = 0.30;
    fiber_target_g = 32;
  } else if (ptm_focus === 'hypertension_prevention') {
    // DASH style balanced macros
    adjusted_calorie_target = Math.max(1300, Math.round(tdee - (imt >= 25 ? 250 : 0)));
    proteinPercent = 0.25;
    carbsPercent = 0.50;
    fatPercent = 0.25;
    fiber_target_g = 30;
  }

  const protein_target_g = Math.round((adjusted_calorie_target * proteinPercent) / 4);
  const carbs_target_g = Math.round((adjusted_calorie_target * carbsPercent) / 4);
  const fat_target_g = Math.round((adjusted_calorie_target * fatPercent) / 9);

  return {
    bmr: Math.round(bmr),
    tdee,
    adjusted_calorie_target,
    protein_target_g,
    carbs_target_g,
    fat_target_g,
    fiber_target_g,
    imt,
    imt_category,
    ptm_detail: PTM_DETAILS[ptm_focus],
  };
}

