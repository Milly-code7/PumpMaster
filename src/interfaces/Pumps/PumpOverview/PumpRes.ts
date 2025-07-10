import type { PaginationState } from "@/interfaces/Pagination/PaginationState";
import type { IPump } from "./IPump";

export interface PumpRes extends PaginationState {
    items: IPump[];
  }
  