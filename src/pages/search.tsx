import React, { FC } from "react";
import type { GetServerSidePropsContext } from "next";
import searchApi from "../services/search";
import { ComicType } from "../models/comics";
import Meta from "../components/Meta";
import MainLayout from "../components/Layout/MainLayout";
import Title from "../components/Title";
import GridLayout from "../components/Layout/GridLayout";
import ComicsItem from "../components/Comics/ComicsItem";
import PaginationCustomer from "../components/Pagination";

interface SearchProps {
  data: {
    data: ComicType[];
    totalPage: number;
  };
  keyword: string;
}

const Search: FC<SearchProps> = ({ data, keyword }) => {
  return (
    <>
      <Meta
        title={`Search | ${keyword}`}
        description="Website được tạo bởi Nextjs và Reactjs"
        image="https://res.cloudinary.com/annnn/image/upload/v1657346489/290717828_1072115733435959_6212475330637442786_n_k49hf0.png"
      />
      <MainLayout>
        <div className="pt-4">
          <Title>Kết quả cho: {keyword}</Title>

          <div className="mt-4">
            <GridLayout>
              {data?.data?.map((item) => (
                <ComicsItem key={item.href} item={item} />
              ))}
            </GridLayout>
          </div>

          <PaginationCustomer totalPage={data.totalPage} />
        </div>
      </MainLayout>
    </>
  );
};

export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const keyword = query.keyword as string;
  const page = query.page || 1;

  try {
    const data = await searchApi.getSearchKeyWord(keyword, Number(page));

    return {
      props: { data: data, keyword },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default Search;
