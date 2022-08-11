import React, { useEffect, useMemo, useState } from "react";
import MainLayout from "../components/Layout/MainLayout";
import Title from "../components/Title";
import { AiOutlineHistory } from "react-icons/ai";
import { FiTrash2 } from "react-icons/fi";
import GridLayout from "../components/Layout/GridLayout";
import { getHistoryComic } from "../shared/saveHistory";
import ComicsItem from "../components/Comics/ComicsItem";
import { ComicType } from "../models/comics";
import Meta from "../components/Meta";

const History = () => {
  const [history, setHistory] = useState<ComicType[]>([]);

  useEffect(() => {
    const comic = getHistoryComic();
    setHistory(comic);
  }, []);

  const deleteHistory = () => {
    if (history.length === 0) return;
    if (window.confirm("Bạn muốn xóa toàn bộ lịch sử đã xem!")) {
      localStorage.setItem("history-next-comic", JSON.stringify([]));
      setHistory([]);
    }
  };

  return (
    <MainLayout>
      <Meta
        title="History"
        description="Website được tạo bởi Nextjs và Reactjs"
        image="https://res.cloudinary.com/annnn/image/upload/v1657346489/290717828_1072115733435959_6212475330637442786_n_k49hf0.png"
      />
      <div className="pt-4 container">
        <div className="flex items-center justify-between">
          <Title
            icons={<AiOutlineHistory className="w-6 h-6 text-blue-500 ml-2" />}
          >
            Lịch sử
          </Title>

          <button onClick={deleteHistory}>
            <FiTrash2 className="w-6 h-6 text-blue-500" />
          </button>
        </div>

        {history.length > 0 ? (
          <div className="mt-4">
            <GridLayout>
              {history.map((item) => (
                <ComicsItem key={item.href} item={item} />
              ))}
            </GridLayout>
          </div>
        ) : (
          <div className="flex items-center justify-center mt-4 h-full">
            <h1 className="font-semibold text-text-color text-xl">
              Chưa có lịch sử xem
            </h1>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default History;
