import { BASE_URL } from "../shared/constant";
import { FC } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

interface MetaProps {
  title: string;
  description: string;
  image: string;
}

const Meta: FC<MetaProps> = ({ title, description, image }) => {
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