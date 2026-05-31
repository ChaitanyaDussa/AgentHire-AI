# AI Recruitment Organization

Spec-driven multi-agent recruitment platform with a Next.js client and Express/MongoDB server.

## Structure

- `client/` - Next.js 15 App Router frontend
- `server/` - Express.js backend, agents, workflows, RAG, uploads, logs
- `specs/` - hiring, workflow, retry, RAG, prompt, and email specs

## Local Development

1. Install dependencies:
   ```bash
   npm install --prefix client
   npm install --prefix server
   ```
2. Copy environment files:
   ```bash
   copy client\.env.local.example client\.env.local
   copy server\.env.example server\.env
   ```
3. Start MongoDB and Qdrant:
   ```bash
   docker compose up -d mongo qdrant
   ```
4. Run apps:
   ```bash
   npm run dev --prefix server
   npm run dev --prefix client
   ```

Frontend: http://localhost:3000  
Backend: http://localhost:5000
