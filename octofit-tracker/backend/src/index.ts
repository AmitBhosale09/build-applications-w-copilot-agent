import express from 'express';
import mongoose from 'mongoose';
import { Activity } from './models/Activity';
import { Leaderboard } from './models/Leaderboard';
import { Team } from './models/Team';
import { User } from './models/User';
import { Workout } from './models/Workout';

const app = express();
const port = 8000;

const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

app.use(express.json());

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
    const users = await User.find().sort({ createdAt: -1 }).lean();
    res.json({
      resource: 'users',
      count: users.length,
      data: users,
      apiBaseUrl: baseUrl,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch users',
      error: String(error),
    });
  }
});

app.get('/api/teams/', async (_req, res) => {
  try {
    const teams = await Team.find().sort({ name: 1 }).lean();
    res.json({
      resource: 'teams',
      count: teams.length,
      data: teams,
      apiBaseUrl: baseUrl,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch teams',
      error: String(error),
    });
  }
});

app.get('/api/activities/', async (_req, res) => {
  try {
    const activities = await Activity.find().sort({ performedAt: -1 }).lean();
    res.json({
      resource: 'activities',
      count: activities.length,
      data: activities,
      apiBaseUrl: baseUrl,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch activities',
      error: String(error),
    });
  }
});

app.get('/api/leaderboard/', async (_req, res) => {
  try {
    const leaderboard = await Leaderboard.find().sort({ rank: 1 }).lean();
    res.json({
      resource: 'leaderboard',
      count: leaderboard.length,
      data: leaderboard,
      apiBaseUrl: baseUrl,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch leaderboard',
      error: String(error),
    });
  }
});

app.get('/api/workouts/', async (_req, res) => {
  try {
    const workouts = await Workout.find().sort({ title: 1 }).lean();
    res.json({
      resource: 'workouts',
      count: workouts.length,
      data: workouts,
      apiBaseUrl: baseUrl,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch workouts',
      error: String(error),
    });
  }
});

async function startServer() {
  try {
    await mongoose.connect(mongoUri);
    app.listen(port, () => {
      console.log(`OctoFit backend running on ${baseUrl}`);
      console.log('MongoDB connected to octofit_db');
    });
  } catch (error) {
    console.error('Failed to start backend:', error);
    process.exit(1);
  }
}

void startServer();
