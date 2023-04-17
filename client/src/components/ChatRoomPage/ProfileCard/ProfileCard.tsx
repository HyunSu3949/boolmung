import React from "react";
import { useProfileCard } from "./useProfileCard";

export const ProfileCard: React.FC = () => {
  const { currentUser, handleLogout } = useProfileCard();

  return (
    <div className="profile">
      <div>{`${currentUser.name} 님`}</div>
      <button onClick={handleLogout} className="logoutButton">
        logout
      </button>
    </div>
  );
};
