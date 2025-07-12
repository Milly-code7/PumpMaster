import FilterSelect from "../../../src/components/ui/custom/FilterSelect.tsx";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom";

const options = [
  { value: 1, label: "Option A" },
  { value: 2, label: "Option B" },
  { value: 3, label: "Option C" },
];

describe("FilterSelect", () => {
  it("should show selected value label", () => {
    render(
      <FilterSelect
        value={1}
        placeholder="Select"
        options={options}
        onChange={() => { } } 
        ariaLabel={""}    
      />
    );
    expect(screen.getByText("Option A")).toBeInTheDocument();
  });

  it("should show placeholder when no value is selected", () => {
    render(
      <FilterSelect
        value={undefined}
        placeholder="Please choose"
        options={options}
        onChange={() => { } }
        ariaLabel={""}
      />
    );
    expect(screen.getByText("Please choose")).toBeTruthy();
  });

   //Skipped due to Radix pointer event limitation in jsdom
  it.skip("should render all options when opened", async () => {
    render(
      <FilterSelect
        value={1}
        placeholder="Select"
        options={options}
        onChange={() => { } } 
        ariaLabel={""}      
      />
    );
    await userEvent.click(screen.getByRole("combobox"));
    expect(screen.getByText("Option A")).toBeInTheDocument();
    expect(screen.getByText("Option B")).toBeInTheDocument();
    expect(screen.getByText("Option C")).toBeInTheDocument();
  });

  it("should call onChange with correct value", async () => {
    const mockFn = vi.fn();
    render(
      <FilterSelect
        value={undefined}
        placeholder="Select"
        options={options}
        onChange={mockFn} 
        ariaLabel={""}
      />
    );
    await userEvent.click(screen.getByRole("combobox"));
    await userEvent.click(screen.getByText("Option B"));
    expect(mockFn).toHaveBeenCalledWith(2);
  });
});
