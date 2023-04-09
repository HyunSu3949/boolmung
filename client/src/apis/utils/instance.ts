import axios, { AxiosError, AxiosResponse } from "axios";

const baseURL = "http://127.0.0.1:3000"; // 개발 로컬주소

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
