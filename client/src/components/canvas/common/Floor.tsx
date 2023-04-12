import React from "react";

export const Floor = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]}>
      <planeGeometry args={[30, 30]} />
      <meshStandardMaterial color="gray" />
    </mesh>
  );
};
