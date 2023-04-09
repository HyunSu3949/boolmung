import axiosInstance from "../../apis/utils/instance";
import { useAuth } from "../AuthContext/AuthContext";

export const useProfileCard = () => {
  const { currentUser, setIsLogedIn } = useAuth();
  const handleLogout = () => {
    axiosInstance.get("/users/logout");
    setIsLogedIn(false);
  };
  return { handleLogout, currentUser };
};
