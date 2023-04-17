import React from "react";
import { useAuth } from "../../common/Context/AuthContext";
import { logout } from "../../../apis/user/logout";

export const ProfileCard: React.FC = () => {
  const { currentUser, setIsLogedIn } = useAuth();

  const handleLogout = () => {
    logout();
    setIsLogedIn(false);
  };

  return (
    <div className="profile">
      <div>{`${currentUser.name} 님`}</div>
      <button onClick={handleLogout} className="logoutButton">
        logout
      </button>
    </div>
  );
};
