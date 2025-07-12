import type { IPump } from "./IPump";

export interface PumpRes {
  items: IPump[];
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  pageSize: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}