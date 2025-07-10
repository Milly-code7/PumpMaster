import { apiClient } from "@/api/common";
import { url } from "./url";
import type { PumpReq } from "@/interfaces/Pumps/PumpOverview/PumpReq";
import type { PumpRes } from "@/interfaces/Pumps/PumpOverview/PumpRes";
import type { PumpDetailReq } from "@/interfaces/Pumps/PumpInspection/PumpDetailReq";
import type { PumpDetailRes } from "@/interfaces/Pumps/PumpInspection/PumpDetailRes";

export async function getPumpList(params: PumpReq): Promise<PumpRes> {
	const filteredParams = Object.entries(params).reduce((acc, [key, value]) => {
		if (value !== undefined && value !== "") {
				acc[key as keyof PumpReq] = value;
		}
		return acc;
	}, {} as Partial<PumpReq>);

	const response = await apiClient.get(url.getPumpList, { params: filteredParams });

	return response.data;
}


export async function fetchPumpDetail(params: PumpDetailReq): Promise<PumpDetailRes> {
  const response = await apiClient.get(`${url.getPumpDetail}/${params.pumpId}`);
  return response.data;
}