export const BASE_URL = "https://next-comics.vercel.app";
export const API_URL = "http://www.nettruyenco.com";
export const API_CLOUDINARY =
  "https://api.cloudinary.com/v1_1/annnn/image/upload";
export const UPLOAD_KEY = "xhkmjqak";

export const getImage = (img: string) => {
  return `${BASE_URL}/api/handler?url=${encodeURIComponent(img)}`;
};

// export const calculateCreatedTime = (timeCreated: number) => {
//   let periods = {
//     year: 365 * 30 * 24 * 60 * 60 * 1000,
//     month: 30 * 24 * 60 * 60 * 1000,
//     week: 7 * 24 * 60 * 60 * 1000,
//     day: 24 * 60 * 60 * 1000,
//     hour: 60 * 60 * 1000,
//     minute: 60 * 1000,
//   };

//   let diff = Date.now() - timeCreated;

//   for (const key in periods) {
//     if (diff >= Number(periods[key])) {
//       let result = Math.floor(diff / Number(periods[key]));
//       return `${result} ${result === 1 ? key : key + "s"} ago`;
//     }
//   }

//   return "Just now";
// };
