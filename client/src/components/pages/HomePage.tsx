import React from "react";
import { RoomList } from "../roomList/RoomList";
import { ProfileCard } from "./../profileCard/ProfileCard";

export const HomePage = () => {
  return (
    <>
      <div className="side">
        <ProfileCard />
        <RoomList />
      </div>
    </>
  );
};
