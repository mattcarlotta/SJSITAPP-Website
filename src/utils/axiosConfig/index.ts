/* istanbul ignore file */
import get from "lodash.get";
import axios from "axios";

export const app = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASEURL
});

app.interceptors.response.use(
  response => response,
  error =>
    Promise.reject(get(error, ["response", "data", "err"]) || error.message)
);

export const avatarAPI = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_IMAGEAPI}/api/avatar/`,
  withCredentials: true
});

avatarAPI.interceptors.response.use(
  response => response,
  error =>
    Promise.reject(get(error, ["response", "data", "err"]) || error.message)
);

export default app;
