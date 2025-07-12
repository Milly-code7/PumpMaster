import { create } from "zustand";

interface PumpSelectionState {
  selectedIds: string[];
  toggleSelectOne: (id: string) => void;
  toggleSelectAll: (allIds: string[]) => void;
  clearSelected: () => void;
  isAllSelected: (allIds: string[]) => boolean;
}

export const usePumpSelectionStore = create<PumpSelectionState>((set, get) => ({
  selectedIds: [],

  toggleSelectOne: (id) => {
    const { selectedIds } = get();
    const updated = selectedIds.includes(id)
      ? selectedIds.filter((x) => x !== id)
      : [...selectedIds, id];
    set({ selectedIds: updated });
  },

  toggleSelectAll: (allIds) => {
    const { selectedIds } = get();
    const allSelected = allIds.every((id) => selectedIds.includes(id));
    set({ selectedIds: allSelected ? [] : [...allIds] });
  },

  clearSelected: () => set({ selectedIds: [] }),

  isAllSelected: (allIds) => {
    const { selectedIds } = get();
    return allIds.length > 0 && allIds.every((id) => selectedIds.includes(id));
  }
}));
