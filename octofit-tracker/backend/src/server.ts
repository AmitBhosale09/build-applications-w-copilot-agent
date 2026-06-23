const port = 8000;

const CODESPACE_NAME = process.env.CODESPACE_NAME;

const baseUrl = CODESPACE_NAME
  ? `https://${CODESPACE_NAME}-8000.app.github.dev`
  : "http://localhost:8000";

console.log("Server Port:", port);
console.log("Base URL:", baseUrl);

export { port, baseUrl };