import client from ".";

export const getDetailsApi = async (slug: string) => {
  const res = await client(`/details/${slug}`);
  return res.data;
};
