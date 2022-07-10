import { GetStaticPropsContext, GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { FC, useCallback, useEffect, useState } from "react";
import { getReadApi } from "../../../../services/read";
import Meta from "../../../../components/Meta";
import Chapters from "../../../../components/Read/Chapters";
import ReadView from "../../../../components/Read/ReadView";
import { NewChapterType, ReadChap } from "../../../../models/comics";

interface ReadProps {
  results: ReadChap[];
  chapters: NewChapterType[];
  slug: string;
}

const Read: FC<ReadProps> = ({ results, chapters, slug }) => {
  const [showChapters, setShowChapters] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setShowChapters(false);
  }, [router.asPath]);

  const handleShowChapters = useCallback(() => {
    setShowChapters((prev) => !prev);
  }, []);

  return (
    <>
      <div className="flex">
        <Meta
          title="NextComics | Website đọc truyện tranh"
          description="Website được tạo bởi Nextjs và Reactjs"
          image="https://res.cloudinary.com/annnn/image/upload/v1657346489/290717828_1072115733435959_6212475330637442786_n_k49hf0.png"
        />

        <Chapters chapters={chapters} slug={slug} showChapters={showChapters} />
        <ReadView
          showChapters={showChapters}
          results={results}
          setShowChapters={handleShowChapters}
          chapters={chapters}
        />
      </div>
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
        revalidate: 60,
      };
    } catch (error) {
      console.log(error);
    }
  }
};

export default Read;
