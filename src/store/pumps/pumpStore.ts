import { create } from "zustand";
import type { PumpReq } from "@/interfaces/Pumps/PumpReq";

interface PumpStore {
  pumpFilter: PumpReq;
  setPumpFilter: (filter: Partial<PumpReq>) => void;
  resetPumpFilter: () => void;
}

const usePumpStore = create<PumpStore>((set) => ({
  pumpFilter: {
    search: "",
    pumpType: undefined,
    pumpArea: undefined,
    pageNumber: 1,
    pageSize: 15,
  },
  setPumpFilter: (filter: Partial<PumpReq>) => {
    set((state) => ({
      pumpFilter: { ...state.pumpFilter, ...filter },
    }));
  },
  resetPumpFilter: () =>
    set(() => ({
      pumpFilter: {
        search: "",
        pumpType: undefined,
        pumpArea: undefined,
        pageNumber: 1,
        pageSize: 15,
      },
    })),
}));

export default usePumpStore;