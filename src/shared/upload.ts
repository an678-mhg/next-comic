import { API_CLOUDINARY, UPLOAD_KEY } from "./constant";
import axios from "axios";

export const uploadImg = async (file: any) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_KEY);

  try {
    const res = await axios.post(API_CLOUDINARY, formData);
    return res.data.url;
  } catch (error) {
    console.log(error);
  }
};
