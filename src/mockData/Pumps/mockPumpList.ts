// mockData/Pumps/mockPumpList.ts
import type { PumpRes } from "@/interfaces/Pumps/PumpRes";
import { generateMockPump } from "./generateMockPump";

let cachedPumpList: PumpRes | null = null;

 function getMockPumpList(): PumpRes {
  if (cachedPumpList) return cachedPumpList;

  const items = Array.from({ length: 25 }).map((_, i) => generateMockPump(i));

  cachedPumpList = {
    pageNumber: 1,
    pageSize: 10,
    totalPages: 2,
    totalCount: items.length,
    hasPreviousPage: false,
    hasNextPage: false,
    items,
  };

  return cachedPumpList;
}

export const mockPumpList = getMockPumpList();
