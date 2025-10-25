import React from 'react';
import { User, Settings } from 'lucide-react';

export default function Controls({ userId, onUserIdChange, mode, onModeChange }) {
  return (
    <div className="w-full bg-white/5 backdrop-blur rounded-xl border border-white/10 p-4 sm:p-6">
      <div className="flex flex-col lg:flex-row gap-4 lg:items-end">
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
