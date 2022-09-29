import React, { useState } from "react";
import MainLayout from "../components/Layout/MainLayout";
import ProtectedLayout from "../components/Layout/ProtectedLayout";
import Title from "../components/Title";
import FollowingStore from "../zustand/following";
import { RiUserFollowLine } from "react-icons/ri";
import GridLayout from "../components/Layout/GridLayout";
import ComicsItem from "../components/Comics/ComicsItem";
import Meta from "../components/Meta";
import { FaEdit } from "react-icons/fa";
import { FiTrash2 } from "react-icons/fi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { ComicType } from "../models/comics";
import { deleteFollowingApi } from "../shared/firebase";
import { AiOutlineClear } from "react-icons/ai";

const Following = () => {
  const { following, deleteFollow } = FollowingStore();

  console.log(following);

  const [check, setCheck] = useState<ComicType[]>([]);

  const [showEdit, setShowEdit] = useState(false);

  const handleSelect = (comic: ComicType) => {
    if (check.find((item) => item?.id === comic?.id)) {
      return setCheck(check.filter((item) => item?.id !== comic?.id));
    }
    return setCheck((prev) => [...prev, comic]);
  };

  const handleDeleteFollowing = (e: any) => {
    e.stopPropagation();

    if (check.length === 0) {
      return;
    }

    if (!window.confirm("Bạn có chắc muốn xóa!")) {
      return;
    }

    check.forEach((item) => {
      if (item?.id) {
        deleteFollowingApi(item?.id);
      }
      deleteFollow(item);
    });

    setShowEdit(false);
  };

  return (
    <ProtectedLayout>
      <MainLayout>
        <Meta
          title="Following"
          description="Website được tạo bởi Nextjs và Reactjs"
          image="https://res.cloudinary.com/annnn/image/upload/v1657346489/290717828_1072115733435959_6212475330637442786_n_k49hf0.png"
        />
        <div className="container">
          <div className="pt-4 flex items-center justify-between">
            <Title
              icons={
                <RiUserFollowLine className="w-6 h-6 text-blue-500 ml-2" />
              }
            >
              Truyện đã theo dõi
            </Title>

            <button
              onClick={() => setShowEdit(!showEdit)}
              className="flex items-center"
            >
              {showEdit ? (
                <>
                  <FiTrash2
                    onClick={handleDeleteFollowing}
                    className="w-6 h-6 text-blue-500 mr-3"
                  />
                  <AiOutlineClear
                    className="w-6 h-6 text-blue-500 mr-3"
                    onClick={(e) => {
                      e.stopPropagation();
                      setCheck([]);
                    }}
                  />
                  <AiOutlineCloseCircle className="w-6 h-6 text-blue-500" />
                </>
              ) : (
                <>
                  <FaEdit className="w-6 h-6 text-blue-500" />
                </>
              )}
            </button>
          </div>

          {following.length > 0 ? (
            <div className="mt-4">
              <GridLayout>
                {following.map((item) => (
                  <ComicsItem
                    handleSelect={handleSelect}
                    check={check}
                    key={item.href}
                    item={item}
                    showEdit={showEdit}
                  />
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
