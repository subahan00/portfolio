import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(40)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${2 + Math.random() * 4}px`,
          height: `${2 + Math.random() * 4}px`,
          background: i % 3 === 0 ? '#00FFFF' : i % 3 === 1 ? '#9FFFFF' : '#FFFFFF',
          filter: 'blur(1px)',
        }}
        animate={{
          y: [0, -150 - Math.random() * 100, 0],
          opacity: [0, 0.8, 0],
          scale: [0, 1.5 + Math.random(), 0],
        }}
        transition={{
          duration: 4 + Math.random() * 3,
          repeat: Infinity,
          delay: Math.random() * 3,
          ease: 'easeInOut',
        }}
      />
    ))}
  </div>
);

const GlitchText = ({ children, className }) => (
  <div className={`relative ${className}`}>
    <span className="relative z-10">{children}</span>
    <span className="absolute top-0 left-0 opacity-80 z-0" style={{ color: '#00FFFF', clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)', animation: 'glitch1 2s infinite', textShadow: '2px 0 #FF00FF, -2px 0 #00FFFF' }}>{children}</span>
    <span className="absolute top-0 left-0 opacity-80 z-0" style={{ color: '#9FFFFF', clipPath: 'polygon(0 60%, 100% 55%, 100% 100%, 0 100%)', animation: 'glitch2 2.3s infinite', textShadow: '-2px 0 #FF00FF, 2px 0 #00FFFF' }}>{children}</span>
    <span className="absolute top-0 left-0 opacity-50 z-0" style={{ color: '#FFFFFF', clipPath: 'polygon(0 45%, 100% 45%, 100% 60%, 0 55%)', animation: 'glitch3 1.8s infinite' }}>{children}</span>
  </div>
);

const MagneticButton = ({ children, className, onClick }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };

  return (
    <motion.button
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      onClick={onClick}
      className={className}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
};

const Hero = () => {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const containerRef = useRef(null);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden"
      style={{ background: 'linear-gradient(to bottom, #0A0E1A 0%, #111119 100%)' }}
    >
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 255, 255, 0.15) 1.5px, transparent 1.5px), linear-gradient(90deg, rgba(0, 255, 255, 0.15) 1.5px, transparent 1.5px)',
          backgroundSize: '60px 60px',
          animation: 'gridPulse 4s ease-in-out infinite, gridFloat 20s linear infinite',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'center top',
        }}
      />
      <FloatingParticles />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full opacity-30 blur-3xl" style={{ background: 'radial-gradient(circle, rgba(0, 255, 255, 0.5) 0%, rgba(159, 255, 255, 0.3) 40%, transparent 70%)', animation: 'breathe 8s ease-in-out infinite' }} />

      <div className="relative z-20">
        <div className="container mx-auto px-6 pt-6 flex items-center justify-between">
          <div className="flex items-baseline gap-3">
            <span className="text-[11px] font-mono tracking-[0.35em] text-[#9FFFFF] uppercase">
              Portfolio
            </span>
            <span className="text-sm text-slate-300">
              Subahan Mulla · Full-Stack Developer
            </span>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection('contact')}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border backdrop-blur-md relative overflow-hidden group cursor-pointer"
            style={{
              borderColor: 'rgba(0, 255, 255, 0.4)',
              backgroundColor: 'rgba(0, 255, 255, 0.08)',
              boxShadow: '0 0 20px rgba(0, 255, 255, 0.2), inset 0 0 20px rgba(0, 255, 255, 0.05)',
            }}
          >
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
              style={{
                background: 'linear-gradient(to right, transparent, rgba(0, 255, 255, 0.1), transparent)',
              }}
            />
            <span className="w-2 h-2 rounded-full relative z-10" style={{ backgroundColor: '#00FFFF' }}>
              <span className="absolute inset-0 rounded-full animate-ping" style={{ backgroundColor: '#00FFFF' }} />
            </span>
            <span className="text-sm font-semibold tracking-wide relative z-10" style={{ color: '#00FFFF' }}>
              Open to Opportunities
            </span>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 min-h-[calc(100vh-80px)] flex items-center">
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6"
            >
              <motion.div
                className="inline-block font-mono text-sm tracking-widest mb-2"
                style={{ color: '#9FFFFF' }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {"Hey, I'm Subahan"}
              </motion.div>
              <GlitchText className="text-6xl md:text-8xl font-black leading-none">
                <span
                  style={{
                    background: 'linear-gradient(135deg, #00FFFF 0%, #9FFFFF 50%, #FFFFFF 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  SUBAHAN
                </span>
              </GlitchText>
              <motion.div
                className="inline-block font-mono text-sm tracking-widest mt-1"
                style={{ color: '#9FFFFF' }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                {'<full-stack developer />'}
              </motion.div>
            </motion.div>

            <div className="space-y-4">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-lg md:text-xl max-w-lg leading-relaxed"
                style={{
                  color: '#a0aec0',
                  textShadow: '0 0 30px rgba(0, 255, 255, 0.1)',
                }}
              >
                MERN stack developer and CSE undergrad, building scalable web apps, dashboards, and interactive experiences.
                <br />
                <span style={{ color: '#9FFFFF' }} className="font-light">
                  Currently refining DSA & backend architecture while shipping real-world projects.
                </span>
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <MagneticButton
                onClick={() => scrollToSection('projects')}
                className="px-8 py-4 font-bold rounded-full relative overflow-hidden group tracking-wide"
                style={{
                  backgroundColor: '#00FFFF',
                  color: '#0A0E1A',
                  boxShadow: '0 4px 40px rgba(0, 255, 255, 0.5), inset 0 0 20px rgba(255, 255, 255, 0.2)',
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Projects
                  <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    →
                  </motion.span>
                </span>
                <motion.div
                  className="absolute inset-0"
                  style={{ backgroundColor: '#9FFFFF' }}
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </MagneticButton>

              <MagneticButton
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 border-2 font-bold rounded-full backdrop-blur-md relative overflow-hidden group tracking-wide"
                style={{
                  borderColor: '#00FFFF',
                  color: '#00FFFF',
                  backgroundColor: 'rgba(0, 255, 255, 0.05)',
                  boxShadow: '0 0 30px rgba(0, 255, 255, 0.2), inset 0 0 30px rgba(0, 255, 255, 0.05)',
                }}
              >
                <span className="relative z-10">Get in Touch</span>
                <motion.div
                  className="absolute inset-0"
                  style={{ backgroundColor: '#00FFFF' }}
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 0.15 }}
                  transition={{ duration: 0.4 }}
                />
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex gap-12 pt-8 border-t relative"
              style={{ borderColor: 'rgba(0, 255, 255, 0.3)' }}
            >
              <div
                className="absolute top-0 left-0 w-full h-px"
                style={{
                  background: 'linear-gradient(to right, transparent, #00FFFF, transparent)',
                }}
              />
              {[
                { value: '150+', label: 'LeetCode', color: '#00FFFF' },
                { value: '2+', label: 'Major Projects', color: '#9FFFFF' },
                { value: '7.0', label: 'CGPA', color: '#FFFFFF' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="space-y-2 relative group cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="text-4xl font-black tracking-tight"
                    style={{
                      color: stat.color,
                      textShadow: `0 0 20px ${stat.color}80`,
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + i * 0.1 }}
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm font-medium tracking-wider uppercase" style={{ color: '#a0aec0' }}>
                    {stat.label}
                  </div>
                  <div
                    className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-500 group-hover:w-full"
                    style={{ backgroundColor: '#00FFFF' }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* ENHANCED HELMET SECTION */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative h-[500px] lg:h-[700px] flex items-center justify-center"
          >
            {/* Animated background glows */}
            <motion.div
              className="absolute inset-0 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.6, 0.4],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                background: "radial-gradient(circle, rgba(0, 255, 255, 0.8) 0%, rgba(159, 255, 255, 0.4) 30%, transparent 70%)",
              }}
            />
            
            <motion.div
              className="absolute inset-0 rounded-full blur-2xl"
              animate={{
                scale: [1.1, 1, 1.1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                background: "radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, transparent 50%)",
              }}
            />

            {/* Animated Helmet */}
            <motion.div
              className="relative z-10"
              animate={{
                y: [0, -20, 0],
                rotateY: [0, 10, 0, -10, 0],
              }}
              transition={{
                y: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                rotateY: {
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              style={{
                transform: `translate(${(mousePos.x - 0.5) * 25}px, ${(mousePos.y - 0.5) * 25}px)`,
                transformStyle: 'preserve-3d',
              }}
            >
              <motion.img
                src="/helmet.png"
                alt="helmet hologram"
                className="pointer-events-none select-none max-w-[70%] mx-auto"
                style={{
                  filter: 'drop-shadow(0 0 60px #00FFFF) drop-shadow(0 0 30px #9FFFFF)',
                }}
                whileHover={{ 
                  scale: 1.05,
                  filter: 'drop-shadow(0 0 80px #00FFFF) drop-shadow(0 0 40px #9FFFFF)',
                }}
              />

              {/* Energy pulses around helmet */}
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute inset-0 border-2 rounded-full"
                  style={{
                    borderColor: 'rgba(0, 255, 255, 0.3)',
                    left: '10%',
                    right: '10%',
                    top: '10%',
                    bottom: '10%',
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: i * 1,
                    ease: "easeOut"
                  }}
                />
              ))}
            </motion.div>

            {/* Floating Tech Labels with enhanced animation */}
            <div className="absolute inset-0 pointer-events-none">
              {[
                { label: "React", position: "top-10 left-10", delay: 0, rotate: -5 },
                { label: "Node.js", position: "top-20 right-10", delay: 0.1, rotate: 5 },
                { label: "MongoDB", position: "bottom-20 left-10", delay: 0.2, rotate: 3 },
                { label: "Express", position: "bottom-10 right-20", delay: 0.3, rotate: -3 },
              ].map((tech, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: [0.6, 1, 0.6],
                    y: [0, -8, 0],
                  }}
                  transition={{
                    opacity: { duration: 3, repeat: Infinity, delay: tech.delay },
                    y: { duration: 3, repeat: Infinity, delay: tech.delay },
                  }}
                  whileHover={{ 
                    scale: 1.15, 
                    opacity: 1,
                    boxShadow: '0 0 30px rgba(0, 255, 255, 0.5)',
                  }}
                  className={`absolute ${tech.position} px-4 py-2 text-sm font-bold font-mono border-2 rounded-full backdrop-blur-md cursor-pointer`}
                  style={{
                    color: "#00FFFF",
                    borderColor: "rgba(0, 255, 255, 0.4)",
                    backgroundColor: "rgba(10, 14, 26, 0.9)",
                    boxShadow: "0 0 20px rgba(0, 255, 255, 0.3), inset 0 0 10px rgba(0, 255, 255, 0.1)",
                    transform: `rotate(${tech.rotate}deg)`,
                  }}
                >
                  {tech.label}
                </motion.div>
              ))}
            </div>

            {/* Orbital rings */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="w-full h-full" style={{ filter: 'blur(0.5px)' }}>
                <circle cx="50%" cy="50%" r="42%" fill="none" stroke="url(#gradient1)" strokeWidth="2" strokeDasharray="10,5" opacity="0.6">
                  <animateTransform attributeName="transform" type="rotate" from="0 50% 50%" to="360 50% 50%" dur="25s" repeatCount="indefinite" />
                </circle>
                <circle cx="50%" cy="50%" r="52%" fill="none" stroke="url(#gradient2)" strokeWidth="1.5" strokeDasharray="5,10" opacity="0.4">
                  <animateTransform attributeName="transform" type="rotate" from="360 50% 50%" to="0 50% 50%" dur="35s" repeatCount="indefinite" />
                </circle>
                <circle cx="50%" cy="50%" r="36%" fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" strokeDasharray="3,8" opacity="0.5">
                  <animateTransform attributeName="transform" type="rotate" from="0 50% 50%" to="360 50% 50%" dur="20s" repeatCount="indefinite" />
                </circle>
                <defs>
                  <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00FFFF" stopOpacity="0.2" />
                    <stop offset="50%" stopColor="#00FFFF" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#00FFFF" stopOpacity="0.2" />
                  </linearGradient>
                  <linearGradient id="gradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#9FFFFF" stopOpacity="0.1" />
                    <stop offset="50%" stopColor="#9FFFFF" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#9FFFFF" stopOpacity="0.1" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </motion.div>
        </div>
      </div>

      {/* FIXED Social icons with proper z-index and pointer-events */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 z-30"
        style={{ pointerEvents: 'auto' }}
      >
        {[
          { icon: 'G', href: 'https://github.com/subahan00', label: 'GitHub' },
          { icon: 'L', href: 'www.linkedin.com/in/subahan-mulla-756905262', label: 'LinkedIn' },
          { icon: '@', href: 'mailto:subahanmulla007@gmail.com', label: 'Email' },
        ].map((link, i) => (
          <motion.a
            key={i}
            href={link.href}
            target={link.href.startsWith('mailto:') ? '_self' : '_blank'}
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold backdrop-blur-md relative overflow-hidden group cursor-pointer"
            style={{
              borderColor: 'rgba(0, 255, 255, 0.4)',
              backgroundColor: 'rgba(0, 255, 255, 0.05)',
              color: '#00FFFF',
              pointerEvents: 'auto',
            }}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 + i * 0.1 }}
          >
            <span className="relative z-10">{link.icon}</span>
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: '#00FFFF' }}
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 0.2 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
        ))}
      </motion.div>

      <style>{`
        @keyframes glitch1 { 0%, 100% { transform: translate(0); } 20% { transform: translate(-3px, 3px); } 40% { transform: translate(3px, -3px); } 60% { transform: translate(-2px, 2px); } 80% { transform: translate(2px, -1px); } }
        @keyframes glitch2 { 0%, 100% { transform: translate(0); } 25% { transform: translate(3px, -3px); } 50% { transform: translate(-3px, 3px); } 75% { transform: translate(2px, -2px); } }
        @keyframes glitch3 { 0%, 100% { transform: translate(0); } 33% { transform: translate(1px, -1px); } 66% { transform: translate(-1px, 1px); } }
        @keyframes gridPulse { 0%, 100% { opacity: 0.3; } 50% { opacity: 0.5; } }
        @keyframes gridFloat { 0% { background-position: 0 0; } 100% { background-position: 60px 60px; } }
        @keyframes breathe { 0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; } 50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.5; } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 0.3; } 50% { transform: scale(1.05); opacity: 0.5; } }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #0A0E1A; }
        ::-webkit-scrollbar-thumb { background: #00FFFF; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #9FFFFF; }
      `}</style>
    </div>
  );
};

export default Hero;