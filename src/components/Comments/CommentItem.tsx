import React, { FC, useState } from "react";
import { Comments } from "../../models/comment";
// import { calculateCreatedTime } from "../../shared/constant";
import useStore from "../../zustand";
import LightBox from "../LightBox";

interface CommentItemProps {
  item: Comments;
}

const CommentItem: FC<CommentItemProps> = ({ item }) => {
  const { currentUser } = useStore();
  const [showLightBox, setShowLightBox] = useState(false);

  const handleClose = () => {
    setShowLightBox(false);
  };

  return (
    <div className="mb-4">
      <div className="flex">
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <img src={item.avatar} alt={item.displayName} />
        </div>
        <div className="ml-3">
          <div className="bg-primary-300 rounded-lg px-3 py-2">
            <p className="text-text-color font-semibold">{item.displayName}</p>
            {item.image && (
              <div
                onClick={() => setShowLightBox(true)}
                className="w-[100px] aspect-auto rounded-md my-2 overflow-hidden"
              >
                <img src={item.image} />
              </div>
            )}
            <p className="text-text-color mt-3">{item.content}</p>
          </div>
          <div className="ml-1">
            {currentUser && (
              <>
                <button className="mr-3 text-text-color mt-1 text-xs">
                  Thích
                </button>
                <button className="mr-3 text-text-color mt-1 text-xs">
                  Phản hồi
                </button>
              </>
            )}
            {/* <p className="mr-3 text-text-color mt-1 text-xs">
              {calculateCreatedTime(Number(item.createdAt))}
            </p> */}
          </div>
        </div>
      </div>

      {showLightBox && <LightBox src={item.image} handleClose={handleClose} />}
    </div>
  );
};

export default CommentItem;
