import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload, Line } from "@react-three/drei";
import * as random from 'maath/random/dist/maath-random.esm';

const starRotation = [0, 0, Math.PI / 4]

const Stars = (props) => {
  const ref = useRef();

  const sphere = random.inSphere(new Float32Array(4500), { radius: 1.2 })

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  })

  return (
    <group rotation={starRotation}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props} >
        <PointMaterial transparent color="#f272c8" size={0.002} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  )
}

const StarsOverlap = (props) => {
  const ref = useRef();

  const sphere = random.inSphere(new Float32Array(200), { radius: 1.2 })

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  })

  return (
    <group rotation={starRotation}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props} >
        <PointMaterial transparent color="#f272c8" size={0.009} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  )
}

const StarsCanvas = () => {
  return (
    <>
      <div className="w-full h-auto absolute inset-0 z-[-1]">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Suspense fallback={null}>
            <Stars />
          </Suspense>

          <Preload all />
        </Canvas>
      </div>
    </>
  )
}

export default StarsCanvas