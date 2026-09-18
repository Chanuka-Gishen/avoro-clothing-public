"use client";

import { useQuery } from "@tanstack/react-query";

import { getMaterials } from "../api/material.api";
import { materialQueryKeys } from "../api/material.queries";

export function useMaterials() {
  return useQuery({
    queryKey: materialQueryKeys.list(),
    queryFn: getMaterials,
  });
}
