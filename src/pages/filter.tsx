import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import ComicsItem from "../components/Comics/ComicsItem";
import GridLayout from "../components/Layout/GridLayout";
import MainLayout from "../components/Layout/MainLayout";
import Meta from "../components/Meta";
import PaginationCustomer from "../components/Pagination";
import SelectGeners from "../components/Selects/SelectGeners";
import SelectOne from "../components/Selects/SelectOne";
import { ComicType } from "../models/comics";
import { Filter } from "../models/search";
import searchApi from "../services/search";

interface CategoriesProps {
  data: Filter;
  results: {
    data: ComicType[];
    totalPage: number;
  };
}

const Categories: FC<CategoriesProps> = ({ data, results }) => {
  const [query, setQuery] = useState<{
    gender: number;
    genres: number[];
    min_chapters: number;
    sort: number;
    status: number;
  }>({
    gender: -1,
    genres: [],
    min_chapters: 1,
    sort: 0,
    status: -1,
  });

  const router = useRouter();

  const [showFilter, setShowFilter] = useState(true);

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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    router.push(
      `?genres=${query.genres}&gender=${query.gender}&status=${query.status}&minchapter=${query.min_chapters}&sort=${query.sort}`
    );
  };

  useEffect(() => {
    setShowFilter(false);
  }, [router.asPath]);

  return (
    <>
      <MainLayout>
        <Meta
          title="Filter"
          description="Website được tạo bởi Nextjs và Reactjs"
          image="https://res.cloudinary.com/annnn/image/upload/v1657346489/290717828_1072115733435959_6212475330637442786_n_k49hf0.png"
        />
        <form onSubmit={handleSubmit}>
          {showFilter && (
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
          )}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => setShowFilter(!showFilter)}
              type="button"
              className="py-2 px-3 w-full bg-blue-500 mt-4 font-semibold text-text-color rounded-sm"
            >
              {showFilter ? "Ẩn bộ lọc" : "Hiện bộ lọc"}
            </button>
            <button className="py-2 px-3 w-full bg-blue-500 mt-4 font-semibold text-text-color rounded-sm">
              Áp dụng tìm kiếm
            </button>
          </div>
        </form>

        <div className="mt-4">
          <GridLayout>
            {results.data.map((item) => (
              <ComicsItem key={item.href} item={item} />
            ))}
          </GridLayout>
        </div>

        <PaginationCustomer totalPage={results.totalPage} />
      </MainLayout>
    </>
  );
};

export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const gender = Number(query?.gender) || -1;
  const genres = (query?.genres as string) || "";
  const min_chapters = Number(query?.minchapter) || 1;
  const sort = Number(query?.sort) || 0;
  const status = Number(query.status) || -1;
  const page = Number(query?.page) || 1;

  try {
    const data = await Promise.all([
      searchApi.getFullFilterApi(),
      searchApi.getSearchAdvanced(
        gender,
        genres,
        min_chapters,
        sort,
        status,
        page
      ),
    ]);

    return {
      props: {
        data: data[0],
        results: data[1],
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
