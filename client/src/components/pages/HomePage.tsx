import React, { useState } from "react";
import { RoomList } from "../roomList/RoomList";
import { ProfileCard } from "./../profileCard/ProfileCard";
import LoginScene from "../canvas/LoginScene";
import { useAuth } from "../AuthContext/AuthContext";
import LogoutScene from "./../canvas/LogoutScene";
import { LoginForm } from "../login/LoginForm";
import { SignupModal } from "../signup/SignupModal";

export const HomePage = () => {
  const { isLogedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isLogedIn ? (
        <>
          <LoginScene />
          <div className="side">
            <ProfileCard />
            <RoomList />
          </div>
        </>
      ) : (
        <>
          <LogoutScene />
          <div className="side">
            <LoginForm />
            <button onClick={openModal}>회원가입</button>
            <SignupModal isOpen={isOpen} closeModal={closeModal} />
          </div>
        </>
      )}
    </>
  );
};
