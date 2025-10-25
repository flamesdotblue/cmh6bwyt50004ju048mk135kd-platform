import React from 'react';
import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <header className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-slate-950/30 to-slate-950/60 pointer-events-none" />

      <div className="relative z-10 flex h-full items-center justify-center text-center px-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
            <span className="inline-block h-2 w-2 rounded-full bg-fuchsia-400 animate-pulse" />
            Vadarth • AI Health Voice Agent
          </div>
          <h1 className="mt-4 text-3xl sm:text-5xl font-semibold tracking-tight">
            Conversational Healthcare Assistant
          </h1>
          <p className="mt-3 text-sm sm:text-base text-white/70 max-w-2xl mx-auto">
            Securely chat with your AI assistant. Upload documents, choose context mode, and speak naturally using voice.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <a href="#chat" className="rounded-md bg-fuchsia-500 hover:bg-fuchsia-600 transition px-4 py-2 text-sm font-medium">Start Chat</a>
            <a href="#uploader" className="rounded-md bg-white/10 hover:bg-white/20 transition px-4 py-2 text-sm font-medium">Upload Docs</a>
          </div>
        </div>
      </div>
    </header>
  );
}
