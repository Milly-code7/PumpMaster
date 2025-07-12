import { PumpStatus } from "@/enums/Pumps/PumpStatus";

import type { PumpDetailRes } from "@/interfaces/Pumps/PumpDetailRes";
import { mockPumpList } from "./mockPumpList";
import { generateMockPressureHistory } from "./generateMockPressureHistory";

function getRandomStatus(): PumpStatus {
  const statuses = [PumpStatus.Offline, PumpStatus.Operational, PumpStatus.Maintenance];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

export const mockPumpDetailMap: Record<string, PumpDetailRes> = Object.fromEntries(
  mockPumpList.items.map((item) => [
    item.pumpId,
    {
      ...item,
      pumpName: item.pumpName,
      status: getRandomStatus(), 
      createdAt: new Date(),
      updatedAt: new Date(),
      pressureHistory: generateMockPressureHistory(),
    },
  ])
);
