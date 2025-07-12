import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import CreateEditPumpDialog from  "../../../src/components/app/pumps/CreateEditPumpDialog.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

vi.mock("@/mockApi/pumps/pumps", () => ({
  getPumpDetail: vi.fn(async () => ({
    pumpId: "123",
    pumpName: "Pump 123",
    pumpType: 1,
    pumpArea: 2,
    latitude: -30.123,
    longitude: 151.456,
    flowRate: 100,
    offset: 5,
    minPressure: 90,
    maxPressure: 150,
  })),
  createPump: vi.fn(async () => ({ success: true })),
  updatePump: vi.fn(async () => ({ success: true })),
}));

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={new QueryClient()}>{children}</QueryClientProvider>
);

describe("CreateEditPumpDialog (integration)", () => {
  it("renders create mode with empty fields", () => {
    render(
      <CreateEditPumpDialog open={true} isEditing={false} onClose={() => {}} />,
      { wrapper: Wrapper }
    );

    expect(screen.getAllByText("New Pump")).toHaveLength(2);
    expect(screen.getByPlaceholderText("Pump Master")).toBeInTheDocument();
    expect(screen.getByText("Create Pump")).toBeInTheDocument();

  });

  it("renders edit mode and loads pump details", async () => {
    render(
      <CreateEditPumpDialog
        open={true}
        isEditing={true}
        pumpId="123"
        onClose={() => {}}
      />,
      { wrapper: Wrapper }
    );

    await screen.findByDisplayValue("Pump 123");
    expect(screen.getByText("Edit Pump")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Pump 123")).toBeInTheDocument();
    expect(screen.getByText("Save Changes")).toBeInTheDocument();
  });

  it("submits new pump data on create", async () => {
    const { createPump } = await import("../../../src/mockApi/pumps/pumps.ts");
    const onClose = vi.fn();

    render(
      <CreateEditPumpDialog open={true} isEditing={false} onClose={onClose} />,
      { wrapper: Wrapper }
    );

    await userEvent.type(screen.getByPlaceholderText("Pump Master"), "Test Pump");
    await userEvent.type(screen.getByPlaceholderText("e.g. -31.5031"), "-31.1234");
    await userEvent.type(screen.getByPlaceholderText("e.g. 131.5035"), "132.5678");
    await userEvent.type(screen.getByPlaceholderText("e.g. 5"), "5");
    await userEvent.type(screen.getByPlaceholderText("e.g. 150"), "120");

    await userEvent.click(screen.getByText("Create Pump"));

    await waitFor(() => {
      expect(createPump as any).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    });
  });

  it("calls updatePump and closes dialog when saving in edit mode", async () => {
    const { updatePump } = await import("../../../src/mockApi/pumps/pumps.ts");
    const onClose = vi.fn();
  
    render(
      <CreateEditPumpDialog
        open={true}
        isEditing={true}
        pumpId="123"
        onClose={onClose}
      />,
      { wrapper: Wrapper }
    );
  
    await screen.findByDisplayValue("Pump 123");
  
    await userEvent.click(screen.getByText("Save Changes"));
  
    await waitFor(() => {
      expect(updatePump as any).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    });
  });
  
  it("shows alert when API call fails", async () => {
    const { createPump } = await import("../../../src/mockApi/pumps/pumps.ts");
    (createPump as any).mockRejectedValueOnce(new Error("API failed"));
  
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
    const onClose = vi.fn();
  
    render(
      <CreateEditPumpDialog open={true} isEditing={false} onClose={onClose} />,
      { wrapper: Wrapper }
    );
  
    await userEvent.type(screen.getByPlaceholderText("Pump Master"), "Fail Pump");
    await userEvent.type(screen.getByPlaceholderText("e.g. -31.5031"), "-31.1");
    await userEvent.type(screen.getByPlaceholderText("e.g. 131.5035"), "131.1");
    await userEvent.type(screen.getByPlaceholderText("e.g. 5"), "5");
    await userEvent.type(screen.getByPlaceholderText("e.g. 150"), "120");
  
    await userEvent.click(screen.getByText("Create Pump"));
  
    await waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith("Failed to save pump. Please try again.");
      expect(onClose).not.toHaveBeenCalled();
    });
  
    alertMock.mockRestore();
  });
});
