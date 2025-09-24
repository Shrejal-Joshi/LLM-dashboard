// src/types/widgets.ts
export type WidgetType = 'token_usage' | 'latency_distribution' | 'cost_analysis';

export interface WidgetConfigBase {
  id: string; // unique id
  type: WidgetType;
  title?: string;
  props?: Record<string, any>; // model, timeRange, etc.
}

export interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}
