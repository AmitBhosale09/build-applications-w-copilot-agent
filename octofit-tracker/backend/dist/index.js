"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const Activity_1 = require("./models/Activity");
const Leaderboard_1 = require("./models/Leaderboard");
const Team_1 = require("./models/Team");
const User_1 = require("./models/User");
const Workout_1 = require("./models/Workout");
const app = (0, express_1.default)();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        apiBaseUrl: baseUrl,
        backendPort: 8000,
        mongoPort: 27017,
        mongoDatabase: 'octofit_db',
    });
});
app.get('/api/users/', async (_req, res) => {
    try {
        const users = await User_1.User.find().sort({ createdAt: -1 }).lean();
        res.json({
            resource: 'users',
            count: users.length,
            data: users,
            apiBaseUrl: baseUrl,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to fetch users',
            error: String(error),
        });
    }
});
app.get('/api/teams/', async (_req, res) => {
    try {
        const teams = await Team_1.Team.find().sort({ name: 1 }).lean();
        res.json({
            resource: 'teams',
            count: teams.length,
            data: teams,
            apiBaseUrl: baseUrl,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to fetch teams',
            error: String(error),
        });
    }
});
app.get('/api/activities/', async (_req, res) => {
    try {
        const activities = await Activity_1.Activity.find().sort({ performedAt: -1 }).lean();
        res.json({
            resource: 'activities',
            count: activities.length,
            data: activities,
            apiBaseUrl: baseUrl,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to fetch activities',
            error: String(error),
        });
    }
});
app.get('/api/leaderboard/', async (_req, res) => {
    try {
        const leaderboard = await Leaderboard_1.Leaderboard.find().sort({ rank: 1 }).lean();
        res.json({
            resource: 'leaderboard',
            count: leaderboard.length,
            data: leaderboard,
            apiBaseUrl: baseUrl,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to fetch leaderboard',
            error: String(error),
        });
    }
});
app.get('/api/workouts/', async (_req, res) => {
    try {
        const workouts = await Workout_1.Workout.find().sort({ title: 1 }).lean();
        res.json({
            resource: 'workouts',
            count: workouts.length,
            data: workouts,
            apiBaseUrl: baseUrl,
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Failed to fetch workouts',
            error: String(error),
        });
    }
});
async function startServer() {
    try {
        await mongoose_1.default.connect(mongoUri);
        app.listen(port, () => {
            console.log(`OctoFit backend running on ${baseUrl}`);
            console.log('MongoDB connected to octofit_db');
        });
    }
    catch (error) {
        console.error('Failed to start backend:', error);
        process.exit(1);
    }
}
void startServer();
