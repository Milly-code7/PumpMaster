import type { PumpArea } from "@/enums/Pumps/PumpArea";
import type { PumpType } from "@/enums/Pumps/PumpType";

export interface CreatePumpDTO {
  pumpName: string;
  pumpType: PumpType;
  pumpArea: PumpArea;
  latitude: number;
  longitude: number;
  flowRate: number;
  offset: number;
  currentPressure: number;
}