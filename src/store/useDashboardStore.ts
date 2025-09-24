// src/store/useDashboardStore.ts
import create from 'zustand';
import { persist } from 'zustand/middleware';
import type { WidgetConfigBase, LayoutItem, WidgetType } from '../types/widgets';

interface DashboardState {
  widgets: WidgetConfigBase[];
  layout: LayoutItem[]; // stored layout for lg breakpoint
  addWidget: (type: WidgetType, props?: Record<string, any>) => void;
  removeWidget: (id: string) => void;
  setLayout: (layout: LayoutItem[]) => void;
  updateWidgetProps: (id: string, props: Record<string, any>) => void;
}

const makeId = () => Math.random().toString(36).slice(2, 9);

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set, get) => ({
      widgets: [],
      layout: [],
      addWidget: (type, props = {}) => {
        const id = makeId();
        const defaultW = 4; // spans 4 of 12 cols
        const defaultH = 6;

        const currentLayout = get().layout;

        let nextX = 0;
        let nextY = 0;

        if (currentLayout.length > 0) {
          const last = [...currentLayout].sort((a, b) => (a.y === b.y ? a.x - b.x : a.y - b.y))[currentLayout.length - 1];
          nextX = last.x + last.w;
          if (nextX + defaultW > 12) {
            nextX = 0;
            nextY = last.y + last.h;
          } else {
            nextY = last.y;
          }
        }

        const newWidget: WidgetConfigBase = { id, type, title: type, props };
        set((s) => ({
          widgets: [...s.widgets, newWidget],
          layout: [...s.layout, { i: id, x: nextX, y: nextY, w: defaultW, h: defaultH }],
        }));
      },
      removeWidget: (id) =>
        set((s) => ({
          widgets: s.widgets.filter((w) => w.id !== id),
          layout: s.layout.filter((l) => l.i !== id),
        })),
      setLayout: (layout) => set(() => ({ layout })),
      updateWidgetProps: (id, props) =>
        set((s) => ({
          widgets: s.widgets.map((w) => (w.id === id ? { ...w, props: { ...(w.props || {}), ...props } } : w)),
        })),
    }),
    {
      name: 'dashboard-storage',
    }
  )
);
