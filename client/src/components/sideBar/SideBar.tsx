import React from "react";
import { useAuth } from "../AuthContext/AuthContext";
import { LoginForm } from "./../login/LoginForm";
import { ProfileCard } from "../profileCard/ProfileCard";
import { RoomRouter } from "../../router/RoomRouter";

export const SideBar: React.FC = () => {
  const { isLogedIn } = useAuth();

  return (
    <div>
      {isLogedIn ? (
        <>
          <ProfileCard />
          <RoomRouter />
        </>
      ) : (
        <>
          <LoginForm />
          <div onClick={() => {}}>회원가입</div>
        </>
      )}
    </div>
  );
};
