import { PumpType } from "@/enums/Pumps/PumpType";
import { PumpArea } from "@/enums/Pumps/PumpArea";
import type { IPump } from "@/interfaces/Pumps/IPump";

function getRandomFromArray<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomLat(): number {
  return parseFloat((-44 + Math.random() * 34).toFixed(4));
}

function generateRandomLng(): number {
  return parseFloat((113 + Math.random() * 41).toFixed(4));
}

export function generateMockPump(i: number): IPump {
  const pumpType = getRandomFromArray([1, 2, 3, 4, 5]) as PumpType;
  const pumpArea = getRandomFromArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) as PumpArea;
  const currentPressure = getRandomFromArray([
    90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200,
  ]);
  const flowRate = getRandomFromArray([100, 200, 300, 400, 500, 600, 700, 800, 900, 1000]);
  const offset = Math.floor(Math.random() * 10);

  return {
    pumpId: `uuid-${i + 1}`,
    pumpName: `Pump ${i + 1}`,
    pumpType,
    pumpArea,
    latitude: generateRandomLat(),
    longitude: generateRandomLng(),
    flowRate,
    offset,
    currentPressure,
    minPressure: currentPressure - 20,
    maxPressure: currentPressure + 20,
  };
}
