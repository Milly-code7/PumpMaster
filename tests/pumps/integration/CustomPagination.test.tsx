import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CustomPagination from "../../../src/components/ui/custom/CustomPagination";
import { describe, it, expect, vi } from "vitest";
import React from "react";
import "@testing-library/jest-dom/vitest";

describe("CustomPagination Component", () => {
  it("triggers onPageChange with next page number when clicking 'Next'", async () => {
    const onPageChange = vi.fn();
    const user = userEvent.setup();

    render(
      <CustomPagination
        currentPage={1}
        totalPages={5}
        onPageChange={onPageChange}
      />
    );

    const nextButton = screen.getByRole("button", { name: /next page/i });
    await user.click(nextButton);

    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("disables 'Next' button on last page", () => {
    const onPageChange = vi.fn();

    render(
      <CustomPagination
        currentPage={5}
        totalPages={5}
        onPageChange={onPageChange}
      />
    );

    const nextButton = screen.getByRole("button", { name: /next page/i });
    expect(nextButton).toBeDisabled();
  });

  it("disables 'Previous' button on first page", () => {
    const onPageChange = vi.fn();

    render(
      <CustomPagination
        currentPage={1}
        totalPages={5}
        onPageChange={onPageChange}
      />
    );

    const prevButton = screen.getByRole("button", { name: /previous page/i });
    expect(prevButton).toBeDisabled();
  });
});
