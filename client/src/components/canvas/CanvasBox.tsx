//@ts-nocheck
import React, { Suspense, useEffect, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import Fire from "./fire/fire";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import modelPath from "./../../../public/models/ilbuni.glb";
import { chatSocket } from "../../socket/socket";

export default function CanvasBox() {
  const [characters, setCharacters] = useState([]);
  useEffect(() => {
    chatSocket.on("join", (userData) => {
      const newPosition = [Math.random() * 10, 0, Math.random() * 10];
      setCharacters((prev) => [...prev, { position: newPosition }]);
    });
  }, []);
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 90 }}>
      <Suspense fallback={null}>
        <Fire scale={7} position={[0, 2.5, 0]} />
      </Suspense>
      <Floor />
      {characters.map((char, idx) => (
        <Character key={idx} position={char.position} />
      ))}
      <OrbitControls />
      <Lights />
      <axesHelper args={[5]} />
    </Canvas>
  );
}

const Floor = () => {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <planeGeometry args={[10, 10]} />
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

const Character = (props) => {
  const gltf = useLoader(GLTFLoader, "/models/ilbuni.glb");
  return (
    <primitive
      object={gltf.scene}
      position={props.position}
      children-0-castShadow
    />
  );
};
