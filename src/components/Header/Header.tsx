import Link from "next/link";
import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { SearchIcon, MenuIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import Search from "./Search";
import useStore from "../../zustand";
import Tippy from "@tippyjs/react/headless";
import NavUser from "./NavUser";

const Header = () => {
  const router = useRouter();

  const { currentUser } = useStore();

  useEffect(() => {
    const header = document.getElementById("myHeader");
    const sticky = header?.offsetTop || 0;

    const handleSticky = () => {
      if (window.pageYOffset > sticky) {
        header?.classList.add("sticky");
      } else {
        header?.classList.remove("sticky");
      }
    };

    window.addEventListener("scroll", handleSticky);

    return () => {
      window.removeEventListener("scroll", handleSticky);
    };
  }, []);

  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const handleCloseSearch = () => {
    setShowSearch(false);
  };

  useEffect(() => {
    setShowMenu(false);
  }, [router.asPath]);

  return (
    <div
      id="myHeader"
      className={`py-3 shadow-sm bg-primary-200 transition-all`}
    >
      <div className="flex container items-center justify-between">
        <div
          className={`md:flex block md:static fixed top-0 bottom-0 z-[9999] ${
            showMenu ? "left-0" : "left-[-100%]"
          } w-[250px] md:w-auto max-w-full md:bg-transparent bg-primary-300 transition-all`}
        >
          <Link href="/">
            <a className="flex items-center md:flex-row flex-col">
              <h1 className="text-2xl font-bold text-text-color mb-0 md:mr-10 mr-0 w-full p-4 md:p-0 flex items-center">
                <img className="w-10 h-10" src="/icon.png" />
              </h1>
            </a>
          </Link>

          <Sidebar />
        </div>

        <div
          onClick={() => setShowMenu(true)}
          className="p-2 rounded-sm bg-primary-300 md:hidden block cursor-pointer"
        >
          <MenuIcon className="w-6 h-6 text-blue-500" />
        </div>

        <div
          onClick={() => setShowMenu(false)}
          className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm opacity-100 z-[9998] transition-opacity md:hidden ${
            showMenu ? "block" : "hidden"
          }`}
        ></div>

        <div className="flex items-center">
          <button
            onClick={() => setShowSearch(true)}
            className="p-2 rounded-full bg-primary-300 mr-4"
          >
            <SearchIcon className="w-6 h-6 text-text-color" />
          </button>
          {!currentUser ? (
            <Link href="/sign-in">
              <a className="block w-full h-full text-text-color px-3 py-2 bg-primary-300 rounded-sm">
                Đăng nhập
              </a>
            </Link>
          ) : (
            <div>
              <Tippy
                interactive
                placement="bottom-end"
                render={(attr) => (
                  <NavUser currentUser={currentUser} {...attr} />
                )}
              >
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName}
                  />
                </div>
              </Tippy>
            </div>
          )}
        </div>
      </div>

      {showSearch && <Search handleClose={handleCloseSearch} />}
    </div>
  );
};

export default Header;
