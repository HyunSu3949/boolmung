import * as THREE from "three";
import React, { useEffect, useRef, useMemo } from "react";
import { useGLTF, useAnimations, Clone } from "@react-three/drei";
import { useFrame, useThree, useGraph } from "@react-three/fiber";
import { SkeletonUtils } from "three-stdlib";

type ActionName = "default" | "walk" | "";

let walkDirection = new THREE.Vector3();
let rotateAngle = new THREE.Vector3(0, 1, 0);
let rotateQuarternion = new THREE.Quaternion();

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

export const OtherCharacter = ({ model, input, id, position }: any) => {
  const { forward, backward, left, right } = input;
  const currentAction = useRef("");
  const camera = useThree((state) => state.camera);

  const { animations, scene } = model;
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { ref, actions } = useAnimations(animations);

  clone.scale.set(1.2, 1.2, 1.2);
  clone.position.set(position[0], position[1], position[2]);

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
        camera.position.x - clone.position.x,
        camera.position.z - clone.position.z
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

      clone.quaternion.rotateTowards(rotateQuarternion, 0.2);

      camera.getWorldDirection(walkDirection);
      walkDirection.y = 0;
      walkDirection.normalize();
      walkDirection.applyAxisAngle(rotateAngle, newDirectionOffset);

      const moveX = walkDirection.x * 2 * delta;
      const moveZ = walkDirection.z * 2 * delta;
      clone.position.x += moveX;
      clone.position.z += moveZ;
    }
  });
  return (
    <>
      <primitive object={clone} ref={ref} />
    </>
  );
};

useGLTF.preload("/models/player.glb");
