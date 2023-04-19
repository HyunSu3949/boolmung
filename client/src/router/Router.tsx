import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { HomePage } from "../components/HomePage/HomePage";
import { ChatRoomPage } from "../components/ChatRoomPage/ChatRoomPage";
import { LoginPage } from "../components/LoginPage/LoginPage";
import { useAuth } from "../components/common/Context/AuthContext";

export const Router = () => {
  const { isLogedIn } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {isLogedIn ? (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/room/:id" element={<ChatRoomPage />} />
            <Route path="/*" element={<Navigate to="/" />} />
          </>
        ) : (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/*" element={<LoginPage />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};
