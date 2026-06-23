import { Schema, model, type InferSchemaType } from 'mongoose';

const activitySchema = new Schema(
  {
    userName: { type: String, required: true, trim: true },
    teamName: { type: String, required: true, trim: true },
    activityType: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 5, max: 600 },
    caloriesBurned: { type: Number, required: true, min: 10, max: 10000 },
    distanceKm: { type: Number, required: true, min: 0, max: 200 },
    performedAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export type ActivityDocument = InferSchemaType<typeof activitySchema>;

export const Activity = model('Activity', activitySchema);
