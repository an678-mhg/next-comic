import { BASE_URL } from "../shared/constant";
import { FC } from "react";
import { useRouter } from "next/router";

interface SocialShareProps {
  title: string;
}

const providers: {
  icon: string;
  link: (url: string, title: string) => string;
}[] = [
  {
    icon: "https://raw.githubusercontent.com/napthedev/blog/11f0a675a7d317cff3719be9ab2f7d94344a5eac/client/public/share-icon/facebook.svg",
    link: (url, title) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        url
      )}&t=${title}`,
  },
  {
    icon: "https://raw.githubusercontent.com/napthedev/blog/11f0a675a7d317cff3719be9ab2f7d94344a5eac/client/public/share-icon/twitter.svg",
    link: (url, title) =>
      `http://twitter.com/share?text=${encodeURIComponent(
        title
      )}&url=${encodeURIComponent(url)}`,
  },
  {
    icon: "https://raw.githubusercontent.com/napthedev/blog/11f0a675a7d317cff3719be9ab2f7d94344a5eac/client/public/share-icon/reddit.svg",
    link: (url, title) =>
      `http://www.reddit.com/submit?url=${encodeURIComponent(
        url
      )}&title=${encodeURIComponent(title)}`,
  },
  {
    icon: "https://raw.githubusercontent.com/napthedev/blog/11f0a675a7d317cff3719be9ab2f7d94344a5eac/client/public/share-icon/email.svg",
    link: (url, title) =>
      `mailto:?subject=${encodeURIComponent(title)}&body=${url}`,
  },
];

const SocialShare: FC<SocialShareProps> = ({ title }) => {
  const router = useRouter();

  return (
    <div className="flex gap-2 flex-wrap my-3">
      {providers.map((provider) => (
        <a
          key={provider.icon}
          href={provider.link(`${BASE_URL}${router.asPath}`, title)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="h-8 w-8 object-cover" src={provider.icon} alt="" />
        </a>
      ))}
    </div>
  );
};

export default SocialShare;
