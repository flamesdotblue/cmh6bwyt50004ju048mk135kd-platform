import React from 'react';
import { Film, Volume2, VolumeX, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LayoutHeader({ cinema, onCinemaToggle, speakReplies, onSpeakToggle }) {
  return (
    <header className="relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-2xl sm:text-3xl font-semibold tracking-tight"
            >
              Vadarth • AI Health Assistant
            </motion.h1>
            <p className="text-sm text-white/70 mt-1 flex items-center gap-2">
              <Shield size={14} className="text-fuchsia-300" />
              Voice-enabled, document-aware, multi-mode conversational care
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => onSpeakToggle(!speakReplies)}
              className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition whitespace-nowrap ${
                speakReplies ? 'bg-emerald-600/90 border-emerald-400 text-white' : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
              }`}
              title="Toggle spoken replies"
            >
              {speakReplies ? <Volume2 size={16} /> : <VolumeX size={16} />}
              {speakReplies ? 'Speak On' : 'Speak Off'}
            </button>
            <button
              onClick={() => onCinemaToggle(!cinema)}
              className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition whitespace-nowrap ${
                cinema ? 'bg-fuchsia-600/90 border-fuchsia-400 text-white' : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
              }`}
              title="Cinematic background"
            >
              <Film size={16} /> {cinema ? 'Cinematic' : 'Minimal'}
            </button>
          </div>
        </div>
      </div>

      {/* Subtle animated backdrop */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
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
      </div>
    </header>
  );
}
