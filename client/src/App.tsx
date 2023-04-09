import React from "react";
import { SignupForm } from "./components/signup/SignupForm";
import { LoginForm } from "./components/login/LoginForm";
import { RoomList } from "./components/roomList/RoomList";
import { AuthProvider } from "./components/AuthContext/AuthContext";
import { ProfileCard } from "./components/profileCard/ProfileCard";

export default function App() {
  return (
    <AuthProvider>
      <SignupForm />
      <LoginForm />
      <RoomList />
      <ProfileCard />
    </AuthProvider>
  );
}
