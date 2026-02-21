import React, { useState, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, ContactShadows, PerspectiveCamera } from '@react-three/drei';
import { Truck, User, Key, Play, Trophy, Package, Settings, Mail, Globe } from 'lucide-react';

const BuiltTruck = () => (
  <group scale={1.2} position={[0, -0.5, 0]}>
    <mesh castShadow>
      <boxGeometry args={[2.5, 0.7, 4]} />
      <meshStandardMaterial color="#3498db" roughness={0.3} metalness={0.6} />
    </mesh>
    <mesh castShadow position={[0, 0.9, 1.2]}>
      <boxGeometry args={[2.3, 1.2, 1.5]} />
      <meshStandardMaterial color="#ecf0f1" />
    </mesh>
    <mesh position={[0, 1, 1.96]}>
      <boxGeometry args={[2, 0.8, 0.05]} />
      <meshStandardMaterial color="#22d3ee" transparent opacity={0.6} />
    </mesh>
    <mesh castShadow position={[0, 1.1, -0.8]}>
      <boxGeometry args={[2.3, 1.6, 2.3]} />
      <meshStandardMaterial color="#2980b9" />
    </mesh>
    {[[-1.1, -0.2, 1.5], [1.1, -0.2, 1.5], [-1.1, -0.2, -1.5], [1.1, -0.2, -1.5]].map((pos, i) => (
      <mesh key={i} position={pos} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.5, 0.5, 0.4, 32]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    ))}
  </group>
);

const BuiltBoss = () => (
  <group scale={1.8} position={[0, -0.8, 0]}>
    <mesh castShadow>
      <capsuleGeometry args={[0.4, 1, 16, 32]} />
      <meshStandardMaterial color="#2ecc71" />
    </mesh>
    <mesh castShadow position={[0, 1.7, 0]}>
      <sphereGeometry args={[0.4, 32, 32]} />
      <meshStandardMaterial color="#fcd34d" />
    </mesh>
    <mesh position={[-0.15, 1.8, 0.35]}><sphereGeometry args={[0.05, 8, 8]} /><meshStandardMaterial color="black" /></mesh>
    <mesh position={[0.15, 1.8, 0.35]}><sphereGeometry args={[0.05, 8, 8]} /><meshStandardMaterial color="black" /></mesh>
  </group>
);

export default function LoginPage({ onLogin }) {
  const [role, setRole] = useState('driver'); // Matches App.jsx logic
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleAuth = (e) => {
    e.preventDefault();
    if (isLogin) {
      // Logic from App.jsx: 'boss' or 'driver'
      onLogin(role); 
    } else {
      alert("Registration submitted to HQ for approval!");
      setIsLogin(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FF9F43] flex items-center justify-center p-8 font-[cursive] overflow-hidden">
      
      <div className="absolute inset-0 opacity-10" 
           style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 2px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }}></div>

      <div className="relative z-10 w-full max-w-6xl h-[620px] flex bg-white border-8 border-black rounded-[40px] shadow-[15px_15px_0px_#000] overflow-hidden">
        
        {/* LEFT SIDE: FORM */}
        <div className={`w-1/2 flex flex-col justify-center border-r-8 border-black bg-blue-50 text-left ${isLogin ? 'p-12' : 'p-12 py-8'}`}>
          <div className={isLogin ? 'mb-6' : 'mb-2'}>
            <div className="flex items-center gap-3 mb-2">
               <Globe className="text-blue-600 animate-spin-slow" size={32} />
               <span className="bg-black text-white px-3 py-1 rounded-lg text-[10px] font-black tracking-widest uppercase border-2 border-[#f1c40f]">Network Active</span>
            </div>
            <h1 className="text-6xl font-black text-[#222f3e] italic -rotate-2 drop-shadow-md">
              LogiSphere!
            </h1>
            <div className="mt-4 p-4 bg-yellow-300 border-4 border-black rounded-2xl shadow-[4px_4px_0px_#000]">
              <p className="text-sm font-black text-black leading-tight uppercase">
                🚚 THE ULTIMATE TRUCKING EMPIRE MANAGER!
              </p>
            </div>
          </div>

          <form className={isLogin ? 'space-y-4' : 'space-y-2'} onSubmit={handleAuth}>
            <div className="space-y-2">
              {!isLogin && (
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={20} />
                  <input type="email" placeholder="EMAIL_ADDRESS" className="w-full bg-white border-4 border-black p-4 pl-12 rounded-2xl font-black text-black outline-none focus:bg-yellow-50" />
                </div>
              )}
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={20} />
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="USERNAME_ID" 
                  className="w-full bg-white border-4 border-black p-4 pl-12 rounded-2xl font-black text-black outline-none focus:bg-yellow-50" 
                  required
                />
              </div>
              <div className="relative">
                <Key className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={20} />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="SECRET_PASS" 
                  className="w-full bg-white border-4 border-black p-4 pl-12 rounded-2xl font-black text-black outline-none focus:bg-yellow-50" 
                  required
                />
              </div>
            </div>

            <div className="flex gap-4">
              {[
                { id: 'boss', label: '👑 BOSS' },
                { id: 'driver', label: '🏁 DRIVER' }
              ].map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRole(r.id)}
                  className={`flex-1 py-4 rounded-2xl font-black text-xl border-4 border-black transition-all transform active:translate-y-1
                    ${role === r.id ? 'bg-[#1DD1A1] text-white shadow-[6px_6px_0px_#10ac84]' : 'bg-white text-black shadow-[6px_6px_0px_#ddd]'}`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            <button 
              type="submit"
              className="w-full bg-[#FF6B6B] text-white border-4 border-black p-5 rounded-2xl shadow-[8px_8px_0px_#000] active:translate-y-2 active:shadow-none transition-all mt-2"
            >
              <span className="text-3xl font-black italic flex items-center justify-center gap-4">
                <Play className="w-8 h-8 fill-white" /> {isLogin ? 'START ENGINE!' : 'SIGN UP!'}
              </span>
            </button>

            <p className="text-center font-black text-sm mt-4 cursor-pointer uppercase text-black hover:underline" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Need a new fleet? Create Account" : "Already have a key? Log In"}
            </p>
          </form>
        </div>

        {/* RIGHT SIDE: 3D SHOWROOM */}
        <div className="w-1/2 bg-[#54a0ff] relative flex items-center justify-center">
          <div className="w-full h-full">
            <Canvas shadows>
              <PerspectiveCamera makeDefault position={[5, 4, 8]} fov={35} />
              <ambientLight intensity={1.5} />
              <directionalLight position={[10, 10, 5]} intensity={2} castShadow />
              <Suspense fallback={null}>
                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                  {role === 'driver' ? <BuiltTruck /> : <BuiltBoss />}
                </Float>
                <ContactShadows position={[0, -1.2, 0]} opacity={0.5} scale={15} blur={2.5} far={4} />
              </Suspense>
              <OrbitControls autoRotate autoRotateSpeed={4} enableZoom={false} enablePan={false} enableRotate={false} />
            </Canvas>
          </div>

          <Package className="absolute top-10 right-10 w-12 h-12 text-yellow-300 animate-bounce" />
          <Trophy className="absolute bottom-10 left-10 w-12 h-12 text-yellow-400 animate-pulse" />
        </div>
      </div>
    </div>
  );
}