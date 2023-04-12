import React, { Dispatch, useEffect, useState } from "react";
import { useSocket } from "../../AuthContext/SocketContext";

type CharacterInfo = {
  user: string;
  position: number[];
};

export const useCharacter = () => {
  const { participants } = useSocket();
  const [positions, setPositions] = useState<CharacterInfo[]>([]);

  const setCharactersPosition = () => {
    setPositions([
      ...participants.map((i) => ({
        user: i.user,
        position: [Math.random() * 5, 0, Math.random() * 7],
      })),
    ]);
  };

  useEffect(() => {
    setCharactersPosition();
  }, [participants]);
  return { setCharactersPosition, positions };
};
