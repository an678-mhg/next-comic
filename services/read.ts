import client from ".";

export const getReadApi = async (slug: string, chap: string, id: string) => {
  const res = await client.get(`/read?slug=/${slug}/${chap}/${id}`);
  return res.data;
};
