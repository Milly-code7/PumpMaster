import type { PumpPressurePoint } from "@/interfaces/Pumps/PumpPressurePoint";

export function generateMockPressureHistory(): PumpPressurePoint[] {
  return Array.from({ length: 10 }).map((_, i) => ({
    timestamp: new Date(Date.now() - i * 3 * 3600 * 1000),
    pressure: Math.floor(100 + Math.random() * 100),
  }));
}
