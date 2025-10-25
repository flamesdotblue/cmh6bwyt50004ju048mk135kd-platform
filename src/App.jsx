import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Hero from './components/Hero';
import Controls from './components/Controls';
import DocumentUploader from './components/DocumentUploader';
import Chat from './components/Chat';

export default function App() {
  const [userId, setUserId] = useState('');
  const [mode, setMode] = useState('session'); // session | memory | global
  const [files, setFiles] = useState([]);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Welcome to Vadarth — your ultra-intuitive AI Health Assistant. Set your mode, upload docs, and talk naturally.' },
  ]);
  const [speakReplies, setSpeakReplies] = useState(true);
  const [cinema, setCinema] = useState(true);

  const synthRef = useRef(typeof window !== 'undefined' ? window.speechSynthesis : null);

  useEffect(() => {
    return () => {
      try { synthRef.current?.cancel(); } catch {}
    };
  }, []);

  const speak = useCallback((text) => {
    if (!speakReplies || typeof window === 'undefined') return;
    try {
      const synth = synthRef.current;
      if (!synth) return;
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 1.02;
      utter.pitch = 1.02;
      utter.volume = 1;
      const voice = (synth.getVoices?.() || []).find(v => /en-US|English/i.test(v.lang));
      if (voice) utter.voice = voice;
      synth.speak(utter);
    } catch {}
  }, [speakReplies]);

  const handleSendMessage = useCallback(
    async (text) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      const userMsg = { role: 'user', content: trimmed };
      setMessages((prev) => [...prev, userMsg]);

      // Simulated latency and streaming reply
      const idNote = userId ? `User:${userId}` : 'Guest';
      const modeLabel = mode === 'session' ? 'Session' : mode === 'memory' ? 'Memory' : 'Global';
      const fileNote = files.length > 0 ? ` | ${files.length} doc${files.length>1?'s':''}` : '';

      const target = `(${idNote} • ${modeLabel}${fileNote}) I understand your message: "${trimmed}". I will cross-check with any uploaded health documents and maintain contextual reasoning across turns. How else can I help you?`;

      const assistantSeed = { role: 'assistant', content: '' };
      setMessages((prev) => [...prev, assistantSeed]);

      // Streaming typewriter effect
      let i = 0;
      const chunk = 2;
      const timer = setInterval(() => {
        i += chunk;
        const next = target.slice(0, i);
        setMessages((prev) => {
          const copy = [...prev];
          const lastIndex = copy.length - 1;
          if (lastIndex >= 0 && copy[lastIndex].role === 'assistant') {
            copy[lastIndex] = { ...copy[lastIndex], content: next };
          }
          return copy;
        });
        if (i >= target.length) {
          clearInterval(timer);
          speak(target);
        }
      }, 20);
    },
    [files.length, mode, speak, userId]
  );

  const heroProps = useMemo(() => ({ cinema }), [cinema]);

  return (
    <div className={`min-h-screen ${cinema ? 'bg-slate-950' : 'bg-slate-900'} text-white antialiased`}>
      <Hero {...heroProps} />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <section id="controls" className="-mt-10 sm:-mt-12 relative z-10">
          <Controls
            userId={userId}
            onUserIdChange={setUserId}
            mode={mode}
            onModeChange={setMode}
            speakReplies={speakReplies}
            onSpeakToggle={setSpeakReplies}
            cinema={cinema}
            onCinemaToggle={setCinema}
          />
        </section>

        <section id="uploader" className="mt-6">
          <DocumentUploader files={files} onFilesChange={setFiles} />
        </section>

        <section id="chat" className="mt-8 mb-16">
          <Chat messages={messages} onSend={handleSendMessage} />
        </section>
      </main>
    </div>
  );
}
