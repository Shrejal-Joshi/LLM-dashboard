import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchCostAnalysis } from '../../services/mockApi';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { WidgetShell } from '../WidgetShell';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#d0ed57'];

export const CostAnalysisWidget: React.FC<{ id: string; props?: Record<string, any>; onRemove?: () => void }> = ({ id, props, onRemove }) => {
  const { model } = props || {};

  const { data, isLoading, isError } = useQuery(
    ['cost', id, model],
    () => fetchCostAnalysis({ model }),
    { staleTime: 1000 * 60 * 5 }
  );

  return (
    <WidgetShell title={model ? `Cost Analysis (${model})` : 'Cost Analysis'} onRemove={onRemove}>
      {isLoading && <div>Loading…</div>}
      {isError && <div>Error loading data</div>}
      {data && (
        <div style={{ width: '100%', height: 220 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie data={data} dataKey="cost" nameKey="model_name" outerRadius={80} label>
                {(data || []).map((_, idx) => <Cell key={idx} fill={COLORS[idx % COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </WidgetShell>
  );
};
