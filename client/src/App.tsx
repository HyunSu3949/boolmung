import React from "react";
import { AuthProvider } from "./components/AuthContext/AuthContext";
import { SideBar } from "./components/sideBar/SideBar";
import CanvasBox from "./components/canvas/CanvasBox";
import { SocketProvider } from "./components/AuthContext/SocketContext";

export default function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <CanvasBox />
        <SideBar />
      </SocketProvider>
    </AuthProvider>
  );
}
