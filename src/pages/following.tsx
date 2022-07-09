import React from "react";
import MainLayout from "../components/Layout/MainLayout";
import ProtectedLayout from "../components/Layout/ProtectedLayout";
import Title from "../components/Title";
import FollowingStore from "../zustand/following";
import { RiUserFollowLine } from "react-icons/ri";
import GridLayout from "../components/Layout/GridLayout";
import ComicsItem from "../components/Comics/ComicsItem";
import Meta from "../components/Meta";

const Following = () => {
  const { following } = FollowingStore();

  return (
    <ProtectedLayout>
      <MainLayout>
        <Meta
          title="Following"
          description="Website được tạo bởi Nextjs và Reactjs"
          image="https://res.cloudinary.com/annnn/image/upload/v1657346489/290717828_1072115733435959_6212475330637442786_n_k49hf0.png"
        />
        <div>
          <div className="pt-4">
            <Title
              icons={
                <RiUserFollowLine className="w-6 h-6 text-blue-500 ml-2" />
              }
            >
              Truyện đã theo dõi
            </Title>
          </div>

          {following.length > 0 ? (
            <div className="mt-4">
              <GridLayout>
                {following.map((item) => (
                  <ComicsItem key={item.href} item={item} />
                ))}
              </GridLayout>
            </div>
          ) : (
            <div className="flex items-center justify-center mt-4">
              <h1 className="font-semibold text-xl text-text-color">
                Bạn chưa theo dõi truyện nào
              </h1>
            </div>
          )}
        </div>
      </MainLayout>
    </ProtectedLayout>
  );
};

export default Following;
