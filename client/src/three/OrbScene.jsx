

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';


const AnimatedOrb = () => {
  const meshRef = useRef();

  
  useFrame((state, delta) => {
    
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
      meshRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
     
      <sphereGeometry args={[3.2, 32, 32]} />
      
     
      <meshStandardMaterial 
        color="#00FFFF" 
        wireframe={true} 
      />
    </mesh>
  );
};


const OrbScene = () => {
  return (
    <Canvas>
     
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} />
      
      <AnimatedOrb />
      
    
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
};

export default OrbScene;