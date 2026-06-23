import { Schema, model, type InferSchemaType } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
    city: { type: String, required: true, trim: true },
    motto: { type: String, required: true, trim: true },
    focusArea: { type: String, required: true, trim: true },
    weeklyGoalMinutes: { type: Number, required: true, min: 60, max: 2000 },
  },
  { timestamps: true }
);

export type TeamDocument = InferSchemaType<typeof teamSchema>;

export const Team = model('Team', teamSchema);
