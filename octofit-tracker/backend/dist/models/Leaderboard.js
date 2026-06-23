"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Leaderboard = void 0;
const mongoose_1 = require("mongoose");
const leaderboardSchema = new mongoose_1.Schema({
    period: { type: String, required: true, trim: true },
    rank: { type: Number, required: true, min: 1 },
    userName: { type: String, required: true, trim: true },
    teamName: { type: String, required: true, trim: true },
    totalPoints: { type: Number, required: true, min: 0 },
    streakDays: { type: Number, required: true, min: 0 },
}, { timestamps: true });
exports.Leaderboard = (0, mongoose_1.model)('Leaderboard', leaderboardSchema);
