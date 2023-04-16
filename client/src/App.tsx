import React from "react";
import { AuthProvider } from "./components/AuthContext/AuthContext";
import { Main } from "./components/Main/Main";
import { SoundButton } from "./components/SoundButton/SoundButton";

export default function App() {
  return (
    <AuthProvider>
      <Main />
      <SoundButton />
    </AuthProvider>
  );
}
