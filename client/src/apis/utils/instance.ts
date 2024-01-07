import axios, { AxiosError, AxiosResponse } from "axios";

let baseURL;
if (process.env.NODE_ENV === "development") {
  baseURL = process.env.DEV_DOMAIN;
} else {
  baseURL = process.env.PROD_DOMAIN;
}

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (res: AxiosResponse) => res,
  (error: AxiosError<any>) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default axiosInstance;
