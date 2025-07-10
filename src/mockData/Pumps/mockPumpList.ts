import { PumpType } from "@/enums/Pumps/PumpType";
import { PumpArea } from "@/enums/Pumps/PumpArea";
import type { IPump } from "@/interfaces/Pumps/PumpOverview/IPump";


function getRandomFromArray<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}
function generateRandomLat(): number {
  return parseFloat((-26.6 + Math.random() * 0.3).toFixed(4)); // Sunshine Coast
}
function generateRandomLng(): number {
  return parseFloat((153.0 + Math.random() * 0.2).toFixed(4));
}
function generateMockPump(i: number): IPump {
  const pumpType = getRandomFromArray([1, 2, 3, 4, 5]) as PumpType;
  const pumpArea = getRandomFromArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) as PumpArea;
  const currentPressure = getRandomFromArray([
    90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200
  ]);
  const flowRate = getRandomFromArray([100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]);
  const offset = Math.floor(Math.random() * 10);

  return {
    pumpId: `uuid-${i + 1}`,
    pumpType,
    pumpArea,
    latitude: generateRandomLat(),
    longitude: generateRandomLng(),
    flowRate,
    offset,
    currentPressure,
    minPressure: currentPressure - 20,
    maxPressure: currentPressure + 20
  };
}


export const mockPumpItems: IPump[] = Array.from({ length: 15 }).map((_, i) =>
  generateMockPump(i)
);
