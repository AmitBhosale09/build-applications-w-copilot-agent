"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 8000;
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
