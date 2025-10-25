import React from 'react';
import { User, Settings, Volume2, VolumeX, Film } from 'lucide-react';

export default function Controls({ userId, onUserIdChange, mode, onModeChange, speakReplies, onSpeakToggle, cinema, onCinemaToggle }) {
  return (
    <div className="w-full bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4 sm:p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
      <div className="flex flex-col lg:flex-row gap-6 lg:items-end">
        <div className="flex-1">
          <label className="block text-sm text-white/80 mb-2">User ID</label>
          <div className="flex items-center gap-2 rounded-lg bg-white/5 border border-white/10 px-3 py-2 focus-within:ring-2 focus-within:ring-fuchsia-500/50">
            <User size={16} className="text-white/70" />
            <input
              value={userId}
              onChange={(e) => onUserIdChange(e.target.value)}
              placeholder="Enter your user ID"
              className="w-full bg-transparent outline-none text-sm placeholder:text-white/50"
            />
          </div>
        </div>

        <div className="flex-1">
          <label className="block text-sm text-white/80 mb-2 flex items-center gap-2"><Settings size={16} />Mode</label>
          <div className="grid grid-cols-3 gap-2">
            <ModeButton label="Session" active={mode === 'session'} onClick={() => onModeChange('session')} />
            <ModeButton label="Memory" active={mode === 'memory'} onClick={() => onModeChange('memory')} />
            <ModeButton label="Global" active={mode === 'global'} onClick={() => onModeChange('global')} />
          </div>
          <p className="mt-2 text-xs text-white/60">
            Session: current chat only • Memory: recalls past chats • Global: system-wide knowledge
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onSpeakToggle(!speakReplies)}
            className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition ${
              speakReplies ? 'bg-emerald-600/80 border-emerald-400 text-white' : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
            }`}
            title="Toggle spoken replies"
          >
            {speakReplies ? <Volume2 size={16} /> : <VolumeX size={16} />} {speakReplies ? 'Speak On' : 'Speak Off'}
          </button>
          <button
            onClick={() => onCinemaToggle(!cinema)}
            className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition ${
              cinema ? 'bg-fuchsia-600/90 border-fuchsia-400 text-white' : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
            }`}
            title="Cinematic background"
          >
            <Film size={16} /> {cinema ? 'Cinematic' : 'Minimal'}
          </button>
        </div>
      </div>
    </div>
  );
}

function ModeButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-lg px-3 py-2 text-sm border transition ${
        active
          ? 'bg-fuchsia-500 text-white border-fuchsia-400'
          : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10'
      }`}
    >
      {label}
    </button>
  );
}
