import { Pagination } from "antd";
import React, { FC, useEffect, useState } from "react";
import useSWR from "swr";
import ComicsItem from "../components/Comics/ComicsItem";
import Error from "../components/Error";
import GridLayout from "../components/Layout/GridLayout";
import MainLayout from "../components/Layout/MainLayout";
import Meta from "../components/Meta";
import SelectGeners from "../components/Selects/SelectGeners";
import SelectOne from "../components/Selects/SelectOne";
import Skeleton from "../components/Skeleton";
import { ComicType } from "../models/comics";
import { Filter } from "../models/search";
import searchApi from "../services/search";

interface CategoriesProps {
  data: Filter;
}

const Categories: FC<CategoriesProps> = ({ data }) => {
  const [query, setQuery] = useState<{
    gender: number;
    genres: number[];
    min_chapters: number;
    sort: number;
    status: number;
    page: number;
  }>({
    gender: -1,
    genres: [],
    min_chapters: 1,
    sort: 0,
    status: -1,
    page: 1,
  });

  const setGenres = (value: number[]) => {
    setQuery({ ...query, genres: [...value] });
  };

  const setMinChapters = (value: number) => {
    setQuery({ ...query, min_chapters: value });
  };

  const setGender = (value: number) => {
    setQuery({ ...query, gender: value });
  };

  const setSort = (value: number) => {
    setQuery({ ...query, sort: value });
  };

  const setStatus = (value: number) => {
    setQuery({ ...query, status: value });
  };

  const setPage = (value: number) => {
    setQuery({ ...query, page: value });
  };

  const { data: results, error } = useSWR(
    `filter-${query.gender}-${query.genres}-${query.min_chapters}-${query.page}-${query.sort}-${query.status}`,
    () =>
      searchApi.getSearchAdvanced(
        query.gender,
        query.genres,
        query.min_chapters,
        query.sort,
        query.status,
        query.page
      )
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [query.page]);

  if (error) {
    return <Error />;
  }

  return (
    <>
      <MainLayout>
        <Meta
          title="Filter"
          description="Website được tạo bởi Nextjs và Reactjs"
          image="https://res.cloudinary.com/annnn/image/upload/v1657346489/290717828_1072115733435959_6212475330637442786_n_k49hf0.png"
        />
        <div>
          <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 pt-4">
            <SelectGeners
              selected={query.genres}
              setSelected={setGenres}
              options={data.genres}
            />
            <SelectOne
              options={data.min_chapters}
              selected={query.min_chapters}
              setSelected={setMinChapters}
              placehoder="Số lượng chapters"
            />
            <SelectOne
              options={data.gender}
              selected={query.gender}
              setSelected={setGender}
              placehoder="Dành cho"
            />
            <SelectOne
              options={data.sort}
              selected={query.sort}
              setSelected={setSort}
              placehoder="Sắp xêps theo"
            />
            <SelectOne
              options={data.status}
              selected={query.status}
              setSelected={setStatus}
              placehoder="Trạng thái"
            />
          </div>
        </div>

        <div className="mt-4">
          {results ? (
            results?.data?.length > 0 ? (
              <GridLayout>
                {results?.data?.map((item: ComicType) => (
                  <ComicsItem key={item.href} item={item} />
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

        {results?.totalPage > 1 && (
          <div className="mt-4">
            <Pagination
              onChange={(page) => setPage(page)}
              current={query.page || 1}
              defaultCurrent={1}
              total={results?.totalPage * 10}
            />
          </div>
        )}
      </MainLayout>
    </>
  );
};

export const getStaticProps = async () => {
  try {
    const data = await searchApi.getFullFilterApi();
    return {
      props: {
        data: data,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

export default Categories;
