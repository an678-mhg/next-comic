import { BASE_URL, copyToClipboard } from "../shared/constant";
import { FC } from "react";
import { useRouter } from "next/router";
import Tippy from "@tippyjs/react";
import { providers } from "../shared/constant";
import { BsLink45Deg } from "react-icons/bs";
import "tippy.js/dist/tippy.css";

interface SocialShareProps {
  title: string;
}

const SocialShare: FC<SocialShareProps> = ({ title }) => {
  const router = useRouter();

  return (
    <div className="flex gap-2 flex-wrap my-3">
      {providers.map((provider) => (
        <Tippy content={provider.name}>
          <button>
            <a
              key={provider.icon}
              href={provider.link(`${BASE_URL}${router.asPath}`, title)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                className="h-8 w-8 object-cover"
                src={provider.icon}
                alt=""
              />
            </a>
          </button>
        </Tippy>
      ))}
      <Tippy content="Copy liên kết">
        <button
          onClick={() => copyToClipboard(`${BASE_URL}${router.asPath}`)}
          className="w-8 h-8 rounded-full bg-primary-300 flex items-center justify-center"
        >
          <BsLink45Deg className="w-6 h-6 text-text-color" />
        </button>
      </Tippy>
    </div>
  );
};

export default SocialShare;
