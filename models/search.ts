export interface FilterItem {
  id: number;
  name: string;
}

export interface Filter {
  gender: FilterItem[];
  genres: FilterItem[];
  min_chapters: FilterItem[];
  sort: FilterItem[];
  status: FilterItem[];
}
