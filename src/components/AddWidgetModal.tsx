import React, { useState } from "react";
import { useDashboardStore } from "../store/useDashboardStore";
import type { WidgetType } from "../types/widgets";

export const AddWidgetModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const addWidget = useDashboardStore((s) => s.addWidget);

  const types: { key: WidgetType; label: string }[] = [
    { key: "token_usage", label: "Token Usage Over Time" },
    { key: "latency_distribution", label: "Latency Distribution" },
    { key: "cost_analysis", label: "Cost Analysis" },
  ];

  const [selected, setSelected] = useState<WidgetType | null>(null);
  const [model, setModel] = useState("GPT-4");
  const [timeRange, setTimeRange] = useState("24h");

  const handleAdd = () => {
    if (!selected) return;
    const props: Record<string, any> = {};

    if (selected === "token_usage") {
      props.timeRange = timeRange; // ✅ only timeRange
    }

    if (selected === "latency_distribution") {
      props.timeRange = timeRange;
    }

    if (selected === "cost_analysis") {
      props.model = model;
    }

    addWidget(selected, props);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white p-4 rounded shadow w-96">
        <h3 className="font-semibold mb-3">Add a Widget</h3>

        {/*  Choose a widget type */}
        {!selected && (
          <div className="grid gap-2">
            {types.map((t) => (
              <button
                key={t.key}
                onClick={() => setSelected(t.key)}
                className="p-2 text-left border rounded hover:bg-gray-100"
              >
                {t.label}
              </button>
            ))}
          </div>
        )}

        {/* Configure selected widget */}
        {selected && (
          <div className="space-y-3">
            <p className="font-medium">
              Configure {types.find((t) => t.key === selected)?.label}
            </p>

            {/* Model selector  for cost_analysis */}
            {selected === "cost_analysis" && (
              <div>
                <label className="block text-sm font-medium">Model</label>
                <select
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="border rounded w-full p-1"
                >
                  <option value="GPT-4">GPT-4</option>
                  <option value="Claude-2">Claude-2</option>
                  <option value="Llama-2">Llama-2</option>
                </select>
              </div>
            )}

            {/* Time range selector for token_usage + latency_distribution */}
            {(selected === "token_usage" || selected === "latency_distribution") && (
              <div>
                <label className="block text-sm font-medium">Time Range</label>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="border rounded w-full p-1"
                >
                  <option value="1h">Last 1 hour</option>
                  <option value="24h">Last 24 hours</option>
                  <option value="7d">Last 7 days</option>
                </select>
              </div>
            )}

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setSelected(null)}
                className="px-3 py-1 border rounded hover:bg-gray-100"
              >
                Back
              </button>
              <button
                onClick={handleAdd}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add Widget
              </button>
            </div>
          </div>
        )}

        <div className="mt-3 text-right">
          <button onClick={onClose} className="px-3 py-1">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
