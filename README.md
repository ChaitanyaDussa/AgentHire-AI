# 🚀 AgenticHire-AI

AI-Powered Multi-Agent Recruitment Platform that automates candidate screening, resume analysis, job matching, shortlisting, and hiring workflows.

---

## 📌 Overview

AgenticHire-AI helps recruiters streamline hiring using AI agents and Retrieval-Augmented Generation (RAG).

The platform can:

* Parse resumes automatically
* Match candidates with jobs
* Rank and shortlist applicants
* Track recruitment workflows
* Generate hiring insights
* Automate email communications

---

## ✨ Features

✅ Recruiter Authentication

✅ Job Creation & Management

✅ Resume Upload & Parsing

✅ AI Candidate Evaluation

✅ Candidate-Job Matching

✅ Automated Shortlisting

✅ Multi-Agent Hiring Workflow

✅ RAG with Qdrant Vector Database

✅ Recruitment Analytics Dashboard

✅ Email Automation

---

## 🛠️ Tech Stack

### Frontend

* Next.js 15
* React
* Tailwind CSS

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### Vector Database

* Qdrant

### AI Services

* OpenAI
* RAG Pipeline
* Multi-Agent System

### Email

* Resend

### DevOps

* Docker
* Docker Compose

---

## 📂 Project Structure

```bash
AgenticHire-AI
│
├── client/        # Next.js Frontend
├── server/        # Express Backend
├── specs/         # Agent & Workflow Specs
│
└── README.md
```

---

## 🔄 Hiring Workflow

```text
Recruiter
    ↓
Create Job
    ↓
Candidate Applies
    ↓
Resume Upload
    ↓
Resume Parsing Agent
    ↓
Candidate Matching Agent
    ↓
Ranking & Shortlisting
    ↓
Recruiter Dashboard
    ↓
Email Notifications
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/your-username/AgenticHire-AI.git
cd AgenticHire-AI
```

### Install Dependencies

```bash
npm install --prefix client
npm install --prefix server
```

### Setup Environment Variables

```bash
copy client\.env.local.example client\.env.local

copy server\.env.example server\.env
```

### Start Databases

```bash
docker compose up -d mongo qdrant
```

### Run Backend

```bash
npm run dev --prefix server
```

### Run Frontend

```bash
npm run dev --prefix client
```

---

## 🌐 Application URLs

Frontend:

```text
http://localhost:3000
```

Backend:

```text
http://localhost:5000
```



---

## 🔮 Future Improvements

* AI Interview Assistant
* Voice-Based Screening
* ATS Integrations
* Real-Time Collaboration
* Advanced Analytics

---

## 👨‍💻 Author

**Chaitanya Dussa**

Passionate about AI, Agentic Systems, Full-Stack Development, and Automation.

GitHub: https://github.com/ChaitanyaDussa
