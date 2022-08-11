import React, { useEffect } from "react";
import { getDetailsApi } from "../../services/details";
import { getRankApi } from "../../services/rank";
import InfoManga from "../../components/Details/InfoManga";
import RankMonth from "../../components/Details/RankMonth";
import Meta from "../../components/Meta";
import MainLayout from "../../components/Layout/MainLayout";
import { ComicType } from "../../models/comics";
import { addComicToLocal } from "../../shared/saveHistory";
import Comments from "../../components/Details/Comments";
import useSWR from "swr";
import { useRouter } from "next/router";
import Error from "../../components/Error";
import SkeletonDetails from "../../components/Skeleton/SkeletonDetails";

const DetailManga = () => {
  const { slug } = useRouter().query;

  console.log(slug);

  const { data, error } = useSWR(`details-${slug}`, () => {
    if (slug) {
      return getDetailsApi(String(slug));
    }
  });

  useEffect(() => {
    if (data?.name) {
      const comic: ComicType = {
        name: data.name,
        href: `/${slug}`,
        img: data.img,
      };
      addComicToLocal(comic);
    }
  }, [slug, data]);

  if (error) {
    return <Error />;
  }

  return (
    <>
      <>
        <Meta
          title={data?.name!}
          image={data?.img!}
          description={data?.content!}
        />

        <MainLayout>
          {!data ? (
            <>
              <SkeletonDetails />
            </>
          ) : (
            <>
              <div className="flex flex-col lg:flex-row container">
                <InfoManga data={data} slug={String(slug)} />
              </div>
              <Comments />
            </>
          )}
        </MainLayout>
      </>
    </>
  );
};

export default DetailManga;
