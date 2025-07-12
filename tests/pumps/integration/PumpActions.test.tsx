import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePumpSelectionStore } from "../../../src/store/pumps/pumpSelectionStore.ts";
import PumpActions from  "../../../src/components/app/pumps/PumpActions.tsx";
import React from "react";
import "@testing-library/jest-dom";

vi.mock("@/mockApi/pumps/pumps", () => ({
  deletePump: vi.fn(async () => ({ success: true })),
  getPumpDetail: vi.fn(async ({ pumpId }) => ({
    pumpId,
    pumpName: `Pump ${pumpId}`,
    pumpType: 1,
    pumpArea: 2,
    latitude: -30.123,
    longitude: 151.456,
    flowRate: 100,
    offset: 5,
    minPressure: 90,
    maxPressure: 150,
  })),
  updatePump: vi.fn(async () => ({ success: true })),
  createPump: vi.fn(async () => ({ success: true })),
}));

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>
);

describe("PumpActions (integration)", () => {
  beforeEach(() => {
    usePumpSelectionStore.getState().clearSelected();
  });

  it("default: only New is enabled", () => {
    render(<PumpActions />, { wrapper: Wrapper });
    expect(screen.getByText("New")).toBeEnabled();
    expect(screen.getByText("Edit")).toBeDisabled();
    expect(screen.getByText("Delete")).toBeDisabled();
  });

  it("select one: Edit and Delete enabled", () => {
    usePumpSelectionStore.setState({ selectedIds: ["123"] });
    render(<PumpActions />, { wrapper: Wrapper });
    expect(screen.getByText("Edit")).toBeEnabled();
    expect(screen.getByText("Delete")).toBeEnabled();
  });

  it("select multiple: only Delete enabled", () => {
    usePumpSelectionStore.setState({ selectedIds: ["1", "2"] });
    render(<PumpActions />, { wrapper: Wrapper });
    expect(screen.getByText("Edit")).toBeDisabled();
    expect(screen.getByText("Delete")).toBeEnabled();
  });

  it("click New shows CreateEditPumpDialog", async () => {
    render(<PumpActions />, { wrapper: Wrapper });
    await userEvent.click(screen.getByText("New"));
    expect(await screen.findByText("Create Pump")).toBeInTheDocument();
  });

  it("click Edit shows Edit dialog with correct title", async () => {
    usePumpSelectionStore.setState({ selectedIds: ["123"] });
    render(<PumpActions />, { wrapper: Wrapper });
    await userEvent.click(screen.getByText("Edit"));
    expect(await screen.findByText("Edit Pump")).toBeInTheDocument();
    expect(await screen.findByDisplayValue("Pump 123")).toBeInTheDocument();
  });

  it("click Delete shows DeletePumpDialog", async () => {
    usePumpSelectionStore.setState({ selectedIds: ["123", "456"] });
    render(<PumpActions />, { wrapper: Wrapper });
    await userEvent.click(screen.getByText("Delete"));
    expect(await screen.findByText("Yes, delete")).toBeInTheDocument();
    expect(await screen.findByText("Pump 123")).toBeInTheDocument();
    expect(await screen.findByText("Pump 456")).toBeInTheDocument();
  });
});
