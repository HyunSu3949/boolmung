import React from "react";
import { AuthProvider } from "./components/AuthContext/AuthContext";
import { SideBar } from "./components/sideBar/SideBar";
import CanvasBox from "./components/canvas/CanvasBox";

export default function App() {
  return (
    <AuthProvider>
      <CanvasBox />
      <SideBar />
    </AuthProvider>
  );
}
