import { useRouter } from "next/router";
import React, { useMemo } from "react";
import useFireStore from "../../hooks/useFireStore";
import { Spin } from "react-cssfx-loading";
import { Comments } from "../../models/comment";
import CommentItem from "./CommentItem";

const CommentList = () => {
  const router = useRouter();

  const conditional = useMemo(
    () => ({
      fieldName: "href",
      operator: "==",
      compareValue: `/${router.query?.slug}`,
    }),
    [router.query?.slug]
  );

  const { loading, document, error } = useFireStore("comments", conditional);

  if (error) {
    return (
      <div className="mt-4 bg-primary-300 px-3 py-2 rounded-md text-center">
        <h1 className="font-semibold text-text-color">Đã xảy ra lỗi!</h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mt-4 bg-primary-300 px-3 py-2 rounded-md flex items-center justify-center">
        <Spin />
      </div>
    );
  }

  if (document?.length === 0) {
    return (
      <div className="mt-4 bg-primary-300 px-3 py-2 rounded-md flex items-center justify-center">
        <h1 className="font-semibold text-text-color">
          Không có nhận xét nào gần đây!
        </h1>
      </div>
    );
  }

  return (
    <div className="mt-4">
      {document?.map((item: Comments) => (
        <CommentItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default CommentList;
