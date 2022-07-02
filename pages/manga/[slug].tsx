import { GetStaticPaths, GetStaticProps } from "next";
import React, { FC } from "react";
import { getDetailsApi } from "../../api/details";
import { getRankApi } from "../../api/rank";
import SocialShare from "../../components/SocialShare";
import Title from "../../components/Title";
import MainLayout from "../../layout/MainLayout";
import { ComicType } from "../../models/comics";
import { Details } from "../../models/details";

interface DetailMangaProps {
  data: Details;
  top_manga_month: ComicType[];
  slug: string;
}

const DetailManga: FC<DetailMangaProps> = ({ data, top_manga_month, slug }) => {
  return (
    <MainLayout>
      <div className="flex">
        <div className="pt-4 flex-1 mr-10">
          <div>
            <div className="mb-5 text-center">
              <h1 className="uppercase font-bold text-xl">{data.name}</h1>
              <p className="font-semibold text-gray-500">{data.updatedAt}</p>
            </div>
            <div className="flex">
              <div className="w-[190px]">
                <img src={data.img} alt={data.name} />
              </div>
              <div className="flex-1 ml-10">
                <div className="flex items-center justify-between">
                  <SocialShare title={slug} />
                  <button className="bg-blue-500 px-3 py-2 text-text-color rounded-sm">
                    Theo dõi
                  </button>
                </div>
                <ul>
                  <li className="flex text-lg font-semibold my-2">
                    <p className="w-[30%]">Tác giả:</p>
                    <p className="ml-4">{data.author || "Đang cập nhật"}</p>
                  </li>
                  <li className="flex text-lg font-semibold my-2">
                    <p className="w-[30%]">Trạng thái:</p>
                    <p className="ml-4">{data.status}</p>
                  </li>
                  <li className="flex text-lg font-semibold my-2">
                    <p className="w-[30%]">Thể loại:</p>
                    <p className="ml-4 flex flex-wrap flex-1">
                      {data.categories.map((p) => (
                        <p key={p.category}>
                          {p.category} {"-"}
                        </p>
                      ))}
                    </p>
                  </li>
                </ul>
                <div className="flex items-center mt-4">
                  <button className="bg-green-500 px-3 py-2 text-text-color rounded-md">
                    Đọc từ đầu
                  </button>
                  <button className="bg-green-500 px-3 py-2 text-text-color rounded-md ml-5">
                    Đọc chap mới nhất
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Title>Nội dung</Title>
            <hr className="border-b-2 border-blue-500 my-2" />
            <p className="font-semibold">{data.content}</p>
          </div>
        </div>

        <div className="w-[320px] border-2 p-2">
          <h1 className="my-4 text-center font-semibold text-xl">Top tháng</h1>
          <hr />
          <ul>
            {top_manga_month.map((item, index: number) => (
              <li
                key={item.href}
                className="flex items-center mb-3 justify-between border-t-1 border-b-2"
              >
                <div className="flex items-center">
                  <p className="flex-1 mr-2">0{index + 1}</p>
                  <div className="w-[60px] h-[60px]">
                    <img src={item.img} alt={item.name} />
                  </div>
                </div>
                <div className="flex-1 ml-3">
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-sm font-semibold">
                    {item.newChapters[0] && item.newChapters[0].name}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MainLayout>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  if (slug) {
    try {
      const data = await getDetailsApi(slug);
      const top_manga_month = await getRankApi("all", "11");

      return {
        props: {
          data,
          top_manga_month: top_manga_month.data.slice(0, 10),
          slug,
        },
      };
    } catch (error) {
      return {
        notFound: true,
      };
    }
  }
};

export default DetailManga;
