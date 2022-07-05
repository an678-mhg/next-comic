import { NewChapterType } from "../models/comics";

export interface Details {
  name: string;
  author: string;
  categories: Category[];
  chapters: NewChapterType[];
  content: string;
  img: string;
  status: string;
  updatedAt: string;
}

export interface Category {
  category: string;
  href: string;
}
