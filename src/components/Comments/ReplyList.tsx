import React, { FC } from "react";
import { Comments } from "../../models/comment";
import CommentItem from "./CommentItem";

interface ReplyListProps {
  comments: Comments[];
  parentId: string;
}

const ReplyList: FC<ReplyListProps> = ({ comments, parentId }) => {
  return (
    <div className="ml-3 mt-4">
      {comments.map((item) => {
        if (item.responseTo === parentId) {
          return <CommentItem comments={comments} key={item.id} item={item} />;
        }
        return null;
      })}
    </div>
  );
};

export default ReplyList;
