import client from ".";

const searchApi = {
  getFullFilterApi: async () => {
    const res = await client.get("/search/filter");
    return res.data;
  },
  getSearchAdvanced: async (
    gender: number = -1,
    genres: string,
    min_chapters: number = 1,
    sort: number = 0,
    status: number = -1,
    page: number = 1
  ) => {
    const res = await client.get(
      `/search/advanced?genres=${genres}&gender=${gender}&status=${status}&minchapter=${min_chapters}&sort=${sort}&page=${page}`
    );
    return res.data;
  },
};

export default searchApi;
