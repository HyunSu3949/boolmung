import React from "react";
import { AuthProvider } from "./components/common/Context/AuthContext";
import { SoundButton } from "./components/common/SoundButton/SoundButton";
import { Router } from "./router/Router";

export default function App() {
  return (
    <AuthProvider>
      <Router />
      <SoundButton />
    </AuthProvider>
  );
}
