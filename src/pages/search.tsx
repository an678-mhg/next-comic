import React, { useEffect, useState } from "react";
import Meta from "../components/Meta";
import MainLayout from "../components/Layout/MainLayout";
import Title from "../components/Title";
import GridLayout from "../components/Layout/GridLayout";
import ComicsItem from "../components/Comics/ComicsItem";
import PaginationCustomer from "../components/Pagination";
import { useRouter } from "next/router";
import { ComicType } from "../models/comics";
import searchApi from "../services/search";
import Skeleton from "../components/Skeleton";

const Search = () => {
  const { query } = useRouter();
  const [search, setSearch] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await searchApi.getSearchKeyWord(
          query?.keyword as string,
          Number(query?.page)
        );
        setSearch(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    })();
  }, [query?.keyword, query?.page]);

  return (
    <>
      <Meta
        title={`Search`}
        description="Website được tạo bởi Nextjs và Reactjs"
        image="https://res.cloudinary.com/annnn/image/upload/v1657346489/290717828_1072115733435959_6212475330637442786_n_k49hf0.png"
      />
      <MainLayout>
        <div className="pt-4">
          <Title>Kết quả cho: {query?.keyword}</Title>

          <div className="mt-4">
            {!loading ? (
              search?.data?.length > 0 ? (
                <GridLayout>
                  {search?.data?.map((item: ComicType) => (
                    <ComicsItem item={item} key={item.href} />
                  ))}
                </GridLayout>
              ) : (
                <h1 className="text-text-color text-center font-semibold text-xl mt-4">
                  Không tìm thấy kết quả nào!
                </h1>
              )
            ) : (
              <Skeleton element={12} />
            )}
          </div>

          {search?.totalPage > 1 && (
            <PaginationCustomer totalPage={search.totalPage} />
          )}
        </div>
      </MainLayout>
    </>
  );
};

export default Search;
