import React from "react";
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
import useSWR from "swr";
import Error from "../components/Error";

const Search = () => {
  const { query } = useRouter();

  const { data: search, error } = useSWR(
    `search-${query?.keyword}-${query?.page}`,
    () =>
      searchApi.getSearchKeyWord(query?.keyword as string, Number(query?.page))
  );

  if (error) {
    return <Error />;
  }

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
            {search ? (
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
