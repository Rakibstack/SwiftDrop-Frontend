"use client";

import { Button } from "@/components/ui/button";
import {
ChevronLeft,
ChevronRight,
ChevronsLeft,
ChevronsRight,
} from "lucide-react";

interface DataPaginationProps {
page: number;
totalPages: number;
total: number;
onPageChange: (page: number) => void;
}

export function DataPagination({
page,
totalPages,
total,
onPageChange,
}: DataPaginationProps) {
const safeTotalPages = Math.max(totalPages, 1);
const safePage = Math.min(Math.max(page, 1), safeTotalPages);

const pageNumbers = () => {
if (safeTotalPages <= 5) {
return Array.from({ length: safeTotalPages }, (_, i) => i + 1);
}

if (safePage <= 3) {
  return [1, 2, 3, 4, "...", safeTotalPages] as const;
}

if (safePage >= safeTotalPages - 2) {
  return [
    1,
    "...",
    safeTotalPages - 3,
    safeTotalPages - 2,
    safeTotalPages - 1,
    safeTotalPages,
  ] as const;
}

return [
  1,
  "...",
  safePage - 1,
  safePage,
  safePage + 1,
  "...",
  safeTotalPages,
] as const;

};

const startItem = total === 0 ? 0 : (safePage - 1) * 10 + 1;
const endItem = Math.min(safePage * 10, total);

return ( <nav
   aria-label="Pagination"
   className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
 >
{/* Results information */} <p className="text-sm text-muted-foreground">
Showing{" "} <span className="font-semibold text-foreground">
{startItem}–{endItem} </span>{" "}
of{" "} <span className="font-semibold text-foreground">
{total.toLocaleString()} </span>{" "}
results </p>


  {/* Page navigation */}
  <div className="flex flex-wrap items-center justify-center gap-1.5">
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="size-9 rounded-lg"
      disabled={safePage <= 1}
      onClick={() => onPageChange(1)}
      aria-label="Go to first page"
    >
      <ChevronsLeft className="size-4" />
    </Button>

    <Button
      type="button"
      variant="outline"
      size="icon"
      className="size-9 rounded-lg"
      disabled={safePage <= 1}
      onClick={() => onPageChange(safePage - 1)}
      aria-label="Go to previous page"
    >
      <ChevronLeft className="size-4" />
    </Button>

    {pageNumbers().map((item, index) =>
      item === "..." ? (
        <span
          key={`ellipsis-${index}`}
          aria-hidden="true"
          className="flex size-9 items-center justify-center text-sm text-muted-foreground"
        >
          ...
        </span>
      ) : (
        <Button
          key={item}
          type="button"
          variant={item === safePage ? "default" : "outline"}
          size="icon"
          className={`size-9 rounded-lg ${
            item === safePage
              ? "bg-orange-600 text-white shadow-sm hover:bg-orange-700"
              : ""
          }`}
          aria-label={`Go to page ${item}`}
          aria-current={item === safePage ? "page" : undefined}
          onClick={() => onPageChange(item)}
        >
          {item}
        </Button>
      ),
    )}

    <Button
      type="button"
      variant="outline"
      size="icon"
      className="size-9 rounded-lg"
      disabled={safePage >= safeTotalPages}
      onClick={() => onPageChange(safePage + 1)}
      aria-label="Go to next page"
    >
      <ChevronRight className="size-4" />
    </Button>

    <Button
      type="button"
      variant="outline"
      size="icon"
      className="size-9 rounded-lg"
      disabled={safePage >= safeTotalPages}
      onClick={() => onPageChange(safeTotalPages)}
      aria-label="Go to last page"
    >
      <ChevronsRight className="size-4" />
    </Button>
  </div>
</nav>

);
}
