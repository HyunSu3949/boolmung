import React from "react";
import { AuthProvider } from "./components/AuthContext/AuthContext";
import { SideBar } from "./components/sideBar/SideBar";

export default function App() {
  return (
    <AuthProvider>
      <SideBar />
    </AuthProvider>
  );
}
