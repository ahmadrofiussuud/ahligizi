import { NextResponse } from 'next/server';

// 10 Badges data & criteria definitions without raw Emojis
export const BADGES = [
  { id: 'b1', name: 'First Scan', description: 'Mencatat makanan pertama kali di NutriSnap', icon: '📸', criteria: 'Log 1 makanan' },
  { id: 'b2', name: '7-Day Warrior', description: 'Streak mencatat makanan selama 7 hari berturut-turut', icon: '🔥', criteria: 'Streak 7 hari' },
  { id: 'b3', name: '30-Day Legend', description: 'Streak mencatat makanan selama 30 hari berturut-turut', icon: '👑', criteria: 'Streak 30 hari' },
  { id: 'b4', name: 'Food Explorer', description: 'Mencatat minimal 20 jenis makanan yang berbeda', icon: '🧭', criteria: 'Scan 20 makanan berbeda' },
  { id: 'b5', name: 'Protein Boss', description: 'Memenuhi target protein harian 5 hari berturut-turut', icon: '💪', criteria: 'Target protein 5 hari berturut' },
  { id: 'b6', name: 'Early Bird', description: 'Mencatat sarapan pagi sebelum jam 09:00 WIB sebanyak 5 kali', icon: '🌅', criteria: '5x Sarapan pagi cepat' },
  { id: 'b7', name: 'Sehat Selalu', description: 'Mendapat penilaian makanan "baik" sebanyak 10 kali', icon: '🥗', criteria: '10x Penilaian sehat/baik' },
  { id: 'b8', name: 'Hydration Hero', description: 'Mencatat asupan air putih harian lengkap', icon: '💧', criteria: 'Target air minum terpenuhi' },
  { id: 'b9', name: 'Clean Eater', description: 'Menghindari makanan olahan berat selama 7 hari', icon: '🍎', criteria: '7 hari log gizi murni' },
  { id: 'b10', name: 'Midnight Snack', description: 'Mencatat camilan malam hari di atas jam 22:00 WIB', icon: '🦉', criteria: 'Log makan malam larut' }
];

// Helper to determine Level name based on points
export function getLevelName(points: number): string {
  if (points >= 1000) return 'Diamond Star';
  if (points >= 600) return 'Platinum Champion';
  if (points >= 300) return 'Gold Elite';
  if (points >= 100) return 'Silver Challenger';
  return 'Bronze Rookie';
}

// Helper to check user progress to next level
export function getLevelProgress(points: number) {
  let min = 0;
  let max = 100;
  if (points >= 1000) { min = 1000; max = 5000; }
  else if (points >= 600) { min = 600; max = 1000; }
  else if (points >= 300) { min = 300; max = 600; }
  else if (points >= 100) { min = 100; max = 300; }

  const percent = Math.min(100, Math.round(((points - min) / (max - min)) * 100));
  return { min, max, percent };
}

// In-Memory Database store for user gamification states since DB connection is optional/mocked
let points = 240;
let currentStreak = 5;
let longestStreak = 12;
let earnedBadgeIds = ['b1', 'b6', 'b8'];
let isPrivate = false;

// Mock Community Leaderboard without raw emojis
let communityLeaderboard = [
  { rank: 1, name: 'Budi Santoso', points: 1450, streak: 35, avatar: 'B', isPrivate: false },
  { rank: 2, name: 'Siti Rahma', points: 920, streak: 21, avatar: 'S', isPrivate: false },
  { rank: 3, name: 'Rizky Fitrianto (Kamu)', points: 240, streak: 5, avatar: 'R', isPrivate: false },
  { rank: 4, name: 'Andi Wijaya', points: 180, streak: 8, avatar: 'A', isPrivate: false },
];

export async function GET() {
  const levelName = getLevelName(points);
  const progress = getLevelProgress(points);

  // Map badges with earned status
  const badgesList = BADGES.map((b) => ({
    ...b,
    earned: earnedBadgeIds.includes(b.id),
    earned_at: earnedBadgeIds.includes(b.id) ? '2026-08-01' : null
  }));

  // Sync current user points in leaderboard
  communityLeaderboard = communityLeaderboard.map((item) => {
    if (item.name.includes('Kamu')) {
      return {
        ...item,
        name: isPrivate ? 'Pengguna Anonim' : 'Rizky Fitrianto (Kamu)',
        points: points,
        streak: currentStreak
      };
    }
    return item;
  });

  return NextResponse.json({
    points,
    current_streak: currentStreak,
    longest_streak: longestStreak,
    level: levelName,
    progress,
    badges: badgesList,
    leaderboard: communityLeaderboard,
    is_private: isPrivate
  });
}

// API to toggle privacy mode
export async function PATCH(req: Request) {
  try {
    const { toggle_privacy, add_points, add_streak } = await req.json();

    if (toggle_privacy !== undefined) {
      isPrivate = toggle_privacy;
    }
    if (add_points) {
      points += add_points;
    }
    if (add_streak) {
      currentStreak += add_streak;
      if (currentStreak > longestStreak) {
        longestStreak = currentStreak;
      }
    }

    return NextResponse.json({ success: true, points, current_streak: currentStreak, is_private: isPrivate });
  } catch (err) {
    return NextResponse.json({ error: 'Gagal mengubah pengaturan' }, { status: 500 });
  }
}
export { earnedBadgeIds, points as userPoints, currentStreak as userStreak };
