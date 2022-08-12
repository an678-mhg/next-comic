import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getFullChapterApi, getReadApi } from "../../../../services/read";
import Meta from "../../../../components/Meta";
import Chapters from "../../../../components/Read/Chapters";
import ReadView from "../../../../components/Read/ReadView";
import useSWR from "swr";
import Error from "../../../../components/Error";

const Read = () => {
  const [showChapters, setShowChapters] = useState(false);
  const router = useRouter();
  const { slug, chap, id } = router.query;

  useEffect(() => {
    setShowChapters(false);
  }, [router.asPath]);

  const handleShowChapters = () => {
    setShowChapters((prev) => !prev);
  };

  const { data, error } = useSWR(`read-${slug}-${chap}-${id}`, () => {
    if (slug && id && chap) {
      return getReadApi(String(slug), String(chap), String(id));
    }
  });

  const { data: chapters, error: errChapters } = useSWR(`read-${slug}`, () => {
    if (slug) {
      return getFullChapterApi(String(slug));
    }
  });

  if (error || errChapters) {
    return <Error />;
  }

  return (
    <>
      <Meta
        title="NextComics | Website đọc truyện tranh"
        description="Website được tạo bởi Nextjs và Reactjs"
        image="https://res.cloudinary.com/annnn/image/upload/v1657346489/290717828_1072115733435959_6212475330637442786_n_k49hf0.png"
      />

      <div className="flex">
        <Chapters
          chapters={chapters?.chapters!}
          slug={"/" + slug + "/" + chap + "/" + id}
          showChapters={showChapters}
        />
        <ReadView
          showChapters={showChapters}
          results={data?.results!}
          setShowChapters={handleShowChapters}
          chapters={chapters?.chapters!}
        />
      </div>
    </>
  );
};

export default Read;
