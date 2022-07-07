import React, { useEffect } from "react";
import { BsArrowLeft } from "react-icons/bs"; //BsGithub
import { FcGoogle } from "react-icons/fc";
// import { FaFacebookF } from "react-icons/fa";
import Link from "next/link";
import Meta from "../components/Meta";
import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import useStore from "../zustand";
import { useRouter } from "next/router";

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-100">
      <Meta title="Sign In" />
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
          {/* <div>
            <button
              onClick={() => handleLogin(facebookProvider)}
              className="flex items-center text-text-color p-2 rounded-md bg-[#2D88FF] w-full mb-4"
            >
              <FaFacebookF className="w-6 h-6 mr-5" /> Đăng nhập với Facebook
            </button>
          </div> */}
          <div>
            <button
              onClick={() => handleLogin(googleProvider)}
              className="flex items-center text-black bg-white p-2 rounded-md w-full"
            >
              <FcGoogle className="w-6 h-6 mr-5" /> Đăng nhập với Google
            </button>
          </div>
          {/* <div>
            <button
              onClick={() => handleLogin(githubProvider)}
              className="flex items-center text-text-color p-2 rounded-md bg-primary-100 w-full"
            >
              <BsGithub className="w-6 h-6 mr-5" /> Đăng nhập với Github
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
