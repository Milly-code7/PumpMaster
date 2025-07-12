import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PumpOverview from "../../../src/pages/PumpOverview";
import React from "react";
import { describe, expect, it, vi } from "vitest";
import { usePumpContext } from "../../../src/context/PumpContext";
import type { PumpRes } from "../../../src/interfaces/Pumps/PumpRes";
import type { UseQueryResult } from "@tanstack/react-query";
import "@testing-library/jest-dom/vitest";
import { MemoryRouter } from "react-router-dom";

vi.mock("../../../src/context/PumpContext", () => ({
  usePumpContext: vi.fn(),
}));

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={new QueryClient()}>
    <MemoryRouter>{children}</MemoryRouter>
  </QueryClientProvider>
);

describe("PumpOverview - loading state rendering", () => {
  it("shows Spinner while loading", () => {
    vi.mocked(usePumpContext).mockReturnValue({
      pumpList: {
        isLoading: true,
        isError: false,
        isSuccess: false,
        refetch: vi.fn(),
      } as unknown as UseQueryResult<PumpRes>,
      createPump: {} as any,
      updatePump: {} as any,
      deletePump: {} as any,
    });

    render(<PumpOverview />, { wrapper: Wrapper });
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("renders pump list when data is loaded", () => {
    const fakePumpData: PumpRes = {
      items: [
        {
          pumpId: "1",
          pumpName: "Pump A",
          pumpType: 1,
          pumpArea: 2,
          latitude: -30.123,
          longitude: 151.456,
          flowRate: 100,
          offset: 5,
          currentPressure: 120,
          minPressure: 90,
          maxPressure: 150,
        },
        {
          pumpId: "2",
          pumpName: "Pump B",
          pumpType: 1,
          pumpArea: 2,
          latitude: -31.123,
          longitude: 150.456,
          flowRate: 90,
          offset: 4,
          currentPressure: 115,
          minPressure: 85,
          maxPressure: 140,
        },
      ],
      pageNumber: 1,
      totalPages: 1,
      totalCount: 2,
      pageSize: 10,
      hasPreviousPage: false,
      hasNextPage: false,
    };

    vi.mocked(usePumpContext).mockReturnValue({
      pumpList: {
        isLoading: false,
        isError: false,
        isSuccess: true,
        refetch: vi.fn(),
        data: fakePumpData,
      } as unknown as UseQueryResult<PumpRes>,
      createPump: {} as any,
      updatePump: {} as any,
      deletePump: {} as any,
    });

    render(<PumpOverview />, { wrapper: Wrapper });

    expect(screen.getByText("Pump A")).toBeInTheDocument();
    expect(screen.getByText("Pump B")).toBeInTheDocument();
  });

  it("shows fallback when no data", () => {
    vi.mocked(usePumpContext).mockReturnValue({
      pumpList: {
        isLoading: false,
        isError: false,
        isSuccess: true,
        refetch: vi.fn(),
        data: null,
      } as unknown as UseQueryResult<PumpRes>,
      createPump: {} as any,
      updatePump: {} as any,
      deletePump: {} as any,
    });

    render(<PumpOverview />, { wrapper: Wrapper });
    expect(screen.getByText("No data found.")).toBeInTheDocument();
  });
});
