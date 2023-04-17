import { useAuth } from "../../common/Context/AuthContext";
import { logout } from "../../../apis/user/logout";

export const useProfileCard = () => {
  const { currentUser, setIsLogedIn } = useAuth();

  const handleLogout = () => {
    logout();
    setIsLogedIn(false);
  };

  return { handleLogout, currentUser };
};