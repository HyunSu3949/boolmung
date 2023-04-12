//@ts-nocheck
import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Fire from "./fire/fire";
import { CharacterArrangement } from "./character/CharacterArrangement";
export default function CanvasBox() {
  useEffect(() => {}, []);

  return (
    <Canvas camera={{ position: [0, 2, 10], fov: 90 }}>
      <Suspense fallback={null}>
        <Fire scale={7} position={[0, 2.5, 0]} />
      </Suspense>
      <Floor />
      <CharacterArrangement />
      <OrbitControls />
      <Lights />
      <axesHelper args={[5]} />
    </Canvas>
  );
}

const Floor = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]}>
      <planeGeometry args={[30, 30]} />
      <meshStandardMaterial color="gray" />
    </mesh>
  );
};

const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} />
    </>
  );
};
