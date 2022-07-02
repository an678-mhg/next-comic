import client from ".";

export const getHomeApi = async (page: number) => {
  const res = await client.get(`/home?page=${page}`);
  return res.data;
};
