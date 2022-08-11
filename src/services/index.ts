import axios from "axios";

const client = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/v1`,
  timeout: 10000,
});

export default client;
