// client/src/components/About.jsx

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- Shared Components (Bento + Tag) ---

const BentoCard = ({ children, className = '', delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.5, delay }}
    whileHover={{
      scale: 1.01,
      borderColor: 'rgba(0, 255, 255, 0.5)',
      boxShadow: '0 0 20px rgba(0, 255, 255, 0.1)',
    }}
    className={`relative overflow-hidden rounded-2xl border bg-[#0A0E1A]/80 backdrop-blur-sm p-6 group ${className}`}
    style={{ borderColor: 'rgba(0, 255, 255, 0.1)' }}
  >
    {/* Internal Grid Texture */}
    <div
      className="absolute inset-0 opacity-[0.03] pointer-events-none"
      style={{
        backgroundImage:
          'linear-gradient(#00FFFF 1px, transparent 1px), linear-gradient(90deg, #00FFFF 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}
    />

    {/* Hover Gradient Scanline */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FFFF]/5 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000 ease-in-out pointer-events-none" />

    {children}
  </motion.div>
);

const Tag = ({ text }) => (
  <span className="px-3 py-1 rounded-md border border-[#00FFFF]/30 text-[#00FFFF] font-mono text-xs bg-[#00FFFF]/5 tracking-wider">
    {text}
  </span>
);

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Subtle parallax for background elements
  const yBlobs = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yNoise = useTransform(scrollYProgress, [0, 1], [20, -20]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full py-32 overflow-hidden"
      style={{ background: '#0A0E1A' }}
    >
      {/* --- Background Elements --- */}

      {/* 1. Seamless Gradient Connector from Hero */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0A0E1A] to-transparent z-10" />

      {/* 2. Noise Texture (film grain) */}
      <motion.div
        className="absolute inset-0 opacity-[0.05] pointer-events-none z-0 mix-blend-overlay"
        style={{ y: yNoise }}
      >
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <filter id="noiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.65"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </motion.div>

      {/* 3. Background Blobs with parallax */}
      <motion.div
        className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#00FFFF]/7 rounded-full blur-[110px] animate-pulse"
        style={{ y: yBlobs }}
      />
      <motion.div
        className="absolute bottom-0 left-[-100px] w-[520px] h-[520px] bg-[#9FFFFF]/7 rounded-full blur-[110px]"
        style={{ y: yBlobs }}
      />

      {/* --- Content --- */}
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="h-px w-12 bg-[#00FFFF]" />
            <span className="font-mono text-[#00FFFF] tracking-widest text-sm">
              /// SYSTEM.IDENTITY
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            Beyond the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#9FFFFF]">
              Code
            </span>
          </h2>
          <p className="mt-4 max-w-2xl text-[#a0aec0] text-sm md:text-base leading-relaxed">
            MERN Stack Developer · B.Tech CSE (4th Year) · EY GDS Intern · DSA &
            SQL Enthusiast
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Bio */}
          <BentoCard
            className="md:col-span-8 flex flex-col justify-center gap-6"
            delay={0.1}
          >
            <h3 className="text-2xl font-bold text-white">
              Building Practical & Performant Web Experiences
            </h3>
            <p className="text-[#a0aec0] text-sm md:text-lg leading-relaxed">
              I&apos;m a final-year Computer Science engineering student with a strong
              foundation in Data Structures, Algorithms, and SQL. I focus on
              building real-world web applications using the MERN stack, turning
              ideas into usable, scalable products.
            </p>
        
            <div className="flex gap-6 pt-4 items-center">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">150+</div>
                <div className="text-xs font-mono text-[#00FFFF]">
                  LEETCODE / DSA PROBLEMS
                </div>
              </div>
              <div className="w-px h-10 bg-[#00FFFF]/20" />
              <div className="text-center">
                <div className="text-3xl font-bold text-white">02</div>
                <div className="text-xs font-mono text-[#00FFFF]">
                  MAJOR MERN PROJECTS
                </div>
              </div>
              <div className="w-px h-10 bg-[#00FFFF]/20" />
              <div className="text-center">
                <div className="text-3xl font-bold text-white">01</div>
                <div className="text-xs font-mono text-[#00FFFF]">
                  MERN INTERNSHIP
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Card 2: Avatar / Profile */}
          <BentoCard
            className="md:col-span-4 row-span-2 relative min-h-[400px]"
            delay={0.2}
          >
            {/* Replace this block with your actual image when ready */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              {/* Example:
              <img
                src="/images/subahan.jpg"
                alt="Subahan Mulla"
                className="w-full h-full object-cover object-center"
              />
              */}
              <div className="w-full h-full flex items-center justify-center bg-[#111119]">
                <span className="font-mono text-[#00FFFF]/25 text-3xl md:text-4xl font-bold -rotate-90 tracking-[0.4em]">
                  SUBAHAN_MULLA
                </span>
              </div>
            </div>

            <div className="absolute bottom-6 left-6 z-20">
              <h3 className="text-xl font-bold text-white">
                Full-Stack &<br /> Problem Solver
              </h3>
              <p className="text-xs font-mono text-[#00FFFF] mt-2">
                CURRENT ROLE: B.TECH CSE · MERN INTERN (EY GDS)
              </p>
            </div>
          </BentoCard>

          {/* Card 3: Tech Stack */}
          <BentoCard className="md:col-span-5" delay={0.3}>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#00FFFF] animate-pulse" />
              <h3 className="text-lg font-bold text-white">Core Stack</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                'React',
                'Node.js',
                'Express.js',
                'MongoDB',
                'SQL',
                'JavaScript',
                'C++',
                'Java',
                'Python',
                'Tailwind CSS',
                'Git',
                'GitHub',
                'Cloudinary',
              ].map((tech) => (
                <Tag key={tech} text={tech} />
              ))}
            </div>
          </BentoCard>

          {/* Card 4: Current Focus */}
          <BentoCard className="md:col-span-3" delay={0.4}>
            <h3 className="text-lg font-bold text-white mb-3">
              Currently Improving
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-[#a0aec0]">
                  <span>Data Structures & Algorithms</span>
                  <span className="text-[#00FFFF]">Active</span>
                </div>
                <div className="h-1.5 w-full bg-[#1A1F2E] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '80%' }}
                    transition={{ duration: 1.2 }}
                    className="h-full bg-gradient-to-r from-[#00FFFF] to-[#9FFFFF]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm text-[#a0aec0]">
                  <span>MERN Stack & Project Architecture</span>
                  <span className="text-[#00FFFF]">In Progress</span>
                </div>
                <div className="h-1.5 w-full bg-[#1A1F2E] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '75%' }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    className="h-full bg-gradient-to-r from-[#00FFFF] to-[#9FFFFF]"
                  />
                </div>
              </div>
            </div>
          </BentoCard>

          {/* Card 5: Soft Skills / Approach */}
          <BentoCard
            className="md:col-span-8 md:col-start-1"
            delay={0.5}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <h4 className="text-white font-bold flex items-center gap-2">
                  <span className="text-[#00FFFF]">01.</span> Problem Solving
                </h4>
              
              </div>
              <div className="space-y-2">
                <h4 className="text-white font-bold flex items-center gap-2">
                  <span className="text-[#00FFFF]">02.</span> Quick Learning
                </h4>
                
              </div>
              <div className="space-y-2">
                <h4 className="text-white font-bold flex items-center gap-2">
                  <span className="text-[#00FFFF]">03.</span> Teamwork & Communication
                </h4>
                
              </div>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
};

export default About;
