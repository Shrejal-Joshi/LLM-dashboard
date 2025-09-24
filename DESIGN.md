
# DESIGN DOCUMENT

## 1. Overview
The **LLM Monitoring Dashboard** provides a dynamic visualize graphs:
- Token usage over time
- Latency distribution
- Cost analysis

## 2. Dependencies

### Core
- **React + TypeScript** → Component-based architecture
- **Vite** → Fast build tool

### State & Data
- **Zustand** → Manages widgets & layout state
- **@tanstack/react-query** → Manages server-like async state

### UI & Layout
- **react-grid-layout** →resizable grid
- **recharts** → Data visualization (line, bar, pie)
- **tailwindcss** → CSS framework
- **react-resizable** → Required for grid resizing

---

## 3. Workflow

1. **Add Widget**
   - User opens modal
   - Chooses widget type (Token Usage, Latency Distribution, Cost Analysis)
   - Provides configuration (model, time range, etc.)
   - `addWidget()` updates the store

2. **Dashboard Rendering**
   - `Dashboard.tsx` reads `widgets[]` and `layout[]` from store
   - Renders each widget inside `ResponsiveGridLayout`
   - Layout saved on drag/resize → `setLayout()`

3. **Widget Fetching**
   - Each widget uses **React Query** hook (`useQuery`)
   - Calls corresponding **mockApi.ts** function
   - Displays chart with `Recharts`

4. **Persistence**
   - Store syncs with **localStorage** so widgets persist across reloads

---

## 4. Component Design

### `Dashboard.tsx`
- Renders grid layout
- Handles drag/resize → updates store
- Maps each widget ID → correct component

### `AddWidgetModal.tsx`
- Modal for selecting widget type & config
- Calls `addWidget(type, props)`

### `TokenUsageWidget.tsx`
- Fetches data via `fetchTokenUsage({ timeRange })`
- Displays **LineChart** (time series of tokens)

### `LatencyDistributionWidget.tsx`
- Fetches data via `fetchLatencyDistribution({ timeRange })`
- Displays **BarChart** (distribution of latencies)

### `CostAnalysisWidget.tsx`
- Fetches data via `fetchCostAnalysis({ model })`
- Displays **PieChart or BarChart** (cost breakdown)

---

## 5. Data Layer (Mock API)

`services/mockApi.ts` provides async calls:
```ts
async function fetchTokenUsage({ timeRange }) { ... }
async function fetchLatencyDistribution({ timeRange }) { ... }
async function fetchCostAnalysis({ model }) { ... }
