import type { GetStaticProps } from "next";
import { FC } from "react";
import getHomeApi from "../services/home";
import SlideViews from "../components/Comics/SlideViews";
import { IsBrowser } from "../components/IsBrowser";
import Meta from "../components/Meta";
import Title from "../components/Title";
import MainLayout from "../components/Layout/MainLayout";
import { ComicType } from "../models/comics";
import { ChevronRightIcon } from "@heroicons/react/solid";

interface HomeProps {
  data: {
    [key: string]: ComicType[];
  };
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
          <div>
            {Object.keys(data).map((item) => (
              <div key={item}>
                <div className="py-4">
                  <Title
                    position="end"
                    icons={
                      <ChevronRightIcon className="w-6 h-6 ml-1 text-blue-500" />
                    }
                  >
                    {item}
                  </Title>
                </div>
                <SlideViews data={data[item]} />
              </div>
            ))}
          </div>
        </IsBrowser>
      </MainLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const data = await getHomeApi();

    return {
      props: {
        data,
      },
      revalidate: 60,
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

export default Home;
