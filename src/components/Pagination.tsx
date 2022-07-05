import React, { FC } from "react";
import type { PaginationProps } from "antd";
import { Pagination } from "antd";
import { useRouter } from "next/router";

const PaginationCustomer: FC<{ totalPage: number }> = ({ totalPage }) => {
  const router = useRouter();

  const onChange: PaginationProps["onChange"] = (pageNumber) => {
    router.push({
      query: {
        ...router.query,
        page: pageNumber,
      },
    });
  };

  return (
    <div className="mt-4">
      <Pagination
        onChange={onChange}
        current={Number(router.query.page as string) || 1}
        defaultCurrent={1}
        total={totalPage * 10}
      />
    </div>
  );
};

export default PaginationCustomer;
