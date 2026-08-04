// Formula Mifflin-St Jeor calculation for BMR and TDEE (Daily Calorie Target)
export interface UserHealthProfile {
  weight_kg: number;
  height_cm: number;
  age: number;
  gender: 'male' | 'female';
  activity_level: 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active';
}

export function calculateDailyCalorieTarget(profile: UserHealthProfile): {
  bmr: number;
  tdee: number;
  protein_target_g: number;
  carbs_target_g: number;
  fat_target_g: number;
} {
  const { weight_kg, height_cm, age, gender, activity_level } = profile;

  // BMR Formula (Mifflin-St Jeor)
  // Men: BMR = (10 × weight) + (6.25 × height) - (5 × age) + 5
  // Women: BMR = (10 × weight) + (6.25 × height) - (5 × age) - 161
  let bmr = 10 * weight_kg + 6.25 * height_cm - 5 * age;
  if (gender === 'male') {
    bmr += 5;
  } else {
    bmr -= 161;
  }

  // Activity Multipliers
  const activityMultipliers: Record<string, number> = {
    sedentary: 1.2, // Jarang berolahraga
    lightly_active: 1.375, // Olahraga ringan 1-3x/minggu
    moderately_active: 1.55, // Olahraga sedang 3-5x/minggu
    very_active: 1.725, // Olahraga berat 6-7x/minggu
  };

  const multiplier = activityMultipliers[activity_level] || 1.375;
  const tdee = Math.round(bmr * multiplier);

  // Macro Targets: Protein 30%, Carbs 45%, Fat 25%
  const protein_target_g = Math.round((tdee * 0.3) / 4);
  const carbs_target_g = Math.round((tdee * 0.45) / 4);
  const fat_target_g = Math.round((tdee * 0.25) / 9);

  return {
    bmr: Math.round(bmr),
    tdee,
    protein_target_g,
    carbs_target_g,
    fat_target_g,
  };
}
