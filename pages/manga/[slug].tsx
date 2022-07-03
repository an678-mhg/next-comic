import { GetStaticPaths, GetStaticPropsContext } from "next";
import React, { FC } from "react";
import { getDetailsApi } from "../../api/details";
import { getRankApi } from "../../api/rank";
import InfoManga from "../../components/Details/InfoManga";
import RankMonth from "../../components/Details/RankMonth";
import { IsBrowser } from "../../components/IsBrowser";
import Meta from "../../components/Meta";
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
    <>
      <Meta title={data.name} image={data.img} description={data.content} />

      <MainLayout>
        <IsBrowser>
          <div className="flex flex-col lg:flex-row">
            <InfoManga data={data} slug={slug} />
            <RankMonth top_manga_month={top_manga_month} />
          </div>
        </IsBrowser>
      </MainLayout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
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
        revalidate: 60,
      };
    } catch (error) {
      return {
        notFound: true,
      };
    }
  }
};

export default DetailManga;
