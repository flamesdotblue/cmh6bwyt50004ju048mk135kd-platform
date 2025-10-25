import React from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function Hero({ cinema }) {
  return (
    <header className="relative w-full h-[64vh] md:h-[72vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className={`absolute inset-0 ${cinema ? 'bg-gradient-to-b from-slate-950/40 via-slate-950/40 to-slate-950/70' : 'bg-slate-950/55'} pointer-events-none`} />

      <AuroraGlow />

      <div className="relative z-10 flex h-full items-center justify-center text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
            <span className="inline-block h-2 w-2 rounded-full bg-fuchsia-400 animate-pulse" />
            Vadarth • AI Health Voice Agent
          </div>
          <h1 className="mt-4 text-3xl sm:text-5xl font-semibold tracking-tight">
            Conversational Healthcare Assistant
          </h1>
          <p className="mt-3 text-sm sm:text-base text-white/70 max-w-2xl mx-auto">
            Speak, upload, and understand. Adaptive memory modes and immersive voice for next‑gen care.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <a href="#chat" className="rounded-md bg-fuchsia-500 hover:bg-fuchsia-600 transition px-4 py-2 text-sm font-medium shadow-[0_0_25px_rgba(217,70,239,0.35)]">Start Chat</a>
            <a href="#uploader" className="rounded-md bg-white/10 hover:bg-white/20 transition px-4 py-2 text-sm font-medium backdrop-blur">Upload Docs</a>
          </div>
        </motion.div>
      </div>
    </header>
  );
}

function AuroraGlow() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[90vw] h-[90vw] rounded-full bg-fuchsia-500/10 blur-3xl"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute -bottom-40 left-10 w-[60vw] h-[60vw] rounded-full bg-cyan-400/10 blur-3xl"
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
      />
      <Stars />
    </div>
  );
}

function Stars() {
  const dots = Array.from({ length: 70 });
  return (
    <div className="absolute inset-0">
      {dots.map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-[2px] w-[2px] rounded-full bg-white/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.2, 0.8, 0.2], y: [0, -4, 0] }}
          transition={{ duration: 4 + (i % 5), repeat: Infinity, delay: i * 0.05 }}
          style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
        />
      ))}
    </div>
  );
}
