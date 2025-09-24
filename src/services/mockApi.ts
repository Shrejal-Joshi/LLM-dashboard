// src/services/mockApi.ts
export type TokenUsagePoint = { timestamp: string; tokens: number };
export type LatencyBucket = { latency_ms: number; request_count: number };
export type CostItem = { model_name: string; cost: number };

const delay = (ms = 600) => new Promise((r) => setTimeout(r, ms));

/**
 * // data = [
 * //   { timestamp: "2023-10-01T10:00:00Z", tokens: 1080 },
 * //   { timestamp: "2023-10-01T10:05:00Z", tokens: 1320 },
 * //   { timestamp: "2023-10-01T10:10:00Z", tokens: 1200 },
 * //   { timestamp: "2023-10-01T10:15:00Z", tokens: 1560 }
 * // ]
 */
export async function fetchTokenUsage({
  timeRange = '24h',
}: { timeRange?: string } = {}): Promise<TokenUsagePoint[]> {
  await delay(300 + Math.random() * 300);

  const base = timeRange === '1h' ? 300 : timeRange === '24h' ? 1200 : 5000;

  return [
    { timestamp: '2023-10-01T10:00:00Z', tokens: Math.round(base * 0.9) },
    { timestamp: '2023-10-01T10:05:00Z', tokens: Math.round(base * 1.1) },
    { timestamp: '2023-10-01T10:10:00Z', tokens: Math.round(base * 1.0) },
    { timestamp: '2023-10-01T10:15:00Z', tokens: Math.round(base * 1.3) },
  ];
}

/**
 * // data = [
 * //   { latency_ms: 100, request_count: 50 },
 * //   { latency_ms: 200, request_count: 120 },
 * //   { latency_ms: 300, request_count: 80 },
 * //   { latency_ms: 400, request_count: 30 }
 * // ]
 * ```
 */
export async function fetchLatencyDistribution({
  timeRange = '24h',
}: { timeRange?: string } = {}): Promise<LatencyBucket[]> {
  await delay(200 + Math.random() * 300);

  const multiplier = timeRange === '1h' ? 1 : timeRange === '24h' ? 2 : 4;

  return [
    { latency_ms: 100, request_count: 50 * multiplier },
    { latency_ms: 200, request_count: 120 * multiplier },
    { latency_ms: 300, request_count: 80 * multiplier },
    { latency_ms: 400, request_count: 30 * multiplier },
  ];
}

/**
 * // allModels = [
 * //   { model_name: "GPT-4", cost: 450.75 },
 * //   { model_name: "Claude-2", cost: 320.5 },
 * //   { model_name: "Llama-2", cost: 150.25 }
 * // ]
 
 */
export async function fetchCostAnalysis({ model }: { model?: string } = {}): Promise<CostItem[]> {
  await delay(250 + Math.random() * 350);

  const costs = [
    { model_name: 'GPT-4', cost: 450.75 },
    { model_name: 'Claude-2', cost: 320.5 },
    { model_name: 'Llama-2', cost: 150.25 },
  ];

  return model ? costs.filter((c) => c.model_name === model) : costs;
}
