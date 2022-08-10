import client from ".";
import { Details } from "../models/details";

export const getDetailsApi = async (slug: string): Promise<Details> => {
  const res = await client(`/details/${slug}`);
  return res.data;
};
