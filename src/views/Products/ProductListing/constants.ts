export const PAGE_SIZE = 10 as const;

export const FILTER_KEYS = {
  SEARCH: "search",
  CATEGORY: "category",
  SORT: "sort",
  PAGE: "page",
  RATING: "rating",
} as const;

export type FilterKey = (typeof FILTER_KEYS)[keyof typeof FILTER_KEYS];

export type SortOrder = "asc" | "desc" | "";
