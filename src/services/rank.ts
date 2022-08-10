import client from ".";
import { ComicType } from "../models/comics";

export const getRankApi = async (
  type: string,
  sort: string,
  status: string = "-1"
): Promise<ComicType[]> => {
  const res = await client.get(
    `/rank/the-loai/${type}?status=${status}&sort=${sort}`
  );
  return res.data.data.slice(0, 11);
};
