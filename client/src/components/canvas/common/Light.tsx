import { useHelper } from "@react-three/drei";
import React, { useRef } from "react";
import { PointLightHelper } from "three";

export const Lights = () => {
  const lightRef = useRef<any>();

  useHelper(lightRef, PointLightHelper, 3, "red");

  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight
        ref={lightRef}
        position={[0, 1, 0]}
        intensity={0.5}
        castShadow
      />
    </>
  );
};
