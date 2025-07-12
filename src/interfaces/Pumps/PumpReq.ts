import type { PumpArea } from "@/enums/Pumps/PumpArea";
import type { PumpType } from "@/enums/Pumps/PumpType";

export interface PumpReq {
    search?: string;      
    pumpType?: PumpType;        
    pumpArea?: PumpArea;       
    pageNumber: number;
    pageSize: number;
  }
  