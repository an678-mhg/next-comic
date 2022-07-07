import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const NoUser = () => {
  const router = useRouter();

  return (
    <div className="mt-4 flex items-center">
      <div className="w-8 h-8 rounded-full overflow-hidden">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQp1mjhd4dHptljK4CvIAyBhZtC-GdQ0Cmf_fYiTVKruA&s"
          alt="non-user"
        />
      </div>
      <div className="flex-1 ml-3 bg-primary-300 py-1 px-4 w-full rounded-full">
        <h1 className="text-text-color">
          Bạn cần{" "}
          <Link href={`/sign-in?redirect=${encodeURIComponent(router.asPath)}`}>
            <a className="text-blue-500 hover:underline">đăng nhập</a>
          </Link>{" "}
          để nhận xét...
        </h1>
      </div>
    </div>
  );
};

export default NoUser;
