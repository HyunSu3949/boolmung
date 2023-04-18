import axios, { AxiosError, AxiosResponse } from "axios";

const baseURL = "/api/v1";

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
