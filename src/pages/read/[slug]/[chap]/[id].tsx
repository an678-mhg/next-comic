import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { getReadApi } from "../../../../services/read";
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

  const { data, error } = useSWR(`read-${slug}-${chap}-${id}`, () =>
    getReadApi(String(slug), String(chap), String(id))
  );

  if (error) {
    return <Error />;
  }

  return (
    <>
      {data && (
        <div className="flex">
          <Meta
            title="NextComics | Website đọc truyện tranh"
            description="Website được tạo bởi Nextjs và Reactjs"
            image="https://res.cloudinary.com/annnn/image/upload/v1657346489/290717828_1072115733435959_6212475330637442786_n_k49hf0.png"
          />
          <Chapters
            chapters={data?.chapters}
            slug={"/" + slug + "/" + chap + "/" + id}
            showChapters={showChapters}
          />
          <ReadView
            showChapters={showChapters}
            results={data?.results}
            setShowChapters={handleShowChapters}
            chapters={data?.chapters}
          />
        </div>
      )}
    </>
  );
};

export default Read;
