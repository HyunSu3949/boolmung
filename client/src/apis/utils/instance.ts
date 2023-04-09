import axios, { AxiosError, AxiosResponse } from "axios";

const baseURL = "http://127.0.0.1:3000"; // 개발 로컬주소

export const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});
