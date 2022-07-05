export const BASE_URL = "https://next-comics.vercel.app";
export const API_URL = "http://www.nettruyenco.com";

export const getImage = (img: string) => {
  return `${BASE_URL}/api/handler?url=${encodeURIComponent(img)}`;
};
