import React, { useState } from "react";
import { useAuth } from "../AuthContext/AuthContext";
import { LoginForm } from "../login/LoginForm";
import { Router } from "../../router/Router";
import { SignupModal } from "../signup/SignupModal";
import "./Main.css";
import LogoutScene from "../canvas/LogoutScene";
import LoginScene from "../canvas/LoginScene";

export const Main: React.FC = () => {
  const { isLogedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div className="main">
      {isLogedIn ? (
        <>
          <LoginScene />
          <Router />
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
    </div>
  );
};
