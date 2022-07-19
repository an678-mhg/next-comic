import client from ".";

const searchApi = {
  getFullFilterApi: async () => {
    const res = await client.get("/search/filter");
    return res.data;
  },
  getSearchAdvanced: async (
    gender: number = -1,
    genres: number[],
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
  getSearchKeyWord: async (
    keyword: string | undefined,
    page: number | undefined
  ) => {
    if (keyword) {
      const res = await client.get(
        `/search?keyword=${keyword}&page=${page || 1}`
      );
      return res.data;
    }

    return null;
  },
};

export default searchApi;
