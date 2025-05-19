import React from 'react';
import { useSpring, animated } from '@react-spring/three';
import { Mesh } from 'three';
import { MuscleData } from './types';

interface MuscleGroupProps extends MuscleData {
  isSelected: boolean;
  onClick: () => void;
  showDeepMuscles: boolean;
}

export const MuscleGroup: React.FC<MuscleGroupProps> = ({
  geometry,
  position,
  color,
  isSelected,
  onClick,
  showDeepMuscles,
  deepGeometry
}) => {
  const meshRef = React.useRef<Mesh>(null);

  const { scale, emissive } = useSpring({
    scale: isSelected ? 1.05 : 1,
    emissive: isSelected ? color : '#000000',
    config: { mass: 1, tension: 170, friction: 26 }
  });

  return (
    <animated.mesh
      ref={meshRef}
      position={position}
      scale={scale}
      onClick={onClick}
      onPointerOver={() => {
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'default';
      }}
    >
      <bufferGeometry attach="geometry" {...(showDeepMuscles ? deepGeometry : geometry)} />
      <animated.meshPhongMaterial
        attach="material"
        color={color}
        emissive={emissive}
        shininess={30}
        transparent
        opacity={0.9}
      />
    </animated.mesh>
  );
};