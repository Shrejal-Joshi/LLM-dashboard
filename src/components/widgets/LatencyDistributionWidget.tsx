import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchLatencyDistribution } from '../../services/mockApi';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { WidgetShell } from '../WidgetShell';

export const LatencyDistributionWidget: React.FC<{ id: string; props?: Record<string, any>; onRemove?: () => void }> = ({ id, props, onRemove }) => {
  const { timeRange = '24h' } = props || {};

  const { data, isLoading, isError } = useQuery(
    ['latency', id, timeRange],
    () => fetchLatencyDistribution({ timeRange }),
    { staleTime: 1000 * 30 }
  );

  return (
    <WidgetShell title={`Latency Distribution (${timeRange})`} onRemove={onRemove}>
      {isLoading && <div>Loading…</div>}
      {isError && <div>Error loading data</div>}
      {data && (
        <div style={{ width: '100%', height: 220 }}>
          <ResponsiveContainer>
            <BarChart data={data.map(d => ({ ...d, label: `${d.latency_ms}ms` }))}>
              <XAxis dataKey="label" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="request_count" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </WidgetShell>
  );
};
