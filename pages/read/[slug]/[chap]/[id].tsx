import { GetStaticPaths, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
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

  return (
    <div className="flex pt-[48px]">
      <Meta
        title="NextComics | Website đọc truyện tranh"
        image="https://scontent.fvca1-1.fna.fbcdn.net/v/t1.15752-9/285483973_516979343537680_6946433712113895448_n.png?_nc_cat=105&ccb=1-7&_nc_sid=ae9488&_nc_ohc=lWfyjqf8fTMAX_JpV1b&_nc_ht=scontent.fvca1-1.fna&oh=03_AVICHdZxE1ElTuWM2wUgPEMyrGuAfdAoW6AzqaL7NJvhVw&oe=62E678E8"
        description="Website được tạo bởi Nextjs và Reactjs"
      />

      <Chapters chapters={chapters} slug={slug} showChapters={showChapters} />
      <ReadView
        showChapters={showChapters}
        results={results}
        setShowChapters={setShowChapters}
      />
    </div>
  );
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

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default Read;
