import type { PumpStatus } from "@/enums/Pumps/PumpStatus";
import type { PumpPressurePoint } from "./PumpPressurePoint";
import type { PumpType } from "@/enums/Pumps/PumpType";
import type { PumpArea } from "@/enums/Pumps/PumpArea";

export interface PumpDetailRes {
	pumpId: string;
	status: PumpStatus;
	lastUpdated: Date;

	pumpType: PumpType;
	pumpArea: PumpArea;
	latitude: number;
	longitude: number;

	flowRate: number;
	offset: number;

	currentPressure: number;
	minPressure: number;
	maxPressure: number;

	pressureHistory: PumpPressurePoint[]
}
