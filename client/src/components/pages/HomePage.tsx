import React, { useEffect, useState } from "react";
import { RoomList } from "../roomList/RoomList";
import { ProfileCard } from "./../profileCard/ProfileCard";
import { io } from "socket.io-client";
import LoginScene from "../canvas/LoginScene";
import { useAuth } from "../AuthContext/AuthContext";
import LogoutScene from "./../canvas/LogoutScene";
import { LoginForm } from "../login/LoginForm";
import { SignupModal } from "../signup/SignupModal";

const Url = "http://127.0.0.1:3000/room";
const Path = "/socket.io";

export const HomePage = () => {
  const { isLogedIn } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    const roomSocket = io(Url, {
      path: Path,
    });
    return () => {
      roomSocket.disconnect();
    };
  }, []);

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
