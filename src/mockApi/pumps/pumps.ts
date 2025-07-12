import { apiClient } from "@/mockApi/common";
import { url } from "./url";
import type { PumpReq } from "@/interfaces/Pumps/PumpReq";
import type { PumpDetailReq } from "@/interfaces/Pumps/PumpDetailReq";
import type { PumpDetailRes } from "@/interfaces/Pumps/PumpDetailRes";
import { mockPumpList } from "@/mockData/Pumps/mockPumpList";
import type { IPump } from "@/interfaces/Pumps/IPump";
import { v4 as uuid } from "uuid";
import { mockPumpDetailMap } from "@/mockData/Pumps/mockPumpDetailMap";
import type { CreatePumpDTO } from "@/interfaces/Pumps/CreatePumpDTO";
import type { PumpRes } from "@/interfaces/Pumps/PumpRes";
import type { UpdatePumpDTO } from "@/interfaces/Pumps/UpdatePumpDTO";
import { PumpStatus } from "@/enums/Pumps/PumpStatus";


const useMock = true;

export async function getPumpList(params: PumpReq): Promise<PumpRes> {
  if (useMock) {
    const {
      search,
      pumpType,
      pumpArea,
      pageNumber = 1,
      pageSize = 15,
    } = params;

    const filtered = mockPumpList.items.filter((pump) => {
      const matchesSearch =
        !search ||
        pump.pumpName?.toLowerCase().includes(search.toLowerCase()) ||
        pump.pumpId?.includes(search);

      const matchesType = !pumpType || pump.pumpType === pumpType;
      const matchesArea = !pumpArea || pump.pumpArea === pumpArea;

      return matchesSearch && matchesType && matchesArea;
    });

    const totalCount = filtered.length;
    const totalPages = Math.ceil(totalCount / pageSize);
    const startIndex = (pageNumber - 1) * pageSize;
    const pagedItems = filtered.slice(startIndex, startIndex + pageSize);

    return {
      items: pagedItems,
      totalCount,
      totalPages,
      pageNumber,
      pageSize,
      hasPreviousPage: pageNumber > 1,
      hasNextPage: pageNumber < totalPages,
    };
  }

  // real
  const filteredParams = Object.entries(params).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== "") {
      acc[key as keyof PumpReq] = value;
    }
    return acc;
  }, {} as Partial<PumpReq>);

  const response = await apiClient.get(url.getPumpList, { params: filteredParams });
  return response.data;
}


export async function createPump(dto: CreatePumpDTO): Promise<IPump> {
  const newPump: IPump = {
    pumpId: uuid(),
    ...dto,
    minPressure: 0, 
    maxPressure: 0,
  };

  mockPumpList.items.push(newPump);

	mockPumpDetailMap[newPump.pumpId] = {
    ...newPump,
    status: PumpStatus.Operational,
    createdAt: new Date(),
    updatedAt: new Date(),
    pressureHistory: [],
  };

  return Promise.resolve(newPump);
}

export async function updatePump(dto: UpdatePumpDTO) {
  if (useMock) {
    const existing = mockPumpDetailMap[dto.pumpId];
    if (!existing) throw new Error(`Pump not found: ${dto.pumpId}`);

    mockPumpDetailMap[dto.pumpId] = {
      ...existing,
      ...dto,
      updatedAt: new Date(),
    };

    const index = mockPumpList.items.findIndex(p => p.pumpId === dto.pumpId);
    if (index !== -1) {
      mockPumpList.items[index] = {
        ...mockPumpList.items[index],
        ...dto,
      };
    }

    return Promise.resolve(true);
  }

  const response = await apiClient.put(`${url.updatePump}/${dto.pumpId}`, dto);
  return response.data;
}

export async function deletePump(pumpId: string): Promise<boolean> {
  if (useMock) {
    const index = mockPumpList.items.findIndex(p => p.pumpId === pumpId);
    if (index !== -1) {
      mockPumpList.items.splice(index, 1);
    }


    delete mockPumpDetailMap[pumpId];

    return Promise.resolve(true);
  }

  const response = await apiClient.delete(`${url.deletePump}/${pumpId}`);
  return response.data;
}

export async function getPumpDetail(params: PumpDetailReq): Promise<PumpDetailRes> {
  if (useMock) {
    const mock = mockPumpDetailMap[params.pumpId];

    if (!mock) {
      throw new Error(`No detail found for pumpId: ${params.pumpId}`);
    }

    return Promise.resolve(mock);
  }

  const response = await apiClient.get(`${url.getPumpDetail}/${params.pumpId}`);
  return response.data;
}