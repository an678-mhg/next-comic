import type { GetServerSideProps } from "next";
import { FC, Key } from "react";
import { getHomeApi } from "../api/home";
import ComicsItem from "../components/Comics/ComicsItem";
import Title from "../components/Title";
import GridLayout from "../layout/GridLayout";
import MainLayout from "../layout/MainLayout";
import { ComicType } from "../models/comics";

interface HomeProps {
  data: ComicType[];
  totalPage: Number;
}

const Home: FC<HomeProps> = ({ data, totalPage }) => {
  return (
    <MainLayout>
      <div className="pt-4">
        <Title>Truyện mới cập nhật</Title>
      </div>

      <div className="grid lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4 mt-4">
        {data?.map((item) => (
          <ComicsItem key={item.href as Key} item={item} />
        ))}
      </div>
    </MainLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const page = query.page || 1;

  try {
    const data = await getHomeApi(Number(page));
    let totalPage: Number = data.totalPage;

    return {
      props: {
        data: data.truyen_moi_cap_nhat,
        totalPage,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default Home;
