import React, { FC, useEffect } from "react";
import { getDetailsApi } from "../../services/details";
import InfoManga from "../../components/Details/InfoManga";
import Meta from "../../components/Meta";
import MainLayout from "../../components/Layout/MainLayout";
import { ComicType } from "../../models/comics";
import { addComicToLocal } from "../../shared/saveHistory";
import Comments from "../../components/Details/Comments";
import { Details } from "../../models/details";
import { GetStaticPaths, GetStaticPropsContext } from "next";

interface DetailMangaProps {
  data: Details;
  slug: string;
}

const DetailManga: FC<DetailMangaProps> = ({ data, slug }) => {
  useEffect(() => {
    if (data?.name) {
      const comic: ComicType = {
        name: data.name,
        href: `/${slug}`,
        img: data.img,
      };
      addComicToLocal(comic);
    }
  }, [data]);

  return (
    <>
      <Meta
        title={data?.name!}
        image={data?.img!}
        description={data?.content!}
      />

      <MainLayout>
        <div className="flex flex-col lg:flex-row container">
          <InfoManga data={data} slug={String(slug)} />
        </div>
        <Comments />
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
      return {
        props: {
          data,
          slug,
        },
        revalidate: 1,
      };
    } catch (error) {
      return {
        notFound: true,
      };
    }
  }
};

export default DetailManga;
