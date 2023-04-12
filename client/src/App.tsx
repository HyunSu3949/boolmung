import React from "react";
import { AuthProvider } from "./components/AuthContext/AuthContext";
import { Main } from "./components/Main/Main";
import { SocketProvider } from "./components/AuthContext/SocketContext";

export default function App() {
  return (
    <AuthProvider>
      <SocketProvider>
        <Main />
      </SocketProvider>
    </AuthProvider>
  );
}
