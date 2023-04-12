import React, { useState, useEffect } from "react";
import { Character } from "./Character";
import { useCharacter } from "./useCharacter";
import { useSocket } from "../../AuthContext/SocketContext";

export const CharacterArrangement = () => {
  const { positions } = useCharacter();

  return (
    <>
      <Character />
    </>
  );
};
