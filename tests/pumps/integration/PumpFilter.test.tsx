import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PumpFilter from "../../../src/components/app/pumps/PumpFilters.tsx";
import { describe, it, expect, beforeEach, beforeAll } from "vitest";
import usePumpStore from "../../../src/store/pumps/pumpStore.ts";
import React from "react";
import "@testing-library/jest-dom/vitest";

beforeEach(() => {
  usePumpStore.getState().setPumpFilter({ search: "", pumpType: 0, pumpArea: 0 });
});

describe("PumpFilter component", () => {
  it("renders all filter inputs", () => {
    render(<PumpFilter />);
    expect(screen.getByPlaceholderText("Search Pump Name")).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: /pump type/i })).toBeInTheDocument();
    expect(screen.getByRole("combobox", { name: /pump area/i })).toBeInTheDocument();
  });

  it("updates search input", async () => {
    const user = userEvent.setup();
    render(<PumpFilter />);
    const input = screen.getByPlaceholderText("Search Pump Name");
    await user.type(input, "Pump A");
    expect(usePumpStore.getState().pumpFilter.search).toBe("Pump A");
  });

  it("updates pumpType from dropdown", async () => {
    const user = userEvent.setup();
    render(<PumpFilter />);
    const typeSelect = screen.getByRole("combobox", { name: /pump type/i })

    await user.click(typeSelect);
    await user.click(screen.getByText("Centrifugal"));

    expect(usePumpStore.getState().pumpFilter.pumpType).toBe(1);
  });

  it("updates pumpArea from dropdown", async () => {
    const user = userEvent.setup();
    render(<PumpFilter />);
    const areaSelect = screen.getByRole("combobox", { name: /pump area/i })
    await user.click(areaSelect);
    await user.click(screen.getByText("Area B"));

    expect(usePumpStore.getState().pumpFilter.pumpArea).toBe(2);
  });
});
