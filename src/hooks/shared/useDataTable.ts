
"use client";

import { useState } from "react";

export function useDataTable() {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setPage(1);
  };

  const handleLimitChange = (value: number) => {
    setLimit(value);
    setPage(1);
  };

  return {
    page,
    limit,
    searchTerm,
    status,
    setPage,
    setSearchTerm: handleSearchChange,
    setStatus: handleStatusChange,
    setLimit: handleLimitChange,
  };
}