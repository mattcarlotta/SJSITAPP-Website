/* istanbul ignore file */
import get from "lodash.get";
import axios from "axios";

const { baseURL, IMAGEAPI } = process.env;

export const app = axios.create({
  baseURL
});

app.interceptors.response.use(
  response => response,
  error =>
    Promise.reject(get(error, ["response", "data", "err"]) || error.message)
);

export const avatarAPI = axios.create({
  baseURL: `${IMAGEAPI}/api/avatar/`,
  withCredentials: true
});

avatarAPI.interceptors.response.use(
  response => response,
  error =>
    Promise.reject(get(error, ["response", "data", "err"]) || error.message)
);

export default app;
