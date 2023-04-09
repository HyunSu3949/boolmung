import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Room } from "../components/room/Room";
import { RoomList } from "../components/roomList/RoomList";

export const RoomRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RoomList />} />
        <Route path="/room/:id" element={<Room />} />
      </Routes>
    </BrowserRouter>
  );
};
