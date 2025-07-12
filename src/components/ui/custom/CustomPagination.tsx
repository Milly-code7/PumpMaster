import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export default function CustomPagination({
  currentPage,
  totalPages,
  onPageChange,
}: CustomPaginationProps) {
  return (
    <div className="flex justify-end items-center mt-4 gap-2">
      <Button
        variant="outline"
        size="icon"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="rounded-full"
        aria-label="Previous Page"
      >
        <ChevronLeft className="w-5 h-5" />
      </Button>

      <span className="text-sm font-medium px-2">
        Page {currentPage} of {totalPages}
      </span>

      <Button
        variant="outline"
        size="icon"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="rounded-full"
        aria-label="Next Page"
      >
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
}
