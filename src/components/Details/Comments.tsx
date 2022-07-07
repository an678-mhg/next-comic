import React from "react";
import { MdComment } from "react-icons/md";
import useStore from "../../zustand";
import CommentList from "../Comments/CommentList";
import InputCmt from "../Comments/InputCmt";
import NoUser from "../Comments/NoUser";
import Title from "../Title";

const Comments = () => {
  const { currentUser } = useStore();

  return (
    <div>
      <div className="mt-4">
        <Title
          position="start"
          icons={<MdComment className="w-6 h-6 text-blue-500 mr-2" />}
        >
          Nhận xét
        </Title>
      </div>

      <div>{currentUser ? <InputCmt /> : <NoUser />}</div>

      <CommentList />
    </div>
  );
};

export default Comments;
