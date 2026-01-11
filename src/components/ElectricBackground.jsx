import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import './ElectricBackground.css'

// Electric particle system
function ElectricParticles({ count = 2000 }) {
  const mesh = useRef()
  const light = useRef()

  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 100
      const factor = 20 + Math.random() * 100
      const speed = 0.01 + Math.random() / 200
      const x = Math.random() * 200 - 100
      const y = Math.random() * 200 - 100
      const z = Math.random() * 200 - 100

      temp.push({ time, factor, speed, x, y, z })
    }
    return temp
  }, [count])

  const dummy = useMemo(() => new THREE.Object3D(), [])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    
    particles.forEach((particle, i) => {
      let { factor, speed, x, y, z } = particle
      
      // Electric movement pattern
      const t = (particle.time += speed)
      const wave = Math.sin(t) * Math.cos(t * 2)
      const wave2 = Math.cos(t * 0.5) * Math.sin(t * 1.5)
      
      dummy.position.set(
        x + Math.cos((t / 10) + factor) + (Math.sin(t * 1) * factor) / 10,
        y + Math.sin((t / 10) + factor) + (Math.cos(t * 2) * factor) / 10,
        z + Math.cos((t / 10) + factor) + (Math.sin(t * 3) * factor) / 10
      )
      
      // Electric scaling effect
      const scale = (1 + Math.sin(t + factor)) * 0.5 + 0.5
      dummy.scale.setScalar(scale * 0.3)
      
      // Rotate particles
      dummy.rotation.set(
        Math.sin(t * 0.5) * 0.5,
        Math.cos(t * 0.5) * 0.5,
        Math.sin(t * 0.3) * 0.5
      )
      
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    
    mesh.current.instanceMatrix.needsUpdate = true
    
    // Animate light
    if (light.current) {
      light.current.position.x = Math.sin(time * 0.5) * 50
      light.current.position.y = Math.cos(time * 0.3) * 50
      light.current.position.z = Math.sin(time * 0.7) * 50
    }
  })

  return (
    <>
      <pointLight ref={light} position={[0, 0, 0]} color="#FFD700" intensity={2} distance={100} />
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <dodecahedronGeometry args={[0.2, 0]} />
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FFD700"
          emissiveIntensity={2}
          metalness={0.8}
          roughness={0.2}
        />
      </instancedMesh>
    </>
  )
}

// Electric lightning bolts
function LightningBolt({ start, end, segments, time, speed }) {
  const lineRef = useRef()
  const geometryRef = useRef()
  
  useFrame(() => {
    if (!geometryRef.current) return
    
    time.current += speed * 0.01
    const opacity = Math.sin(time.current) * 0.5 + 0.5
    
    // Create zigzag path for electric effect
    const points = []
    points.push(start)
    
    for (let i = 1; i < segments; i++) {
      const t = i / segments
      const point = new THREE.Vector3().lerpVectors(start, end, t)
      
      // Add randomness for electric zigzag effect
      const offset = Math.sin(time.current + i) * 8
      point.x += Math.cos(time.current + i) * offset
      point.y += Math.sin(time.current + i * 2) * offset
      point.z += Math.cos(time.current + i * 1.5) * offset
      
      points.push(point)
    }
    points.push(end)
    
    // Update geometry
    const positions = []
    points.forEach((point, i) => {
      if (i < points.length - 1) {
        positions.push(point.x, point.y, point.z)
        positions.push(points[i + 1].x, points[i + 1].y, points[i + 1].z)
      }
    })
    
    geometryRef.current.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
    if (lineRef.current) {
      lineRef.current.material.opacity = opacity * 0.8
    }
  })

  return (
    <line ref={lineRef}>
      <bufferGeometry ref={geometryRef} />
      <lineBasicMaterial
        color="#FFD700"
        transparent
        opacity={0.8}
      />
    </line>
  )
}

function LightningBolts() {
  const bolts = useMemo(() => {
    const temp = []
    for (let i = 0; i < 12; i++) {
      temp.push({
        start: new THREE.Vector3(
          (Math.random() - 0.5) * 120,
          Math.random() * 60 + 30,
          (Math.random() - 0.5) * 120
        ),
        end: new THREE.Vector3(
          (Math.random() - 0.5) * 120,
          -Math.random() * 60 - 30,
          (Math.random() - 0.5) * 120
        ),
        segments: 10 + Math.floor(Math.random() * 10),
        time: { current: Math.random() * 10 },
        speed: 0.5 + Math.random() * 0.5,
      })
    }
    return temp
  }, [])

  return (
    <group>
      {bolts.map((bolt, index) => (
        <LightningBolt key={index} {...bolt} />
      ))}
    </group>
  )
}

// Electric grid/field effect
function ElectricField() {
  const meshRef = useRef()
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(time * 0.1) * 0.1
      meshRef.current.rotation.y = time * 0.05
      meshRef.current.material.opacity = 0.1 + Math.sin(time * 0.5) * 0.05
      meshRef.current.material.emissiveIntensity = 0.3 + Math.sin(time * 0.7) * 0.2
    }
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -50]} rotation={[0, 0, 0]}>
      <planeGeometry args={[200, 200, 50, 50]} />
      <meshStandardMaterial
        color="#FFD700"
        wireframe
        transparent
        opacity={0.1}
        emissive="#FFD700"
        emissiveIntensity={0.5}
      />
    </mesh>
  )
}

// Electric arcs/sparks
function ElectricArcs() {
  const arcsRef = useRef()
  const arcs = useMemo(() => {
    const temp = []
    for (let i = 0; i < 30; i++) {
      temp.push({
        start: new THREE.Vector3(
          (Math.random() - 0.5) * 150,
          (Math.random() - 0.5) * 150,
          (Math.random() - 0.5) * 150
        ),
        end: new THREE.Vector3(
          (Math.random() - 0.5) * 150,
          (Math.random() - 0.5) * 150,
          (Math.random() - 0.5) * 150
        ),
        time: Math.random() * 10,
        speed: 0.3 + Math.random() * 0.4,
        segments: 5 + Math.floor(Math.random() * 5),
      })
    }
    return temp
  }, [])

  useFrame(() => {
    arcs.forEach((arc, index) => {
      arc.time += arc.speed * 0.01
      const opacity = (Math.sin(arc.time) * 0.5 + 0.5) * 0.4
      
      const child = arcsRef.current.children[index]
      if (child && child.material) {
        child.material.opacity = opacity
      }
    })
  })

  return (
    <group ref={arcsRef}>
      {arcs.map((arc, index) => {
        const points = []
        for (let i = 0; i <= arc.segments; i++) {
          const t = i / arc.segments
          const point = new THREE.Vector3().lerpVectors(arc.start, arc.end, t)
          const offset = Math.sin(arc.time + i) * 3
          point.x += Math.cos(arc.time + i) * offset
          point.y += Math.sin(arc.time + i * 1.5) * offset
          point.z += Math.cos(arc.time + i * 0.8) * offset
          points.push(point)
        }
        
        return (
          <line key={index}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={points.length}
                array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial
              color="#FFD700"
              transparent
              opacity={0.4}
            />
          </line>
        )
      })}
    </group>
  )
}

function ElectricBackground() {
  return (
    <div className="electric-background">
      <Canvas
        camera={{ position: [0, 0, 50], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
      >
        <color attach="background" args={['#000000']} />
        
        {/* Ambient light for overall illumination */}
        <ambientLight intensity={0.2} color="#FFFFFF" />
        
        {/* Electric particles */}
        <ElectricParticles count={2000} />
        
        {/* Lightning bolts */}
        <LightningBolts />
        
        {/* Electric field grid */}
        <ElectricField />
        
        {/* Electric arcs */}
        <ElectricArcs />
        
        {/* Additional point lights for electric glow */}
        <pointLight position={[30, 30, 30]} color="#FFD700" intensity={1.5} distance={100} />
        <pointLight position={[-30, -30, 30]} color="#FFD700" intensity={1.5} distance={100} />
        <pointLight position={[0, 0, 50]} color="#FFFFFF" intensity={0.8} distance={100} />
        <pointLight position={[0, 30, -30]} color="#FFD700" intensity={1} distance={100} />
      </Canvas>
    </div>
  )
}

export default ElectricBackground
