import { BASE_URL } from "../shared/constant";
import { FC } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

interface MetaProps {
  title?: string;
  description?: string;
  image?: string;
}

const Meta: FC<MetaProps> = ({
  title = "NextComics | Website đọc truyện tranh",
  description = "Website được tạo bởi Nextjs và Reactjs",
  image = "https://scontent.fvca1-1.fna.fbcdn.net/v/t1.15752-9/285483973_516979343537680_6946433712113895448_n.png?_nc_cat=105&ccb=1-7&_nc_sid=ae9488&_nc_ohc=lWfyjqf8fTMAX_JpV1b&_nc_ht=scontent.fvca1-1.fna&oh=03_AVICHdZxE1ElTuWM2wUgPEMyrGuAfdAoW6AzqaL7NJvhVw&oe=62E678E8",
}) => {
  const router = useRouter();

  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${BASE_URL}${router.asPath}`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={`${BASE_URL}${router.asPath}`} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Head>
  );
};

export default Meta;
