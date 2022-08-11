import client from ".";
import { Banner, ComicType } from "../models/comics";

interface HomeApi {
  [key: string]: string;
}

interface HomeData {
  [key: string]: ComicType[];
}

const getHomeApi = async (): Promise<HomeData> => {
  const data: HomeApi = {
    "Truyện mới cập nhật": "/home",
    "Truyện nổi bật": "/rank/the-loai/all?status=-1&sort=10",
    "Truyện nổi bật ngày": "/rank/the-loai/all?status=-1&sort=13",
    "Truyện nổi bật tuần": "/rank/the-loai/all?status=-1&sort=12",
    "Truyện nổi bật tháng": "/rank/the-loai/all?status=-1&sort=11",
  };

  const res = await Promise.all(
    Object.keys(data).map(
      async (item) => await (await client.get(data[item])).data
    )
  );

  const homeResult = res.reduce((result, curr, index) => {
    result[Object.keys(data)[index]] = curr.data;
    return result;
  }, {} as any);

  return homeResult;
};

export const getBanner = async (): Promise<Banner[]> => {
  const res = await client.get("/home/banner");
  return res.data.data;
};

export default getHomeApi;
