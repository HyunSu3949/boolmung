import React from "react";
import { AuthProvider } from "./components/AuthContext/AuthContext";
import { Main } from "./components/Main/Main";

export default function App() {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
}
