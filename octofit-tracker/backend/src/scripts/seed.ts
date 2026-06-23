import mongoose from 'mongoose';
import { Activity } from '../models/Activity';
import { Leaderboard } from '../models/Leaderboard';
import { Team } from '../models/Team';
import { User } from '../models/User';
import { Workout } from '../models/Workout';

const mongoUri = 'mongodb://127.0.0.1:27017/octofit_db';

async function seed() {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(mongoUri);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const teams = await Team.insertMany([
    {
      name: 'Pulse Runners',
      city: 'Pune',
      motto: 'Own every kilometer',
      focusArea: 'Endurance training',
      weeklyGoalMinutes: 420,
    },
    {
      name: 'Iron Bloom',
      city: 'Bengaluru',
      motto: 'Stronger every set',
      focusArea: 'Strength and hypertrophy',
      weeklyGoalMinutes: 360,
    },
    {
      name: 'Core Crew',
      city: 'Mumbai',
      motto: 'Balance, breathe, build',
      focusArea: 'Mobility and core stability',
      weeklyGoalMinutes: 300,
    },
  ]);

  const users = await User.insertMany([
    {
      fullName: 'Aarav Mehta',
      email: 'aarav.mehta@octofit.dev',
      age: 29,
      heightCm: 178,
      weightKg: 74,
      teamName: teams[0].name,
      fitnessLevel: 'advanced',
    },
    {
      fullName: 'Nisha Kulkarni',
      email: 'nisha.kulkarni@octofit.dev',
      age: 26,
      heightCm: 165,
      weightKg: 61,
      teamName: teams[1].name,
      fitnessLevel: 'intermediate',
    },
    {
      fullName: 'Rohan Iyer',
      email: 'rohan.iyer@octofit.dev',
      age: 33,
      heightCm: 182,
      weightKg: 82,
      teamName: teams[0].name,
      fitnessLevel: 'intermediate',
    },
    {
      fullName: 'Mira Shah',
      email: 'mira.shah@octofit.dev',
      age: 31,
      heightCm: 170,
      weightKg: 66,
      teamName: teams[2].name,
      fitnessLevel: 'beginner',
    },
    {
      fullName: 'Dev Patel',
      email: 'dev.patel@octofit.dev',
      age: 28,
      heightCm: 176,
      weightKg: 72,
      teamName: teams[1].name,
      fitnessLevel: 'advanced',
    },
  ]);

  await Activity.insertMany([
    {
      userName: users[0].fullName,
      teamName: users[0].teamName,
      activityType: 'Tempo Run',
      durationMinutes: 55,
      caloriesBurned: 640,
      distanceKm: 9.4,
      performedAt: new Date('2026-06-18T06:10:00.000Z'),
    },
    {
      userName: users[1].fullName,
      teamName: users[1].teamName,
      activityType: 'Upper Body Strength',
      durationMinutes: 48,
      caloriesBurned: 410,
      distanceKm: 0,
      performedAt: new Date('2026-06-19T12:30:00.000Z'),
    },
    {
      userName: users[2].fullName,
      teamName: users[2].teamName,
      activityType: 'Long Run',
      durationMinutes: 72,
      caloriesBurned: 870,
      distanceKm: 12.8,
      performedAt: new Date('2026-06-20T05:40:00.000Z'),
    },
    {
      userName: users[3].fullName,
      teamName: users[3].teamName,
      activityType: 'Pilates Session',
      durationMinutes: 42,
      caloriesBurned: 290,
      distanceKm: 0,
      performedAt: new Date('2026-06-21T09:15:00.000Z'),
    },
    {
      userName: users[4].fullName,
      teamName: users[4].teamName,
      activityType: 'HIIT Circuit',
      durationMinutes: 36,
      caloriesBurned: 520,
      distanceKm: 1.7,
      performedAt: new Date('2026-06-22T14:20:00.000Z'),
    },
  ]);

  await Leaderboard.insertMany([
    {
      period: '2026-W25',
      rank: 1,
      userName: users[2].fullName,
      teamName: users[2].teamName,
      totalPoints: 1520,
      streakDays: 18,
    },
    {
      period: '2026-W25',
      rank: 2,
      userName: users[0].fullName,
      teamName: users[0].teamName,
      totalPoints: 1440,
      streakDays: 16,
    },
    {
      period: '2026-W25',
      rank: 3,
      userName: users[4].fullName,
      teamName: users[4].teamName,
      totalPoints: 1385,
      streakDays: 14,
    },
    {
      period: '2026-W25',
      rank: 4,
      userName: users[1].fullName,
      teamName: users[1].teamName,
      totalPoints: 1290,
      streakDays: 11,
    },
    {
      period: '2026-W25',
      rank: 5,
      userName: users[3].fullName,
      teamName: users[3].teamName,
      totalPoints: 1170,
      streakDays: 9,
    },
  ]);

  await Workout.insertMany([
    {
      title: '5K Speed Builder',
      category: 'Running',
      difficulty: 'intermediate',
      durationMinutes: 45,
      equipment: ['Running Shoes', 'Sports Watch'],
      targetMuscles: ['Quads', 'Hamstrings', 'Calves'],
      coachNotes: 'Alternate threshold intervals and easy jog recovery.',
    },
    {
      title: 'Dumbbell Push Day',
      category: 'Strength',
      difficulty: 'advanced',
      durationMinutes: 50,
      equipment: ['Dumbbells', 'Bench'],
      targetMuscles: ['Chest', 'Shoulders', 'Triceps'],
      coachNotes: 'Keep rest periods under 75 seconds for conditioning.',
    },
    {
      title: 'Core Restore Flow',
      category: 'Mobility',
      difficulty: 'beginner',
      durationMinutes: 30,
      equipment: ['Yoga Mat'],
      targetMuscles: ['Core', 'Lower Back', 'Glutes'],
      coachNotes: 'Focus on breathing cadence and spinal alignment.',
    },
    {
      title: 'MetCon Ladder',
      category: 'Conditioning',
      difficulty: 'intermediate',
      durationMinutes: 35,
      equipment: ['Kettlebell', 'Jump Rope'],
      targetMuscles: ['Full Body', 'Core'],
      coachNotes: 'Scale reps to maintain clean movement quality.',
    },
  ]);

  console.log('Seed complete: users, teams, activities, leaderboard, and workouts populated.');

  await mongoose.disconnect();
}

void seed().catch(async (error: unknown) => {
  console.error('Seed failed:', error);
  await mongoose.disconnect();
  process.exit(1);
});
