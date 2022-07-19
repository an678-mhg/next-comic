import Link from "next/link";
import React from "react";

const Error = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-primary-100">
      <div>
        <div>
          <img src="/not-found.png" alt="not-found" />
        </div>
        <div className="w-full flex justify-center">
          <Link href="/">
            <a className="bg-primary-300 px-4 py-2 text-text-color rounded-md font-semibold">
              Trở lại trang chủ
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
