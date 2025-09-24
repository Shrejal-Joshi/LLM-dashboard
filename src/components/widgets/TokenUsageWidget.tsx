import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchTokenUsage, TokenUsagePoint } from "../../services/mockApi";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { WidgetShell } from "../WidgetShell";

export const TokenUsageWidget: React.FC<{
  id: string;
  props?: Record<string, any>;
  onRemove?: () => void;
}> = ({ id, props, onRemove }) => {
  const { timeRange = "24h" } = props || {};

  const { data, isLoading, isError } = useQuery<TokenUsagePoint[]>(
    ["tokenUsage", id, timeRange],
    () => fetchTokenUsage({ timeRange }),
    { staleTime: 1000 * 60 }
  );

  return (
    <WidgetShell title={`Token Usage (${timeRange})`} onRemove={onRemove}>
      {isLoading && <div>Loading…</div>}
      {isError && <div>Error loading data</div>}
      {data && (
        <div style={{ width: "100%", height: 220 }}>
          <ResponsiveContainer>
            <LineChart
              data={data.map((d) => ({
                ...d,
                time: new Date(d.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              }))}
            >
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="tokens"
                stroke="#8884d8"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </WidgetShell>
  );
};
