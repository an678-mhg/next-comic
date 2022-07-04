import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import ComicsItem from "../components/Comics/ComicsItem";
import { IsBrowser } from "../components/IsBrowser";
import GridLayout from "../components/Layout/GridLayout";
import MainLayout from "../components/Layout/MainLayout";
import Title from "../components/Title";
import { ComicType } from "../models/comics";
import { getAllCategoriesApi, getRankApi } from "../services/rank";

interface CategoriesProps {
  data: {
    data: ComicType[];
    totalPage: number;
  };
  categories: {
    name: string;
    href: string;
  }[];
  category: string;
}

const Categories: FC<CategoriesProps> = ({ data, categories, category }) => {
  const router = useRouter();

  console.log(categories);

  return (
    <MainLayout>
      <IsBrowser>
        <div>
          <select className="border-primary-300 border p-3 text-text-color mt-4 py-2 outline-none overflow-y-auto w-full bg-primary-300">
            {categories.map((item) => (
              <option value={item.name} key={item.name}>
                <p
                  onClick={() =>
                    router.push(
                      `/the-loai?category=${item.href.replace("/", "")}`
                    )
                  }
                  className={`block py-1 ${
                    item.href.replace("/", "") === category && "text-blue-500"
                  }`}
                >
                  {item.name}
                </p>
              </option>
            ))}
          </select>
          <div className="flex-1">
            <div className="py-4">
              <Title position="end">
                {categories.find(
                  (item) => item.href.replace("/", "") === category
                )?.name || "Tất cả thể loại"}
              </Title>
            </div>
            <GridLayout>
              {data?.data?.map((item) => (
                <ComicsItem item={item} key={item.href} />
              ))}
            </GridLayout>
          </div>
        </div>
      </IsBrowser>
    </MainLayout>
  );
};

export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const category = (query?.category as string) || "all";
  const status = (query?.status as string) || "-1";
  const sort = (query?.sort as string) || "10";

  console.log(category);

  try {
    const data = await Promise.all([
      getRankApi(category, sort, status),
      getAllCategoriesApi(),
    ]);

    return {
      props: {
        data: data[0],
        categories: data[1].data,
        category,
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
