import { GetStaticProps, GetStaticPaths } from "next";
import Link from "next/link";
import React, { FC } from "react";
import { getReadApi } from "../../../../api/read";
import { NewChapterType, ReadChap } from "../../../../models/comics";

interface ReadProps {
  results: ReadChap[];
  chapters: NewChapterType[];
  slug: string;
}

const Read: FC<ReadProps> = ({ results, chapters, slug }) => {
  return (
    <div className="flex">
      <div className="w-[30%] h-screen bg-primary-100 overflow-y-scroll">
        <Link href="/">
          <a className="text-white p-3 text-center block"> Về trang chủ</a>
        </Link>

        <ul className="p-5">
          {chapters.map((item) => (
            <li
              key={item.href}
              className={`w-full p-2 rounded-md ${
                slug === item.href ? "bg-[#2374E1]" : "bg-primary-300"
              } mb-4`}
            >
              <Link href={`/read${item.href}`}>
                <a className="text-text-color flex items-center">
                  <p className="text-sm line-clamp-1">{item.name}</p>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 h-screen overflow-y-scroll">
        {results.map((item) => (
          <div className="w-[50%] mx-auto max-w-full" key={item.alt}>
            <img src={item.img} alt={item.alt} />
          </div>
        ))}
      </div>
    </div>
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
