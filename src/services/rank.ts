import client from ".";

export const getRankApi = async (
  type: string,
  sort: string,
  status: string = "-1"
) => {
  const res = await client.get(
    `/rank/the-loai/${type}?status=${status}&sort=${sort}`
  );
  return res.data;
};
