import axiosInstance from "../utils/instance";

export const login = async (data: FormData) => {
  const result = await axiosInstance.get("/users/logout");

  return result;
};
