import React, { useState, useEffect, useMemo, useRef } from "react";
import { Clone, useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import { OtherCharacter } from "./OtherCharacter";
import { useAuth } from "../../AuthContext/AuthContext";
import { useChatSocket } from "../../room/useChatSocket";

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.SkinnedMesh;
    Bone: THREE.Bone;
    Bone003: THREE.Bone;
    Bone005: THREE.Bone;
  };
  materials: {
    Material: THREE.MeshStandardMaterial;
  };
};

export const Others = ({ actionInfo }: any) => {
  const model = useGLTF("/models/player1.glb") as GLTFResult;

  const { currentUser } = useAuth();
  const othersInfo = Object.entries(actionInfo).filter(
    (data: any) => data[1].userId !== currentUser._id
  );

  const characters = othersInfo.map((data: any) => {
    const [socketId, state] = data;

    return (
      <OtherCharacter
        key={state.userId}
        model={model}
        input={state.input}
        id={state.userId}
        position={state.position}
      />
    );
  });
  return <>{characters}</>;
};

useGLTF.preload("/models/player1.glb");
