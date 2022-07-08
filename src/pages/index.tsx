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
  console.log(process.env.NEXT_PUBLIC_UPLOAD_KEY);
  return (
    <>
      <IsBrowser>
        <MainLayout>
          <Meta />
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
        </MainLayout>
      </IsBrowser>
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
