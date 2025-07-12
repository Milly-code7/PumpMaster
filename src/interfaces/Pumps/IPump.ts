import type { PumpArea } from "@/enums/Pumps/PumpArea";
import type { PumpType } from "@/enums/Pumps/PumpType";

export interface IPump {
    pumpId: string;
    pumpName: string;
    pumpType: PumpType;        
    pumpArea: PumpArea;         
    latitude: number;
    longitude: number;
    flowRate: number;    
    offset: number;     
    currentPressure: number;
    minPressure: number;
    maxPressure: number;
  }
  