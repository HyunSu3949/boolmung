import * as THREE from "three";
import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations, OrbitControls } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useInput } from "../hooks/useInput";
import { useFrame, useThree } from "@react-three/fiber";

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

type ActionName = "default" | "walk" | "";

let walkDirection = new THREE.Vector3();
let rotateAngle = new THREE.Vector3(0, 1, 0);
let rotateQuarternion = new THREE.Quaternion();
let cameraTarget = new THREE.Vector3();

const directionOffset = ({ forward, backward, left, right }: any) => {
  let directionOffset = 0; //기본 w

  if (forward) {
    if (left) {
      directionOffset = Math.PI / 4; //w+a ,45도 전환
    } else if (right) {
      directionOffset = -Math.PI / 4;
    }
  } else if (backward) {
    if (left) {
      directionOffset = Math.PI / 4 + Math.PI / 2; //s+a
    } else if (right) {
      directionOffset = -Math.PI / 4 + -Math.PI / 2;
    } else {
      directionOffset = Math.PI; //s
    }
  } else if (left) {
    directionOffset = Math.PI / 2; //a
  } else if (right) {
    directionOffset = -Math.PI / 2; //d
  }

  return directionOffset;
};

export function Character() {
  const { forward, backward, left, right } = useInput();
  const model = useGLTF("/models/player.glb") as GLTFResult;
  const currentAction = useRef("");
  const controlsRef = useRef<any>();
  const camera = useThree((state) => state.camera);

  model.scene.scale.set(1.2, 1.2, 1.2);

  const { animations, scene } = model;
  const { actions } = useAnimations<any>(animations, scene);

  const updateCameraTarget = (moveX: number, moveZ: number) => {
    camera.position.x += moveX;
    camera.position.z += moveZ;

    cameraTarget.x = model.scene.position.x;
    cameraTarget.y = model.scene.position.y + 2;
    cameraTarget.z = model.scene.position.z;
    if (controlsRef.current) controlsRef.current.target = cameraTarget;
  };
  useEffect(() => {
    let action: ActionName = "";

    if (forward || backward || left || right) {
      action = "walk";
    } else {
      action = "default";
    }

    if (currentAction.current != action) {
      const nextActionToPlay = actions[action];
      const current = actions[currentAction.current];
      current?.fadeOut(0.2);
      nextActionToPlay?.reset().fadeIn(0.2).play();
      currentAction.current = action;
    }
  }, [forward, backward, left, right]);

  useFrame((state, delta) => {
    if (currentAction.current == "walk") {
      let angleYCameraDirection = Math.atan2(
        camera.position.x - model.scene.position.x,
        camera.position.z - model.scene.position.z
      );

      let newDirectionOffset = directionOffset({
        forward,
        backward,
        left,
        right,
      });

      rotateQuarternion.setFromAxisAngle(
        rotateAngle,
        angleYCameraDirection + newDirectionOffset
      );

      model.scene.quaternion.rotateTowards(rotateQuarternion, 0.2);

      camera.getWorldDirection(walkDirection);
      walkDirection.y = 0;
      walkDirection.normalize();
      walkDirection.applyAxisAngle(rotateAngle, newDirectionOffset);

      const moveX = walkDirection.x * 2 * delta;
      const moveZ = walkDirection.z * 2 * delta;
      model.scene.position.x += moveX;
      model.scene.position.z += moveZ;
      updateCameraTarget(moveX, moveZ);
      console.log(model.scene.position.x, model.scene.position.z);
    }
  });
  return (
    <>
      <OrbitControls ref={controlsRef} />
      <primitive object={scene} />
    </>
  );
}

useGLTF.preload("/models/player.glb");
