import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Html } from '@react-three/drei';
import { Rotate3d, Layers, ShieldCheck, Cpu, Zap, Activity } from 'lucide-react';

// 3D Dumbbell Mesh
function DumbbellMesh({ finish, weight }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  const getMaterial = () => {
    switch (finish) {
      case 'chrome':
        return <meshStandardMaterial color="#e5e7eb" metalness={0.95} roughness={0.05} />;
      case 'neon':
        return <meshStandardMaterial color="#00ff66" emissive="#00ff66" emissiveIntensity={0.6} metalness={0.4} roughness={0.2} />;
      case 'gold':
        return <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} />;
      default: // stealth matte
        return <meshStandardMaterial color="#18181b" metalness={0.6} roughness={0.4} />;
    }
  };

  const scaleFactor = weight === '60kg' ? 1.4 : weight === '40kg' ? 1.2 : weight === '25kg' ? 1.0 : 0.85;

  return (
    <group ref={meshRef} scale={scaleFactor}>
      {/* Bar Handle */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.15, 0.15, 3.4, 32]} />
        <meshStandardMaterial color="#a1a1aa" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Hex End Left */}
      <mesh position={[-1.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.95, 0.95, 0.4, 6]} />
        {getMaterial()}
      </mesh>
      <mesh position={[-0.8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.7, 0.7, 0.2, 6]} />
        {getMaterial()}
      </mesh>

      {/* Hex End Right */}
      <mesh position={[1.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.95, 0.95, 0.4, 6]} />
        {getMaterial()}
      </mesh>
      <mesh position={[0.8, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.7, 0.7, 0.2, 6]} />
        {getMaterial()}
      </mesh>
    </group>
  );
}

// 3D Kettlebell Mesh
function KettlebellMesh({ finish, weight }) {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  const getMaterial = () => {
    switch (finish) {
      case 'chrome':
        return <meshStandardMaterial color="#e5e7eb" metalness={0.95} roughness={0.05} />;
      case 'neon':
        return <meshStandardMaterial color="#00ff66" emissive="#00ff66" emissiveIntensity={0.6} metalness={0.4} roughness={0.2} />;
      case 'gold':
        return <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} />;
      default:
        return <meshStandardMaterial color="#18181b" metalness={0.6} roughness={0.4} />;
    }
  };

  const scaleFactor = weight === '60kg' ? 1.3 : weight === '40kg' ? 1.15 : weight === '25kg' ? 1.0 : 0.85;

  return (
    <group ref={meshRef} scale={scaleFactor} position={[0, -0.5, 0]}>
      {/* Sphere Body */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.2, 32, 32]} />
        {getMaterial()}
      </mesh>
      {/* Handle Torus */}
      <mesh position={[0, 1.2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.7, 0.15, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#3f3f46" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

// 3D Olympic Barbell Plate Mesh
function BumperPlateMesh({ finish, weight }) {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x = 0.2;
    }
  });

  const getMaterial = () => {
    switch (finish) {
      case 'chrome':
        return <meshStandardMaterial color="#e5e7eb" metalness={0.95} roughness={0.05} />;
      case 'neon':
        return <meshStandardMaterial color="#00ff66" emissive="#00ff66" emissiveIntensity={0.6} metalness={0.4} roughness={0.2} />;
      case 'gold':
        return <meshStandardMaterial color="#ffd700" metalness={0.9} roughness={0.1} />;
      default:
        return <meshStandardMaterial color="#18181b" metalness={0.7} roughness={0.3} />;
    }
  };

  const scaleFactor = weight === '60kg' ? 1.3 : weight === '40kg' ? 1.15 : weight === '25kg' ? 1.0 : 0.85;

  return (
    <group ref={meshRef} scale={scaleFactor}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.6, 1.6, 0.4, 48]} />
        {getMaterial()}
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.42, 32]} />
        <meshStandardMaterial color="#e4e4e7" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

export default function EquipmentViewer3D() {
  const [selectedGear, setSelectedGear] = useState('dumbbell');
  const [finish, setFinish] = useState('stealth');
  const [weight, setWeight] = useState('25kg');

  const equipmentSpecs = {
    dumbbell: {
      title: 'PRO HEXAGONAL 3D DUMBBELL',
      material: 'Spheroidal Graphite Iron + Urethane Coating',
      tensile: '215,000 PSI',
      grip: 'Diamond Micro-Knurling 1.2mm',
      warranty: 'Lifetime Commercial Guarantee',
      desc: 'Engineered for high-intensity powerlifting and bodybuilding. Precision-balanced with anti-roll hexagonal geometry.'
    },
    kettlebell: {
      title: 'COMPETITION 3D KETTLEBELL',
      material: 'Single-Mold Gravity Cast Iron',
      tensile: '190,000 PSI',
      grip: 'Smooth Powder-Coated Ergonomic Handle',
      warranty: '10-Year Heavy Impact Guarantee',
      desc: 'Uniform dimensions across all weight divisions. Optimized window design for comfortable arm placement during cleans & snatches.'
    },
    plate: {
      title: 'OLYMPIC BUMPER DISCS',
      material: 'High-Density Virgin Vulcanized Rubber',
      tensile: 'Bounce Rating: 85 Durometer',
      grip: 'Full Rim Inset Lip with Stainless Steel Collar',
      warranty: 'Commercial Drop Warranty',
      desc: 'IWF standard 450mm diameter. Precision machined center hub fits all standard 50mm Olympic bars with zero slop.'
    }
  };

  const currentSpec = equipmentSpecs[selectedGear];

  return (
    <section id="equipment-3d" className="py-24 relative bg-[#0d0e12] overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00ff66]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-[#00ff66]/30 text-[#00ff66] text-xs font-bold uppercase mb-4">
            <Rotate3d className="w-4 h-4" />
            <span>INTERACTIVE 3D GEAR LAB</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-extrabold uppercase tracking-wider mb-4">
            INSPECT & CUSTOMIZE <span className="text-gradient-neon">OUR 3D GEAR</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg">
            Rotate in 360°, change alloy finishes, and test real-time weight specs before stepping into our arena.
          </p>
        </div>

        {/* 3D Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Controls Sidebar (Left) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Gear Type Selector */}
            <div className="glass-panel p-6 rounded-2xl border-white/10">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#00ff66]" /> Select 3D Equipment:
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'dumbbell', label: 'Dumbbell' },
                  { id: 'kettlebell', label: 'Kettlebell' },
                  { id: 'plate', label: 'Bumper Disc' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedGear(item.id)}
                    className={`py-3 px-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 ${selectedGear === item.id ? 'bg-[#00ff66] text-black shadow-[0_0_15px_rgba(0,255,102,0.4)]' : 'glass-panel text-gray-300 hover:text-white hover:border-white/30'}`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Material Finish Selector */}
            <div className="glass-panel p-6 rounded-2xl border-white/10">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#00e5ff]" /> Finish & Alloy:
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: 'stealth', name: 'Stealth Matte', color: '#18181b' },
                  { id: 'chrome', name: 'Chrome Mirror', color: '#e5e7eb' },
                  { id: 'neon', name: 'Cyber Neon', color: '#00ff66' },
                  { id: 'gold', name: 'Gold Titanium', color: '#ffd700' }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFinish(f.id)}
                    className={`p-3 rounded-xl flex items-center gap-3 border transition-all text-xs font-bold uppercase ${finish === f.id ? 'border-[#00ff66] bg-[#00ff66]/10 text-white' : 'border-white/10 glass-panel text-gray-400 hover:text-white'}`}
                  >
                    <span className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: f.color }} />
                    <span>{f.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Weight Class Selector */}
            <div className="glass-panel p-6 rounded-2xl border-white/10">
              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" /> Target Load Class:
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {['10kg', '25kg', '40kg', '60kg'].map((w) => (
                  <button
                    key={w}
                    onClick={() => setWeight(w)}
                    className={`py-2.5 rounded-lg text-xs font-extrabold uppercase transition-all ${weight === w ? 'bg-gradient-to-r from-[#00ff66] to-[#00e5ff] text-black font-extrabold' : 'glass-panel text-gray-400 hover:text-white'}`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* 3D Canvas Viewport (Center) */}
          <div className="lg:col-span-8 relative h-[480px] w-full glass-panel rounded-3xl overflow-hidden border-white/10 flex items-center justify-center">
            
            {/* Interactive Badge */}
            <div className="absolute top-6 left-6 z-10 glass-panel px-4 py-2 rounded-full border-white/10 text-xs text-gray-300 flex items-center gap-2">
              <Rotate3d className="w-4 h-4 text-[#00ff66] animate-spin" />
              <span>DRAG TO ROTATE 360°</span>
            </div>

            {/* Canvas */}
            <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
              <ambientLight intensity={0.8} />
              <directionalLight position={[5, 10, 5]} intensity={2.5} />
              <pointLight position={[-5, -5, -5]} intensity={1.5} color="#00ff66" />
              <pointLight position={[5, -5, 5]} intensity={1.5} color="#00e5ff" />

              <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.5}>
                {selectedGear === 'dumbbell' && <DumbbellMesh finish={finish} weight={weight} />}
                {selectedGear === 'kettlebell' && <KettlebellMesh finish={finish} weight={weight} />}
                {selectedGear === 'plate' && <BumperPlateMesh finish={finish} weight={weight} />}
              </Float>

              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
            </Canvas>

            {/* Spec Overlay Banner (Bottom Viewport) */}
            <div className="absolute bottom-6 left-6 right-6 z-10 glass-panel p-5 rounded-2xl border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h4 className="text-xl font-extrabold font-display uppercase text-white tracking-wider">
                  {currentSpec.title} <span className="text-[#00ff66]">[{weight}]</span>
                </h4>
                <p className="text-xs text-gray-400 mt-1 max-w-xl">{currentSpec.desc}</p>
              </div>
              <div className="flex items-center gap-4 text-xs font-bold text-gray-300">
                <div className="flex items-center gap-1.5">
                  <Activity className="w-4 h-4 text-[#00ff66]" />
                  <span>{currentSpec.tensile}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#00e5ff]" />
                  <span>{currentSpec.warranty}</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
