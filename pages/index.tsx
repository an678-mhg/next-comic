import type { GetServerSideProps } from "next";
import { FC, Key } from "react";
import { getHomeApi } from "../api/home";
import ComicsItem from "../components/Comics/ComicsItem";
import { IsBrowser } from "../components/IsBrowser";
import Meta from "../components/Meta";
import Title from "../components/Title";
import MainLayout from "../layout/MainLayout";
import { ComicType } from "../models/comics";

interface HomeProps {
  data: ComicType[];
  totalPage: Number;
}

const Home: FC<HomeProps> = ({ data }) => {
  return (
    <>
      <Meta
        title="NextComics | Website đọc truyện tranh"
        image="https://scontent.fvca1-1.fna.fbcdn.net/v/t1.15752-9/285483973_516979343537680_6946433712113895448_n.png?_nc_cat=105&ccb=1-7&_nc_sid=ae9488&_nc_ohc=lWfyjqf8fTMAX_JpV1b&_nc_ht=scontent.fvca1-1.fna&oh=03_AVICHdZxE1ElTuWM2wUgPEMyrGuAfdAoW6AzqaL7NJvhVw&oe=62E678E8"
        description="Website được tạo bởi Nextjs và Reactjs"
      />

      <MainLayout>
        <IsBrowser>
          <div className="pt-4">
            <Title>Truyện mới cập nhật</Title>
          </div>

          <div className="mt-4 grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
            {data?.map((item) => (
              <ComicsItem key={item.href as Key} item={item} />
            ))}
          </div>
        </IsBrowser>
      </MainLayout>
    </>
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
