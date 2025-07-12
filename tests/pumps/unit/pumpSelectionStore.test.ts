import { describe, it, expect, beforeEach } from "vitest";
import { usePumpSelectionStore } from "../../../src/store/pumps//pumpSelectionStore";

beforeEach(() => {
  usePumpSelectionStore.getState().clearSelected();
});

describe("usePumpSelectionStore", () => {
  it("should toggle single selection", () => {
    usePumpSelectionStore.getState().toggleSelectOne("1");
    expect(usePumpSelectionStore.getState().selectedIds).toEqual(["1"]);

    usePumpSelectionStore.getState().toggleSelectOne("1");
    expect(usePumpSelectionStore.getState().selectedIds).toEqual([]);
  });

  it("should toggle all selections", () => {
    const allIds = ["1", "2", "3"];
    usePumpSelectionStore.getState().toggleSelectAll(allIds);
    expect(usePumpSelectionStore.getState().selectedIds).toEqual(allIds);

    usePumpSelectionStore.getState().toggleSelectAll(allIds);
    expect(usePumpSelectionStore.getState().selectedIds).toEqual([]);
  });

  it("should check if all selected", () => {
    const allIds = ["1", "2", "3"];
    usePumpSelectionStore.getState().toggleSelectAll(allIds);

    const isAll = usePumpSelectionStore.getState().isAllSelected(allIds);
    expect(isAll).toBe(true);

    usePumpSelectionStore.getState().toggleSelectOne("2");
    const isAllAfter = usePumpSelectionStore.getState().isAllSelected(allIds);
    expect(isAllAfter).toBe(false);
  });

  it("should clear all selected", () => {
    usePumpSelectionStore.getState().toggleSelectAll(["a", "b"]);
    usePumpSelectionStore.getState().clearSelected();
    expect(usePumpSelectionStore.getState().selectedIds).toEqual([]);
  });  
});