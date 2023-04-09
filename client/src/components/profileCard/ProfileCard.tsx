import React from "react";
import { useProfileCard } from "./useProfileCard";

export const ProfileCard: React.FC = () => {
  const { currentUser, handleLogout } = useProfileCard();

  return (
    <div>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
};
