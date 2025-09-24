# Dynamic LLM Monitoring Dashboard

An interactive dashboard for monitoring LLM.  
can **add, remove, drag, resize, and configure widgets** to visualize:

- Token Usage (per model, per time range)
- Latency Distribution
- Cost Analysis

---

## Features
- **Dynamic widgets** → Add/remove any chart type from the dashboard
- **Resizable & Draggable** → Powered by `react-grid-layout`
- **Independent widget fetching** → Each widget queries data separately
- **Persistence** → Layout & widget config saved in localStorage
- **Responsive design** → Works across breakpoints
- **Simulated APIs** → Mock async API layer for testing

---

## Tech Stack
- **Framework**: React + TypeScript + Vite
- **Grid system**: `react-grid-layout`
- **State management**: `zustand`
- **Data fetching**: `@tanstack/react-query`
- **Charts**: `recharts`
- **Styling**: `tailwindcss`
- **Mock APIs**: Custom `services/mockApi.ts`

---

## 📦 Installation

### 1. Clone the repository
git clone https://github.com/Shrejal-Joshi/LLM-dashboard.git

### 2. Installation
npm install

### 3. Running
npm run dev
