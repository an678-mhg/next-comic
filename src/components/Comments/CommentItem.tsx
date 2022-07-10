import Tippy from "@tippyjs/react/headless";
import { deleteDoc, doc } from "firebase/firestore";
import React, { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../../config/firebase";
import { Comments } from "../../models/comment";
import { calculateCreatedTime } from "../../shared/constant";
import useStore from "../../zustand";
import LightBox from "../LightBox";
import ReactionEmoji from "../Reaction";
import ShowReaction from "../Reaction/ShowReaction";
import InputCmt from "./InputCmt";
import ReplyList from "./ReplyList";

interface CommentItemProps {
  item: Comments;
  comments: Comments[];
}

const CommentItem: FC<CommentItemProps> = ({ item, comments }) => {
  const { currentUser } = useStore();
  const [showLightBox, setShowLightBox] = useState(false);
  const [showReply, setShowReply] = useState(false);

  const handleClose = () => {
    setShowLightBox(false);
  };

  const handleCloseInput = () => {
    setShowReply(false);
  };

  const handleDeleteComment = (id: string) => {
    if (window.confirm("Bạn có chắc muốn xóa nhận xét này!")) {
      deleteDoc(doc(db, `/comments/${id}`));
      toast.success("Xóa nhận xét thành công!");
    }
  };

  return (
    <div className="mb-4">
      <div className="flex">
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <img src={item.avatar} alt={item.displayName} />
        </div>
        <div className="ml-3 flex-1 relative">
          {item.reactions.length > 0 && (
            <ShowReaction reactions={item.reactions} />
          )}
          <div className="bg-[#3a3b3c] rounded-lg px-3 py-1">
            <div className="flex items-center">
              <p className="text-text-color font-semibold">
                {item.displayName}
              </p>
              <p className="ml-2 text-xs text-gray-500">
                {calculateCreatedTime(Number(item.createdAt))}
              </p>
            </div>
            {item.image && (
              <div
                onClick={() => setShowLightBox(true)}
                className="w-[150px] aspect-auto rounded-md my-2 overflow-hidden cursor-pointer"
              >
                <img src={item.image} />
              </div>
            )}
            <p className="text-text-color mt-2 text-sm leading-loose">
              {item.responseTo && (
                <span className="text-blue-500 mr-1">
                  {comments.find((p) => p.id === item.responseTo)?.displayName}
                </span>
              )}
              {item.content}
            </p>
          </div>
          <div className="ml-2 flex items-center mt-2">
            {currentUser && (
              <>
                <Tippy
                  interactive
                  placement="top-start"
                  render={(attr) => <ReactionEmoji comment={item} {...attr} />}
                >
                  <button
                    className={`mr-3 text-text-color mt-1 text-xs capitalize ${
                      item.reactions.find(
                        (item) => item?.userId === currentUser.uid
                      )?.name === "like"
                        ? "text-blue-500"
                        : item.reactions.find(
                            (item) => item?.userId === currentUser.uid
                          )?.name === "love"
                        ? "text-pink-500"
                        : "text-yellow-500"
                    }`}
                  >
                    {item.reactions.find(
                      (item) => item?.userId === currentUser.uid
                    )?.name || <span className="text-text-color">Thích</span>}
                  </button>
                </Tippy>
                <button
                  onClick={() => setShowReply(!showReply)}
                  className="mr-3 text-text-color mt-1 text-xs"
                >
                  {showReply ? "Hủy" : "Phản hồi"}
                </button>
                {currentUser?.uid === item.uid && (
                  <button
                    onClick={() => handleDeleteComment(item.id)}
                    className="mr-3 text-text-color mt-1 text-xs"
                  >
                    Xóa
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {showReply && (
        <div>
          <InputCmt
            placehoder={`Trả lời ${item.displayName}....`}
            handleClose={handleCloseInput}
            comment={item}
          />
        </div>
      )}

      <ReplyList parentId={item.id} comments={comments} />

      {showLightBox && <LightBox src={item.image} handleClose={handleClose} />}
    </div>
  );
};

export default CommentItem;
