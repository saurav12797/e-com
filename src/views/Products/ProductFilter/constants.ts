export const SORT_OPTIONS: {
  label: string;
  value: SortOrder;
}[] = [
  { label: "Price Low To High", value: "asc" },
  { label: "Price High To Low", value: "desc" },
];

export const RATING_OPTIONS = [
  { label: "4★ & above", value: 4 },
  { label: "3★ & above", value: 3 },
  { label: "2★ & above", value: 2 },
];
export type SortOrder = "asc" | "desc" | "";

export interface FilterValues {
  search: string;
  category: string | null;
  rating: number | null;
  sort: SortOrder | null;
}
