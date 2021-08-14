// axiosconfig.js
import Axios from "axios";
import { decodeToken } from "./types";

// configure base url
const axios = Axios.create({
  baseURL: process.env.API_PREFIX,
});

// intercept requests and add authorization token
axios.interceptors.request.use((config: any) => {
  const token = localStorage.getItem("token");
  const decodetoken = decodeToken() as any;
  const expireToken = decodetoken && decodetoken.exp;
  if (Date.now() >= expireToken * 1000) {
    localStorage.clear();
    window.location.reload();
    return false;
  }

  if (token) {
    config.headers.authorization = `${token}`;
  }

  return config;
});

export default axios;
