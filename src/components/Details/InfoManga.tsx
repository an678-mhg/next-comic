import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import { Details } from "../../models/details";
import SocialShare from "../SocialShare";
import Title from "../Title";
import FullChapters from "./FullChapters";
import { DocumentTextIcon } from "@heroicons/react/outline";
import FollowingStore from "../../zustand/following";
import { addDoc, collection } from "firebase/firestore";
import useStore from "../../zustand";
import { useRouter } from "next/router";
import { db } from "../../config/firebase";
import { toast } from "react-toastify";
import { CircularProgress } from "react-cssfx-loading";

interface PropsType {
  data: Details;
  slug: string;
}

const InfoManga: FC<PropsType> = ({ data, slug }) => {
  const { currentUser } = useStore();
  const { following, loading, addFollow } = FollowingStore();
  const [follow, setFollow] = useState(false);
  const [loadingFollow, setLoadingFollow] = useState(false);

  const router = useRouter();

  const handleFollowComic = async (comic: any) => {
    if (!currentUser)
      return router.push(
        `/sign-in?redirect=${encodeURIComponent(router.asPath)}`
      );

    if (following.some((item) => item.href === `/${slug}`)) {
      return toast.warn("Bạn đã theo dõi truyện này trước đó rồi!");
    }

    setLoadingFollow(true);

    const newFollowing = {
      uid: currentUser.uid,
      ...comic,
    };

    const res = await addDoc(collection(db, "following"), newFollowing);

    addFollow({ ...newFollowing, id: res.id });
    setLoadingFollow(false);
  };

  useEffect(() => {
    setFollow(following.some((item) => item.href === `/${slug}`));
  }, [following, slug]);

  return (
    <div className="pt-4 flex-1 text-text-color">
      <div>
        <div className="mb-5 text-center">
          <h1 className="uppercase font-bold text-xl text-text-color">
            {data.name}
          </h1>
          <p className="font-semibold text-gray-500">{data.updatedAt}</p>
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="flex justify-center lg:mb-0 mb-4">
            <div className="w-[190px] rounded-sm">
              <img src={data.img} alt={data.name} />
            </div>
          </div>
          <div className="flex-1 lg:ml-10 ml-0">
            <div className="flex items-center justify-between">
              <SocialShare title={slug} />
              <button
                disabled={loading}
                onClick={() =>
                  handleFollowComic({
                    href: `/${slug}`,
                    name: data.name,
                    img: data.img,
                  })
                }
                className={`${
                  follow ? "bg-yellow-500" : "bg-blue-500"
                } px-3 py-1 text-sm text-text-color rounded-md font-semibold`}
              >
                {loadingFollow ? (
                  <>
                    <CircularProgress color="#fff" width="20px" height="20px" />
                  </>
                ) : follow ? (
                  "Đã theo dõi"
                ) : (
                  "Theo dõi"
                )}
              </button>
            </div>
            <ul>
              <li className="flex text-lg font-semibold my-2">
                <p className="w-[100px]">Tác giả:</p>
                <p className="ml-4 flex-1">{data.author || "Đang cập nhật"}</p>
              </li>
              <li className="flex text-lg font-semibold my-2">
                <p className="w-[100px]">Trạng thái:</p>
                <p className="ml-4 flex-1">{data.status}</p>
              </li>
              <li className="flex text-lg font-semibold my-2">
                <p className="w-[100px]">Thể loại:</p>
                <p className="ml-4 flex flex-wrap flex-1">
                  {data.categories.map((p) => (
                    <button
                      className="mb-3 mr-3 text-text-color px-2 text-sm py-1 rounded-md bg-blue-500"
                      key={p.category}
                    >
                      {p.category}
                    </button>
                  ))}
                </p>
              </li>
            </ul>
            <div className="flex items-center mt-4">
              <button className="bg-green-500 px-3 py-1 text-sm text-text-color rounded-md">
                <Link
                  href={`/read${data.chapters[data.chapters.length - 1].href}`}
                >
                  <a className="font-semibold">Đọc từ đầu</a>
                </Link>
              </button>
              <button className="bg-green-500 px-3 py-1 text-sm text-text-color rounded-md ml-5">
                <Link href={`/read${data.chapters[0].href}`}>
                  <a className="font-semibold">Chap mới nhất</a>
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <Title
          icons={<DocumentTextIcon className="w-6 h-6 text-blue-500 mr-1" />}
          position="start"
        >
          Nội dung
        </Title>
        <p className="font-semibold mt-4">{data.content}</p>
      </div>

      <FullChapters chapters={data.chapters} />
    </div>
  );
};

export default InfoManga;
