import React, { useState, useEffect } from "react";
import { Character } from "./Character";
import { useCharacter } from "./useCharacter";
import { useSocket } from "../../AuthContext/SocketContext";

export const CharacterArrangement = () => {
  const { positions } = useCharacter();

  return (
    <>
      {/* {positions.map((ch, idx) => (
        <Character key={idx} position={ch.position} />
      ))} */}
      {/* <Character position={[1, 0, 1]} /> */}
      <Character />
    </>
  );
};
