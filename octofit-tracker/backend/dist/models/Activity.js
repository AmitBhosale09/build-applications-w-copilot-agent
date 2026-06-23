"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = void 0;
const mongoose_1 = require("mongoose");
const activitySchema = new mongoose_1.Schema({
    userName: { type: String, required: true, trim: true },
    teamName: { type: String, required: true, trim: true },
    activityType: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 5, max: 600 },
    caloriesBurned: { type: Number, required: true, min: 10, max: 10000 },
    distanceKm: { type: Number, required: true, min: 0, max: 200 },
    performedAt: { type: Date, required: true },
}, { timestamps: true });
exports.Activity = (0, mongoose_1.model)('Activity', activitySchema);
