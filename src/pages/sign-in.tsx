import React, { useEffect } from "react";
import { BsArrowLeft, BsGithub } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import Meta from "../components/Meta";
import { auth, googleProvider, githubProvider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import useStore from "../zustand";
import { useRouter } from "next/router";
import { BarWave } from "react-cssfx-loading";

const SignIn = () => {
  const handleLogin = async (provider: any) => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const { currentUser } = useStore();

  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.query?.redirect
        ? router.push(`${router.query.redirect}`)
        : router.push("/");
    }
  }, [currentUser]);

  if (typeof currentUser === "undefined") {
    return (
      <div className="flex items-center justify-center bg-primary-100 fixed top-0 bottom-0 right-0 left-0">
        <BarWave />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-100">
      <Meta
        title="Sign-In"
        description="Website được tạo bởi Nextjs và Reactjs"
        image="https://scontent.fsgn13-2.fna.fbcdn.net/v/t1.15752-9/290717828_1072115733435959_6212475330637442786_n.png?_nc_cat=105&ccb=1-7&_nc_sid=ae9488&_nc_ohc=pECgeCJ4hPEAX9ymckV&_nc_ht=scontent.fsgn13-2.fna&oh=03_AVJqXtEM8n6lT-nWd7vQYYq3iYeIYu1gr99bUvqb16Inxg&oe=62EE84BB"
      />
      <div className="w-[400px] max-w-[calc(100%-32px)] bg-primary-300 p-4 rounded-md">
        <div className="flex items-center justify-between mb-4">
          <h1 className="font-semibold text-2xl text-text-color">Đăng nhập</h1>
          <button title="Quay lại trang chủ">
            <Link href="/">
              <a>
                <BsArrowLeft className="w-6 h-6 text-blue-500" />
              </a>
            </Link>
          </button>
        </div>

        <div>
          <div>
            <button
              onClick={() => handleLogin(googleProvider)}
              className="flex items-center text-black bg-white p-2 rounded-md w-full mb-4"
            >
              <FcGoogle className="w-6 h-6 mr-5" /> Đăng nhập với Google
            </button>
          </div>
          <div>
            <button
              onClick={() => handleLogin(githubProvider)}
              className="flex items-center text-text-color p-2 rounded-md bg-primary-100 w-full"
            >
              <BsGithub className="w-6 h-6 mr-5" /> Đăng nhập với Github
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
