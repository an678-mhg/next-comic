import { GetStaticProps, GetStaticPaths, GetStaticPropsContext } from "next";
import React, { FC } from "react";
import { getReadApi } from "../../../../api/read";
import Chapters from "../../../../components/Read/Chapters";
import ReadView from "../../../../components/Read/ReadView";
import { NewChapterType, ReadChap } from "../../../../models/comics";

interface ReadProps {
  results: ReadChap[];
  chapters: NewChapterType[];
  slug: string;
}

const Read: FC<ReadProps> = ({ results, chapters, slug }) => {
  return (
    <div className="flex pt-[48px]">
      <Chapters chapters={chapters} slug={slug} />
      <ReadView results={results} />
    </div>
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
  const chap = params?.chap as string;
  const id = params?.id as string;

  if (slug && chap && id) {
    try {
      const data = await getReadApi(slug, chap, id);

      return {
        props: {
          results: data.results,
          chapters: data.chapters,
          slug: "/" + slug + "/" + chap + "/" + id,
        },
        revalidate: 3600,
      };
    } catch (error) {
      console.log(error);

      return {
        notFound: true,
      };
    }
  }
};

export default Read;
