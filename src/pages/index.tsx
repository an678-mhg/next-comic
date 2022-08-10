import getHomeApi from "../services/home";
import SlideViews from "../components/Comics/SlideViews";
import Meta from "../components/Meta";
import Title from "../components/Title";
import MainLayout from "../components/Layout/MainLayout";
import { ChevronRightIcon } from "@heroicons/react/solid";
import useSWR from "swr";
import Error from "../components/Error";

const Home = () => {
  const { data, error } = useSWR("home", getHomeApi);

  if (error) {
    return <Error />;
  }

  return (
    <>
      <MainLayout>
        <Meta
          title="NextComics | Website đọc truyện tranh"
          description="Website được tạo bởi Nextjs và Reactjs"
          image="https://res.cloudinary.com/annnn/image/upload/v1657346489/290717828_1072115733435959_6212475330637442786_n_k49hf0.png"
        />
        <div>
          {!data ? (
            <h1>Loading....</h1>
          ) : (
            Object.keys(data).map((item) => (
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
            ))
          )}
        </div>
      </MainLayout>
    </>
  );
};

export default Home;
