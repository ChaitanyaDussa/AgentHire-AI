AgenticHire-AI 🚀
---
AgenticHire-AI is a full-stack AI-powered recruitment platform designed to make hiring faster, smarter, and more structured. It leverages a multi-agent workflow system to help recruiters manage job postings, process candidate applications, parse resumes, match candidates to job requirements, shortlist applicants, and track recruitment activities from a centralized dashboard.
---
The platform combines a modern Next.js frontend, Express.js backend, MongoDB database, and Qdrant vector database to deliver intelligent candidate evaluation and retrieval-augmented hiring workflows.
---
✨ Features
🔐 Recruiter authentication and authorization
📋 Job creation and management
📄 Candidate application and resume upload
🤖 AI-powered resume parsing and evaluation
🎯 Candidate-to-job matching and ranking
👥 Automated candidate shortlisting
⚙️ Multi-agent recruitment workflow orchestration
🔍 RAG (Retrieval-Augmented Generation) using Qdrant
📊 Recruitment analytics and workflow tracking
📧 Email automation with Resend
🐳 Docker support for MongoDB and Qdrant
🏗️ Tech Stack
Frontend
Next.js 15 (App Router)
React
Tailwind CSS
Backend
Express.js
Node.js
Database & Storage
MongoDB
Qdrant Vector Database
AI & Automation
Multi-Agent Workflow System
Resume Parsing
Candidate Matching Engine
RAG Pipeline
Communication
Resend Email Service
DevOps
Docker
Docker Compose
📁 Project Structure
AgenticHire-AI/
│
├── client/           # Next.js 15 App Router frontend
├── server/           # Express backend, agents, workflows, RAG, uploads, logs
├── specs/            # Hiring, workflow, retry, RAG, prompt, and email specifications
│
└── README.md
🚀 Getting Started
Prerequisites

Make sure you have installed:

Node.js (v18+ recommended)
npm
Docker Desktop
MongoDB (via Docker)
Qdrant (via Docker)
📦 Installation
1. Clone the Repository
git clone https://github.com/your-username/AgenticHire-AI.git
cd AgenticHire-AI
2. Install Dependencies
npm install --prefix client
npm install --prefix server
3. Configure Environment Variables

Copy the example environment files:

copy client\.env.local.example client\.env.local
copy server\.env.example server\.env

Update the environment variables according to your local setup.

🐳 Start Required Services

Launch MongoDB and Qdrant using Docker:

docker compose up -d mongo qdrant

Verify running containers:

docker ps
▶️ Run the Application
Start Backend
npm run dev --prefix server

Backend URL:

http://localhost:5000
Start Frontend
npm run dev --prefix client

Frontend URL:

http://localhost:3000
🔄 Recruitment Workflow
Recruiter logs in.
Recruiter creates a job posting.
Candidates submit applications and resumes.
AI agents parse resumes and extract candidate data.
Candidate profiles are embedded and stored in Qdrant.
Matching engine compares candidates against job requirements.
Qualified candidates are shortlisted automatically.
Recruiters review analytics and workflow logs.
Email notifications are sent throughout the hiring process.
📊 Core Modules
Authentication

Secure recruiter login and protected routes.

Job Management

Create, update, and manage job openings.

Resume Processing

AI-powered resume parsing and information extraction.

Candidate Matching

Semantic matching using embeddings and vector search.

Multi-Agent System

Coordinated AI agents handling different recruitment tasks.

Analytics Dashboard

Track recruitment performance and workflow progress.

Email Automation

Automated candidate and recruiter communication.

🔍 RAG Architecture

The platform uses Retrieval-Augmented Generation (RAG):

Resume embeddings stored in Qdrant
Semantic search for candidate retrieval
Context-aware evaluation and matching
Enhanced recruiter decision support
📧 Email Integration

Email workflows are powered by Resend and support:

Application acknowledgements
Shortlisting notifications
Interview invitations
Recruitment status updates
🐳 Docker Support

Start services:

docker compose up -d

Stop services:

docker compose down

View logs:

docker compose logs -f
📈 Future Enhancements
AI Interview Assistant
Voice-based Candidate Screening
Advanced Hiring Analytics
ATS Integrations
Multi-Organization Support
Real-time Collaboration Features
🤝 Contributing
Fork the repository
Create a feature branch
git checkout -b feature/new-feature
Commit changes
git commit -m "Add new feature"
Push branch
git push origin feature/new-feature
Open a Pull Request
📄 License

This project is licensed under the MIT License.

👨‍💻 Author

Chaitanya Dussa

Building AI-powered solutions for recruitment, education, automation, and agentic systems.
