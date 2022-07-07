import React, { FC } from "react";
import { Comments } from "../../models/comment";

interface CommentItemProps {
  item: Comments;
}

const CommentItem: FC<CommentItemProps> = ({ item }) => {
  return (
    <div className="mb-4 flex items-center">
      <div className="w-8 h-8 rounded-full overflow-hidden">
        <img src={item.avatar} alt={item.displayName} />
      </div>
      <div className="bg-primary-300 rounded-lg px-3 py-2 ml-3">
        <p className="text-text-color font-semibold">{item.displayName}</p>
        {item.image && (
          <div className="w-[100px] aspect-auto rounded-md my-2 overflow-hidden">
            <img src={item.image} />
          </div>
        )}
        <p className="text-text-color">{item.content}</p>
      </div>
    </div>
  );
};

export default CommentItem;
