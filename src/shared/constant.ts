export const BASE_URL = "https://next-comics.vercel.app";
export const API_URL = "http://www.nettruyenco.com";
export const API_CLOUDINARY =
  "https://api.cloudinary.com/v1_1/annnn/image/upload";
export const UPLOAD_KEY = "xhkmjqak";

export const getImage = (img: string) => {
  return `${BASE_URL}/api/handler?url=${encodeURIComponent(img)}`;
};
