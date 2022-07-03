import client from ".";

interface HomeApi {
  [key: string]: string;
}

const getHomeApi = async () => {
  const data: HomeApi = {
    "Truyện nổi bật": "/rank/the-loai/all?status=-1&sort=10",
    "Truyện nổi bật ngày": "/rank/the-loai/all?status=-1&sort=13",
    "Truyện nổi bật tuần": "/rank/the-loai/all?status=-1&sort=12",
    "Truyện nổi bật tháng": "/rank/the-loai/all?status=-1&sort=11",
    "Truyện mới cập nhật": "/home",
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

export default getHomeApi;
