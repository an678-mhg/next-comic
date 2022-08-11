import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { sidebar } from "../data/sidebar";

const Sidebar = () => {
  const router = useRouter();

  return (
    <ul className="text-text-color items-center w-full justify-center flex-1 md:flex">
      {sidebar.map((item) => (
        <li key={item.name}>
          <Link href={item.link}>
            <a
              className={`py-2 px-3 md:mr-2 mr-0 hover:bg-primary-100 transition-colors uppercase flex items-center ${
                router.asPath === item.link && "bg-primary-100"
              }`}
            >
              <item.icon className="w-6 h-6 mr-2 md:hidden block" /> {item.name}
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Sidebar;
