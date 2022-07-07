import { GetStaticPaths, GetStaticPropsContext } from "next";
import React, { FC, useEffect } from "react";
import { getDetailsApi } from "../../services/details";
import { getRankApi } from "../../services/rank";
import InfoManga from "../../components/Details/InfoManga";
import RankMonth from "../../components/Details/RankMonth";
import { IsBrowser } from "../../components/IsBrowser";
import Meta from "../../components/Meta";
import MainLayout from "../../components/Layout/MainLayout";
import { ComicType } from "../../models/comics";
import { Details } from "../../models/details";
import { addComicToLocal } from "../../shared/saveHistory";
import Comments from "../../components/Details/Comments";

interface DetailMangaProps {
  data: Details;
  top_manga_month: ComicType[];
  slug: string;
}

const DetailManga: FC<DetailMangaProps> = ({ data, top_manga_month, slug }) => {
  useEffect(() => {
    const comic: ComicType = {
      name: data.name,
      href: `/${slug}`,
      img: data.img,
    };
    addComicToLocal(comic);
  }, [slug]);

  return (
    <IsBrowser>
      <Meta title={data.name} image={data.img} description={data.content} />

      <MainLayout>
        <div className="flex flex-col lg:flex-row">
          <InfoManga data={data} slug={slug} />
          <RankMonth top_manga_month={top_manga_month} />
        </div>
        <Comments />
      </MainLayout>
    </IsBrowser>
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
