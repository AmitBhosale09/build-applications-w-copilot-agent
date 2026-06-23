import { Schema, model, type InferSchemaType } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    period: { type: String, required: true, trim: true },
    rank: { type: Number, required: true, min: 1 },
    userName: { type: String, required: true, trim: true },
    teamName: { type: String, required: true, trim: true },
    totalPoints: { type: Number, required: true, min: 0 },
    streakDays: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

export type LeaderboardDocument = InferSchemaType<typeof leaderboardSchema>;

export const Leaderboard = model('Leaderboard', leaderboardSchema);
