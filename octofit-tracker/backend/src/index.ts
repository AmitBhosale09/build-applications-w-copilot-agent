import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = Number(process.env.PORT) || 8000;

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
