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

const DetailManga = () => {
  const { slug } = useRouter().query;

  const { data, error } = useSWR(`details-${slug}`, () =>
    getDetailsApi(String(slug))
  );

  const { data: rankMonth, error: rankMonthError } = useSWR("rank-month", () =>
    getRankApi("all", "11")
  );

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

  if (error || rankMonthError) {
    return <Error />;
  }

  return (
    <>
      {!data || !rankMonth ? (
        <h1>Loading....</h1>
      ) : (
        <>
          <Meta
            title={data?.name}
            image={data.img}
            description={data.content}
          />

          <MainLayout>
            <div className="flex flex-col lg:flex-row">
              <InfoManga data={data} slug={String(slug)} />
              <RankMonth top_manga_month={rankMonth} />
            </div>
            <Comments />
          </MainLayout>
        </>
      )}
    </>
  );
};

export default DetailManga;
