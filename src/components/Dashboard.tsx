import React, { useState } from 'react';
import { Responsive, WidthProvider, Layout } from 'react-grid-layout';
import { useDashboardStore } from '../store/useDashboardStore';
import { TokenUsageWidget } from './widgets/TokenUsageWidget';
import { LatencyDistributionWidget } from './widgets/LatencyDistributionWidget';
import { CostAnalysisWidget } from './widgets/CostAnalysisWidget';
import { AddWidgetModal } from './AddWidgetModal';

const ResponsiveGridLayout = WidthProvider(Responsive);

export const Dashboard: React.FC = () => {
  const widgets = useDashboardStore((s) => s.widgets);
  const layout = useDashboardStore((s) => s.layout);
  const setLayout = useDashboardStore((s) => s.setLayout);
  const removeWidget = useDashboardStore((s) => s.removeWidget);

  const [showAdd, setShowAdd] = useState(false);

  const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
  const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">LLM Monitoring Dashboard</h2>
        <div>
          <button
            onClick={() => setShowAdd(true)}
            className="px-3 py-1 bg-blue-600 text-white rounded"
          >
            Add Widget
          </button>
        </div>
      </div>

      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={breakpoints}
        cols={cols}
        rowHeight={30}
        onLayoutChange={(currentLayout: Layout[]) => {
          const mapped = currentLayout.map((l) => ({
            i: l.i,
            x: l.x,
            y: l.y,
            w: l.w,
            h: l.h,
          }));
          setLayout(mapped);
        }}
        draggableHandle=".widget-handle"
      >
        {widgets.map((w) => (
          <div
            key={w.id}
            data-grid={layout.find((l) => l.i === w.id) as any}
            className="p-1"
          >
            {w.type === 'token_usage' && (
              <TokenUsageWidget id={w.id} onRemove={() => removeWidget(w.id)} />
            )}
            {w.type === 'latency_distribution' && (
              <LatencyDistributionWidget
                id={w.id}
                onRemove={() => removeWidget(w.id)}
              />
            )}
            {w.type === 'cost_analysis' && (
              <CostAnalysisWidget id={w.id} onRemove={() => removeWidget(w.id)} />
            )}
          </div>
        ))}
      </ResponsiveGridLayout>

      {showAdd && <AddWidgetModal onClose={() => setShowAdd(false)} />}
    </div>
  );
};
