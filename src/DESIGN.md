# DESIGN — LLM Monitoring Dashboard

## Overview
This app provides a grid-based, draggable dashboard. Widgets are independent components that fetch their own data through a mock API and render with Recharts. Global UI state (list of widgets and their grid layout) is owned by a centralized Zustand store and persisted to localStorage.

## Zustand store structure
- `widgets: WidgetConfigBase[]` — list of active widgets and their configuration.
- `layout: LayoutItem[]` — grid positions/sizes compatible with react-grid-layout.
- `addWidget(type)` / `removeWidget(id)` / `setLayout(layout)` — actions to mutate state.

Design rationale: Zustand gives a tiny, predictable store without boilerplate. Persist middleware saves layout automatically. Widgets remain decoupled: the store only keeps metadata and layout; each widget fetches data with React Query.

## Interaction between grid, state, and widgets
- react-grid-layout handles dragging/resizing and emits a `onLayoutChange` with the new layout array.
- We map that layout to our `LayoutItem[]` and call `setLayout`, which persists to localStorage via Zustand's `persist` middleware.
- Each widget reads its configuration (id/type) from the store, but performs its own data fetching using React Query keyed by [`widgetType`, `widgetId`].

## Persistence
- Using `zustand/persist` to store `widgets` and `layout` in `localStorage` under a specific key. On load the store hydrates with that data.

## Performance considerations
Potential bottlenecks:
- Many widgets mounted at once can create many concurrent queries. Mitigation: set sensible `staleTime`/`cacheTime` and use `react-query`'s background refetch scheduling. Consider paginating or virtualizing long lists.
- Grid reflow on resize can be expensive with many DOM nodes. Mitigation: debounce `onLayoutChange` or only persist on `onDragStop`/`onResizeStop` rather than continuous updates.

## Extensibility
- Add new widget types by creating a new component under `components/widgets` and adding a case in the Dashboard add widget menu.
- Hook real APIs by replacing `mockApi.ts` with actual fetch calls and adjusting query keys.
