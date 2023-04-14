import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useHelper } from "@react-three/drei";
import Fire from "./fire/fire";
import { Floor } from "./common/Floor";
import { Lights } from "./common/Light";

export default function LoginScene() {
  useEffect(() => {}, []);

  return (
    <Canvas camera={{ position: [0, 2, 10], fov: 90 }}>
      <Suspense fallback={null}>
        <Fire scale={7} position={[0, 2.5, 0]} />
      </Suspense>
      <Floor />
      <OrbitControls />
      <Lights />
      <axesHelper args={[5]} />
    </Canvas>
  );
}