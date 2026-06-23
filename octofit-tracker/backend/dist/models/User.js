"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    age: { type: Number, required: true, min: 13, max: 100 },
    heightCm: { type: Number, required: true, min: 120, max: 230 },
    weightKg: { type: Number, required: true, min: 35, max: 250 },
    teamName: { type: String, required: true, trim: true },
    fitnessLevel: {
        type: String,
        enum: ['beginner', 'intermediate', 'advanced'],
        required: true,
    },
}, { timestamps: true });
exports.User = (0, mongoose_1.model)('User', userSchema);
