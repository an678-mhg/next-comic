import { FaDiscord, FaFacebook, FaGithub } from "react-icons/fa";
import { AiFillYoutube } from "react-icons/ai";

import type { NextPage } from "next";

const Footer: NextPage = () => {
  return (
    <div className="flex justify-between items-center h-12 px-7 bg-primary-100 text-text-color">
      <p className="hidden md:block">Nguyen Quoc An &copy; 2022</p>
      <p className="block md:hidden">Nguyen Quoc An &copy;</p>
      <div className="flex items-center gap-3">
        <p className="hidden md:block">Contact me: </p>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/an678-mhg/NextComics"
        >
          <FaGithub size={25} />
        </a>
        <a
          className="hover:text-[#1877f2] transition duration-300"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.facebook.com/an70008"
        >
          <FaFacebook size={25} />
        </a>
        <a
          className="hover:text-[#5a65ea] transition duration-300"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.youtube.com/channel/UCJeY2ZgtRzY3NSiLZYu9ddg"
        >
          <AiFillYoutube size={25} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
