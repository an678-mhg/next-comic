import axios from "axios";

const client = axios.create({
  baseURL: `${process.env.BASE_URL}/v1`,
  timeout: 10000,
});

export default client;
