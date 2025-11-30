// client/src/components/Projects.jsx

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const ACCENT = '#00FFFF';
const ACCENT_SOFT = '#9FFFFF';

// Simple pill
const TechTag = ({ label }) => (
  <span className="px-2.5 py-1 rounded-md border border-[#00FFFF]/30 text-[11px] text-[#00FFFF] font-mono bg-[#00FFFF]/5 tracking-wider">
    {label}
  </span>
);

// A single tile in the grid
const ProjectTile = ({ project, isActive, onClick }) => {
  if (!project) {
    // empty / placeholder tile
    return (
      <motion.div
        className="relative rounded-2xl bg-[#05060B] border border-white/5 shadow-[0_0_0_1px_rgba(15,23,42,0.5)]"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 0.4, scale: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/3 to-transparent opacity-0 group-hover:opacity-10 transition-opacity" />
      </motion.div>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      className={`relative rounded-2xl p-4 flex flex-col items-center justify-center overflow-hidden group transition-colors duration-300
        ${isActive ? 'bg-[#0A0E1A] border border-cyan-400/80 shadow-[0_0_30px_rgba(0,255,255,0.35)]' : 'bg-[#05060B] border border-white/5 hover:border-cyan-400/60 hover:bg-[#070814]'}
      `}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
    >
      {/* Soft glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
           style={{ background: 'radial-gradient(circle at 0% 0%, rgba(0,255,255,0.25), transparent 60%)' }} />

      {/* Icon / pseudo logo */}
      <div className="relative z-10 mb-3 w-12 h-12 rounded-2xl flex items-center justify-center">
        <div
          className="w-full h-full rounded-2xl"
          style={{
            background: project.iconBg,
            boxShadow: project.iconShadow,
          }}
        >
          <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-white">
            {project.icon}
          </div>
        </div>
      </div>

      {/* Name */}
      <div className="relative z-10 text-sm font-semibold text-white text-center">
        {project.title}
      </div>
      <div className="relative z-10 text-[11px] text-[#a0aec0] mt-1 text-center">
        {project.short}
      </div>

      {/* Glow border animation */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute -inset-[1px] rounded-2xl border border-cyan-400/40 blur-[1.5px]" />
      </div>
    </motion.button>
  );
};

const Projects = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const yBlobs = useTransform(scrollYProgress, [0, 1], [80, -60]);
  const yNoise = useTransform(scrollYProgress, [0, 1], [30, -30]);

  // === YOUR PROJECTS HERE ===
  const projects = [
    {
      id: 'official90',
      title: 'Official_90',
      short: 'Tournament automation platform',
      icon: 'O9',
      iconBg: 'radial-gradient(circle at 30% 0%, #00FFFF, #111827 60%)',
      iconShadow: '0 0 25px rgba(0,255,255,0.6)',
      role: 'Full-stack MERN · Solo project',
      timeline: '2024',
      tech: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS', 'Cloudinary'],
      description: [
        'Automated orchestration for group-stage and league-format tournaments with real-time tables and standings.',
        'Admin-only dashboard for player onboarding, match setup (8 / 16 / 32 players), and dynamic result entry.',
        'Responsive public UI with animated sections and themed wallpapers hosted via Cloudinary.',
      ],
      links: {
        github: 'https://github.com/your-username/official_90', // replace
        live: '#',
      },
    },
    {
      id: 'newsapp',
      title: 'MERN News Portal',
      short: 'Curated news web app',
      icon: 'N',
      iconBg: 'radial-gradient(circle at 20% 0%, #FB923C, #111827 60%)',
      iconShadow: '0 0 25px rgba(248,113,113,0.6)',
      role: 'Full-stack MERN',
      timeline: '2024',
      tech: ['React', 'Node.js', 'Express', 'MongoDB', 'REST API'],
      description: [
        'News application built with the MERN stack to create, manage, and display categorized news articles.',
        'Backend APIs for CRUD operations, category filtering, and secure data access.',
        'Clean, responsive frontend interface focused on readability and simple navigation.',
      ],
      links: {
        github: 'https://github.com/your-username/news-app', // replace
        live: '#',
      },
    },
    {
      id: 'leetcode',
      title: 'DSA & LeetCode Practice',
      short: '100+ problems solved',
      icon: '{}',
      iconBg: 'radial-gradient(circle at 30% 0%, #22c55e, #020617 60%)',
      iconShadow: '0 0 25px rgba(34,197,94,0.6)',
      role: 'Problem solving',
      timeline: 'Ongoing',
      tech: ['Java', 'C++', 'SQL', 'Algorithms'],
      description: [
        'Solved 100+ problems across arrays, strings, graphs, and DP to strengthen fundamentals.',
        'Focus on writing clean, optimized solutions and understanding trade-offs in time & space.',
        'Used this practice to influence how I design and implement backend logic in my projects.',
      ],
      links: {
        github: 'https://leetcode.com/', // or your profile
        live: '',
      },
    },
    {
      id: 'coming',
      title: 'Next Case Study',
      short: 'In Progress',
      icon: '▶',
      iconBg: 'radial-gradient(circle at 30% 0%, #E11D48, #020617 60%)',
      iconShadow: '0 0 25px rgba(236,72,153,0.6)',
      role: 'Work in progress',
      timeline: '2025',
      tech: ['TBD'],
      description: [
        'An upcoming project focused on performance, animations, and real-world scalability.',
        'Stay tuned — this will showcase my next big learning stretch and experiments.',
      ],
      links: {
        github: '',
        live: '',
      },
    },
  ];

  // slots: some are project IDs, some null to render empty tiles
  const gridSlots = [
    'official90',
    'newsapp',
    'leetcode',
    null,
    'coming',
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ];

  const projectMap = Object.fromEntries(projects.map((p) => [p.id, p]));
  const [activeId, setActiveId] = useState('official90');
  const activeProject = projectMap[activeId];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full py-28 md:py-32 overflow-hidden"
      style={{ background: '#05060B' }}
    >
      {/* gradient connector from previous section */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#0A0E1A] to-transparent z-10" />

      {/* noise / film grain */}
      <motion.div
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{ y: yNoise }}
      >
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <filter id="noiseFilterProjects">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.8"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilterProjects)" />
        </svg>
      </motion.div>

      {/* blobs */}
      <motion.div
        className="absolute -top-32 right-[-80px] w-[420px] h-[420px] rounded-full blur-[110px]"
        style={{
          y: yBlobs,
          background:
            'radial-gradient(circle, rgba(0,255,255,0.20) 0%, transparent 70%)',
        }}
      />
      <motion.div
        className="absolute bottom-[-120px] left-[-80px] w-[420px] h-[420px] rounded-full blur-[120px]"
        style={{
          y: yBlobs,
          background:
            'radial-gradient(circle, rgba(159,255,255,0.18) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 container mx-auto px-6">
        {/* header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-12 bg-[#00FFFF]" />
              <span className="font-mono text-[#00FFFF] tracking-widest text-xs md:text-sm">
                /// SELECTED.WORK
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Projects & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#9FFFFF]">Experiments</span>
            </h2>
            <p className="mt-3 max-w-2xl text-[#a0aec0] text-sm md:text-base leading-relaxed">
              A mix of full-stack builds, learning projects, and problem-solving
              work that reflects how I think about products and engineering.
            </p>
          </div>
        </div>

        {/* GRID + DETAIL */}
        <div className="grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-10 items-start">
          {/* grid tiles */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 md:gap-4">
            {gridSlots.map((slot, idx) => (
              <ProjectTile
                key={idx}
                project={slot ? projectMap[slot] : null}
                isActive={slot && slot === activeId}
                onClick={() => slot && setActiveId(slot)}
              />
            ))}
          </div>

          {/* detail panel */}
          <div className="relative">
            <AnimatePresence mode="wait">
              {activeProject && (
                <motion.div
                  key={activeProject.id}
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="relative rounded-3xl border border-cyan-400/40 bg-[#050816]/90 backdrop-blur-xl p-6 md:p-7 shadow-[0_0_40px_rgba(0,0,0,0.85)]"
                >
                  {/* glow */}
                  <div
                    className="pointer-events-none absolute -top-32 right-0 w-40 h-40 rounded-full blur-3xl opacity-70"
                    style={{
                      background: 'radial-gradient(circle, rgba(0,255,255,0.6) 0%, transparent 70%)',
                    }}
                  />
                  <div className="relative z-10 space-y-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#9ca3af] mb-1">
                          {activeProject.timeline}
                        </div>
                        <h3 className="text-xl md:text-2xl font-semibold text-white">
                          {activeProject.title}
                        </h3>
                        <p className="text-xs md:text-sm text-[#9ca3af] mt-1">
                          {activeProject.role}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {activeProject.tech.slice(0, 3).map((t) => (
                          <TechTag key={t} label={t} />
                        ))}
                      </div>
                    </div>

                    <ul className="space-y-2.5 text-sm text-[#a0aec0] leading-relaxed">
                      {activeProject.description.map((line, idx) => (
                        <li key={idx} className="flex gap-2">
                          <span className="mt-[6px] h-[3px] w-3 rounded-full bg-gradient-to-r from-[#00FFFF] to-[#9FFFFF]" />
                          <span>{line}</span>
                        </li>
                      ))}
                    </ul>

                    {activeProject.links && (activeProject.links.github || activeProject.links.live) && (
                      <div className="flex flex-wrap gap-3 pt-2">
                        {activeProject.links.live && (
                          <a
                            href={activeProject.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <button className="px-4 py-2 rounded-full text-xs md:text-sm font-semibold bg-[#00FFFF] text-[#05060B] shadow-[0_0_20px_rgba(0,255,255,0.5)] hover:bg-[#9FFFFF] transition-colors">
                              View Live
                            </button>
                          </a>
                        )}
                        {activeProject.links.github && (
                          <a
                            href={activeProject.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <button className="px-4 py-2 rounded-full text-xs md:text-sm font-semibold border border-[#00FFFF] text-[#00FFFF] bg-[#00FFFF]/5 hover:bg-[#00FFFF]/15 transition-colors">
                              View Code
                            </button>
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
