import React, { useState } from "react";
import { useAuth } from "../AuthContext/AuthContext";
import { LoginForm } from "./../login/LoginForm";
import { ProfileCard } from "../profileCard/ProfileCard";
import { RoomRouter } from "../../router/RoomRouter";
import { SignupModal } from "./../signup/SignupModal";
import "./SideBar.css";
export const SideBar: React.FC = () => {
  const { isLogedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div className="sideBar">
      {isLogedIn ? (
        <>
          <ProfileCard />
          <RoomRouter />
        </>
      ) : (
        <>
          <LoginForm />
          <button onClick={openModal}>회원가입</button>
          <SignupModal isOpen={isOpen} closeModal={closeModal} />
        </>
      )}
    </div>
  );
};
