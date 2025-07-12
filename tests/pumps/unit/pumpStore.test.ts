import { describe, it, expect, beforeEach } from "vitest";
import usePumpStore from "../../../src/store/pumps/pumpStore";

beforeEach(() => {
  usePumpStore.getState().resetPumpFilter();
});

describe("usePumpStore", () => {
  it("should have initial filter values", () => {
    const { pumpFilter } = usePumpStore.getState();
    expect(pumpFilter).toEqual({
      search: "",
      pumpType: undefined,
      pumpArea: undefined,
      pageNumber: 1,
      pageSize: 15,
    });
  });

  it("should update filter values using setPumpFilter", () => {
    usePumpStore.getState().setPumpFilter({ search: "abc", pumpArea: 3 });
    const { pumpFilter } = usePumpStore.getState();
    expect(pumpFilter.search).toBe("abc");
    expect(pumpFilter.pumpArea).toBe(3);
    expect(pumpFilter.pumpType).toBeUndefined(); 
    expect(pumpFilter.pageNumber).toBe(1);    
    expect(pumpFilter.pageSize).toBe(15);
  });  

  it("should reset filter values using resetPumpFilter", () => {
    usePumpStore.getState().setPumpFilter({ search: "test", pumpType: 2 });
    usePumpStore.getState().resetPumpFilter();
    const { pumpFilter } = usePumpStore.getState();
    expect(pumpFilter).toEqual({
      search: "",
      pumpType: undefined,
      pumpArea: undefined,
      pageNumber: 1,
      pageSize: 15,
    });
  });
});
