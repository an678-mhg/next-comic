import client from ".";
import { NewChapterType, ReadChap } from "../models/comics";

export const getReadApi = async (
  slug: string,
  chap: string,
  id: string
): Promise<{ results: ReadChap[] }> => {
  const res = await client.get(`/read?slug=/${slug}/${chap}/${id}`);
  return res.data;
};

export const getFullChapterApi = async (
  slug: string
): Promise<{ chapters: NewChapterType[] }> => {
  const res = await client.get(`/read/chapters?slug=/${slug}`);
  return res.data;
};
