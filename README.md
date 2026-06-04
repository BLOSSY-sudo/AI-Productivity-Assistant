# AI Workplace Productivity Assistant

A modern, responsive SaaS-style web application that helps professionals automate everyday workplace tasks with responsible AI. The full project is also documented in the companion PowerPoint deck: [`AI_Workplace_Productivity_Assistant.pptx`](./AI_Workplace_Productivity_Assistant.pptx).

---

## 1. Project Overview

The AI Workplace Productivity Assistant brings five focused AI tools into a single clean dashboard. Professionals can draft emails, summarize meetings, plan projects, run research, and chat with an AI copilot — all with **structured prompts**, **editable AI outputs**, and a **responsible AI disclaimer** on every tool.

- **One unified dashboard** with sidebar navigation
- **Five AI-powered tools** covering the most common workplace tasks
- **Editable outputs** — AI is a starting point, the user stays in control
- **Responsible AI disclaimers** built into every tool
- **Responsive design** that works on desktop, tablet, and mobile

---

## 2. Features

| # | Tool | What it does |
|---|------|--------------|
| 1 | **Smart Email Generator** | Drafts professional emails with tone and audience controls. |
| 2 | **Meeting Notes Summarizer** | Turns raw notes into structured summaries with action items. |
| 3 | **AI Task Planner** | Breaks goals into prioritized milestones and task tables. |
| 4 | **AI Research Assistant** | Produces structured technical and business briefings. |
| 5 | **AI Chatbot Interface** | A conversational copilot for everyday workplace questions. |

Cross-cutting features:
- Modern dashboard UI with persistent sidebar
- Markdown rendering for rich AI responses
- Loading states, error handling, and copy-to-clipboard on outputs
- Light theme tuned for long working sessions

---

## 3. Tools Used

- **Frontend:** React 19, TypeScript, Tailwind CSS v4, shadcn/ui
- **Framework:** TanStack Start (SSR + server functions), Vite 7
- **AI Layer:** Lovable AI Gateway — Google Gemini (`google/gemini-3-flash-preview`)
- **Backend:** Lovable Cloud (managed Supabase: auth, database, storage)
- **Content:** `react-markdown` for editable rich AI outputs
- **Design System:** Custom OKLCH palette, gradients, and elegant shadows in `src/styles.css`

---

## 4. Setup Instructions

### Prerequisites
- [Bun](https://bun.sh/) (or Node.js 20+)
- A Lovable Cloud project (auto-provisioned when you open this app in Lovable)

### Steps

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd <project-folder>

# 2. Install dependencies
bun install

# 3. Configure environment variables
#    Create a .env file (Lovable Cloud variables are auto-injected in Lovable)
#    For local dev outside Lovable, set:
#      LOVABLE_API_KEY=your_key_here

# 4. Start the dev server
bun dev

# 5. Open the app
#    http://localhost:3000
```

### Project Structure

```
src/
├── components/        # AppSidebar, AITool, shadcn UI
├── routes/            # TanStack Start file-based routes
│   ├── index.tsx      # Dashboard
│   ├── email.tsx      # Smart Email Generator
│   ├── meetings.tsx   # Meeting Notes Summarizer
│   ├── tasks.tsx      # AI Task Planner
│   ├── research.tsx   # AI Research Assistant
│   ├── chat.tsx       # AI Chatbot
│   └── api/ai.ts      # Server route → Lovable AI Gateway
├── integrations/      # Supabase clients (auto-generated)
└── styles.css         # Design tokens (OKLCH palette)
```

---

## 5. Team Members

| Name | Role |
|------|------|
| **Sihle Blossom Lusizi** | Project Creator & Developer — design, frontend, and AI integration |

> Solo build. Contributors welcome — open an issue or pull request.

---

## Responsible AI

All AI-generated content in this app is presented with a clear disclaimer reminding users to review and edit outputs before acting on them. AI assists; the human decides.

---

## Companion Presentation

A full visual walkthrough of this project is available as a PowerPoint deck:
**[`AI_Workplace_Productivity_Assistant.pptx`](./AI_Workplace_Productivity_Assistant.pptx)** (7 slides — overview, features, tools, setup, team).