import client from ".";
import { NewChapterType, ReadChap } from "../models/comics";

export const getReadApi = async (
  slug: string,
  chap: string,
  id: string
): Promise<{ chapters: NewChapterType[]; results: ReadChap[] }> => {
  const res = await client.get(`/read?slug=/${slug}/${chap}/${id}`);
  return res.data;
};
