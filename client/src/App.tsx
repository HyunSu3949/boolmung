import React from "react";
import { SignupForm } from "./components/signup/SignupForm";
import { LoginForm } from "./components/login/LoginForm";

export default function App() {
  return (
    <div>
      <SignupForm />
      <LoginForm />
    </div>
  );
}
