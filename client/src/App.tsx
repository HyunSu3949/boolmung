import React from "react";
import { AuthProvider } from "./components/common/Context/AuthContext";
import { Main } from "./components/Main/Main";
import { SoundButton } from "./components/common/SoundButton/SoundButton";

export default function App() {
  return (
    <AuthProvider>
      <Main />
      <SoundButton />
    </AuthProvider>
  );
}
