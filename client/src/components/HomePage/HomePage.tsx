import React, { useState } from "react";
import { RoomList } from "./roomList/RoomList";
import { ProfileCard } from "../ChatRoomPage/ProfileCard/ProfileCard";
import LoginScene from "../canvas/LoginScene";
import { useAuth } from "../common/Context/AuthContext";
import LogoutScene from "../canvas/LogoutScene";
import { LoginForm } from "./LoginForm/LoginForm";
import { SignupModal } from "./SignupForm/SignupModal";
import "./HomePage.css";

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
            <button className="signupModalButton" onClick={openModal}>
              회원가입
            </button>
            <SignupModal isOpen={isOpen} closeModal={closeModal} />
          </div>
        </>
      )}
    </>
  );
};
