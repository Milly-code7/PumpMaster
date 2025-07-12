import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DeletePumpDialog from "../../../src/components/app/pumps/DeletePumpDialog.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { describe, expect, it, vi } from "vitest";
import React from "react";


vi.mock("@/mockApi/pumps/pumps", async () => {
  return {
    getPumpDetail: vi.fn(async ({ pumpId }) => ({
      pumpId,
      pumpName: `Pump ${pumpId}`,
    })),
    deletePump: vi.fn(async (id) => ({ success: true })),
  };
});

function renderWithQueryClient(ui: React.ReactElement) {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
  );
}

describe("DeletePumpDialog", () => {
  it("should show pump names when opened", async () => {
    renderWithQueryClient(
      <DeletePumpDialog open={true} onClose={() => {}} pumpIds={["1", "2"]} />
    );

    expect(screen.getByText("Delete")).toBeTruthy();
    await screen.findByText("Pump 1");
    await screen.findByText("Pump 2");
  });

  it("should call deletePump and onDeleted", async () => {
    const onDeleted = vi.fn();
    renderWithQueryClient(
      <DeletePumpDialog
        open={true}
        onClose={() => {}}
        pumpIds={["123"]}
        onDeleted={onDeleted}
      />
    );

    const btn = await screen.findByText("Yes, delete");
    await userEvent.click(btn);

    await waitFor(() => {
      expect(onDeleted).toHaveBeenCalled();
    });
  });

  it("should show alert if delete fails", async () => {
    const alertSpy = vi.spyOn(window, "alert").mockImplementation(() => {});
    const { deletePump } = await import("../../../src/mockApi/pumps/pumps.ts");
    (deletePump as any).mockRejectedValueOnce(new Error("failed"));

    renderWithQueryClient(
      <DeletePumpDialog
        open={true}
        onClose={() => {}}
        pumpIds={["error"]}
      />
    );

    const btn = await screen.findByText("Yes, delete");
    await userEvent.click(btn);

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        "Failed to delete. Please try again."
      );
    });
  });
});
