import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "../components/pages/HomePage";
import { ChatRoomPage } from "../components/pages/ChatRoomPage";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/room/:id" element={<ChatRoomPage />} />
      </Routes>
    </BrowserRouter>
  );
};
