// client/src/components/Contact.jsx

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [status, setStatus] = useState({ type: '', message: '' });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const yBlobs = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const yNoise = useTransform(scrollYProgress, [0, 1], [25, -25]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Sending message…' });

    try {
      // 🔧 Put YOUR EmailJS IDs here
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        formRef.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      setStatus({ type: 'success', message: 'Message sent successfully! I will reply soon.' });
      e.target.reset();
    } catch (err) {
      console.error(err);
      setStatus({
        type: 'error',
        message: 'Something went wrong. Please try again or email me directly.',
      });
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative w-full py-24 md:py-28 overflow-hidden"
      style={{ background: '#05060B' }}
    >
      {/* Gradient connector from projects */}
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#05060B] to-transparent z-10" />

      {/* Noise / grain */}
      <motion.div
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
        style={{ y: yNoise }}
      >
        <svg
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <filter id="noiseFilterContact">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.9"
              numOctaves="3"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilterContact)" />
        </svg>
      </motion.div>

      {/* Blobs */}
      <motion.div
        className="absolute -top-20 right-[-120px] w-[420px] h-[420px] rounded-full blur-[120px]"
        style={{
          y: yBlobs,
          background:
            'radial-gradient(circle, rgba(0,255,255,0.25) 0%, transparent 70%)',
        }}
      />
      <motion.div
        className="absolute bottom-[-160px] left-[-100px] w-[420px] h-[420px] rounded-full blur-[120px]"
        style={{
          y: yBlobs,
          background:
            'radial-gradient(circle, rgba(159,255,255,0.22) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 container mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-px w-12 bg-[#00FFFF]" />
              <span className="font-mono text-[#00FFFF] tracking-widest text-xs md:text-sm">
                /// CONTACT.CHANNEL
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Let&apos;s build something{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FFFF] to-[#9FFFFF]">
                together
              </span>
            </h2>
            <p className="mt-3 max-w-xl text-[#a0aec0] text-sm md:text-base leading-relaxed">
              Whether it&apos;s a freelance project, internship opportunity, or just a
              question about my work—drop a message and it will go straight to my inbox.
            </p>
          </div>

          <div className="text-sm text-[#9CA3AF] md:text-right">
            <p className="font-mono text-[#00FFFF] mb-1">Direct email</p>
            <a
              href="mailto:subahanmulla007@gmail.com"
              className="text-white hover:text-[#9FFFFF] transition-colors"
            >
              subahanmulla007@gmail.com
            </a>
            <p className="mt-2 text-xs text-[#6B7280]">
              Located in Kolhapur, India · Open to remote work
            </p>
            <a
              href="mailto:subahanmulla007@gmail.com"
              className="text-white hover:text-[#9FFFFF] transition-colors"
            >
              Cell No : +91 7058508381
            </a>
            
          </div>
        </div>

        {/* Layout: left text / right form */}
        <div className="grid lg:grid-cols-[0.9fr,1.1fr] gap-10 items-start">
          {/* Left: small highlights / reassurance */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-cyan-400/30 bg-[#050816]/80 backdrop-blur-xl p-5 shadow-[0_0_30px_rgba(0,0,0,0.85)]">
              <h3 className="text-base md:text-lg font-semibold text-white mb-2">
                What can we work on?
              </h3>
              <ul className="space-y-2 text-sm text-[#a0aec0]">
                <li className="flex gap-2">
                  <span className="mt-[7px] h-[3px] w-3 rounded-full bg-gradient-to-r from-[#00FFFF] to-[#9FFFFF]" />
                  <span>Full-stack MERN applications or dashboards.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-[7px] h-[3px] w-3 rounded-full bg-gradient-to-r from-[#00FFFF] to-[#9FFFFF]" />
                  <span>Interactive, animated frontends using React & Three.js.</span>
                </li>
                <li className="flex gap-2">
                  <span className="mt-[7px] h-[3px] w-3 rounded-full bg-gradient-to-r from-[#00FFFF] to-[#9FFFFF]" />
                  <span>Internship or entry-level opportunities in web development.</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#020617]/80 p-4 text-xs text-[#9CA3AF] font-mono">
              <p className="mb-2 text-[#00FFFF] tracking-[0.2em] uppercase">
                Response time
              </p>
              <p>I usually reply within 24–48 hours, depending on my college & work schedule.</p>
            </div>
          </div>

          {/* Right: form */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative rounded-3xl border border-cyan-400/40 bg-[#050816]/90 backdrop-blur-xl p-6 md:p-7 shadow-[0_0_45px_rgba(0,0,0,0.9)]"
          >
            {/* Glow */}
            <div
              className="pointer-events-none absolute -top-32 right-0 w-40 h-40 rounded-full blur-3xl opacity-70"
              style={{
                background:
                  'radial-gradient(circle, rgba(0,255,255,0.7) 0%, transparent 70%)',
              }}
            />

            <div className="relative z-10 space-y-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg md:text-xl font-semibold text-white">
                  Send me a message
                </h3>
                <span className="text-[11px] font-mono text-[#9CA3AF]">
                  * All fields required
                </span>
              </div>

              {/* Name */}
              <div className="space-y-2">
                <label
                  htmlFor="user_name"
                  className="text-xs font-mono tracking-[0.2em] uppercase text-[#9CA3AF]"
                >
                  Your Name
                </label>
                <input
                  id="user_name"
                  name="user_name"
                  type="text"
                  required
                  autoComplete="off"
                  className="w-full rounded-xl bg-[#020617] border border-white/10 focus:border-[#00FFFF] focus:ring-1 focus:ring-[#00FFFF] px-3 py-2.5 text-sm text-white outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="user_email"
                  className="text-xs font-mono tracking-[0.2em] uppercase text-[#9CA3AF]"
                >
                  Your Email
                </label>
                <input
                  id="user_email"
                  name="user_email"
                  type="email"
                  required
                  autoComplete="off"
                  className="w-full rounded-xl bg-[#020617] border border-white/10 focus:border-[#00FFFF] focus:ring-1 focus:ring-[#00FFFF] px-3 py-2.5 text-sm text-white outline-none transition-all"
                  placeholder="you@example.com"
                />
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-xs font-mono tracking-[0.2em] uppercase text-[#9CA3AF]"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full rounded-xl bg-[#020617] border border-white/10 focus:border-[#00FFFF] focus:ring-1 focus:ring-[#00FFFF] px-3 py-2.5 text-sm text-white outline-none transition-all resize-none"
                  placeholder="Tell me a bit about your idea, project, or opportunity…"
                />
              </div>

              {/* Status message */}
              {status.message && (
                <p
                  className={`text-xs font-mono ${
                    status.type === 'success'
                      ? 'text-emerald-400'
                      : status.type === 'error'
                      ? 'text-rose-400'
                      : 'text-[#9CA3AF]'
                  }`}
                >
                  {status.message}
                </p>
              )}

              {/* Submit button */}
              <div className="pt-2 flex items-center gap-3">
                <button
                  type="submit"
                  disabled={status.type === 'loading'}
                  className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-semibold text-[#05060B] bg-[#00FFFF] shadow-[0_0_25px_rgba(0,255,255,0.5)] hover:bg-[#9FFFFF] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status.type === 'loading' ? 'Sending…' : 'Send Message'}
                </button>
                <span className="text-[11px] text-[#6B7280] font-mono">
                  or email directly at{' '}
                  <span className="text-[#9FFFFF]">subahanmulla007@gmail.com</span>
                </span>
              </div>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
