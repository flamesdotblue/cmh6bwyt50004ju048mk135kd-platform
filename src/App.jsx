import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import LayoutHeader from './components/LayoutHeader';
import ControlPanel from './components/ControlPanel';
import DocumentUploader from './components/DocumentUploader';
import ChatArea from './components/ChatArea';

export default function App() {
  // Core state
  const [userId, setUserId] = useState('');
  const [mode, setMode] = useState('session'); // session | memory | global
  const [files, setFiles] = useState([]);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Welcome to Vadarth — your ultra-intuitive AI Health Assistant. Set your mode, upload docs, and talk naturally.' },
  ]);

  // Experience toggles
  const [speakReplies, setSpeakReplies] = useState(true);
  const [cinema, setCinema] = useState(true);

  // Speech synthesis for assistant replies
  const synthRef = useRef(typeof window !== 'undefined' ? window.speechSynthesis : null);
  useEffect(() => () => { try { synthRef.current?.cancel(); } catch {} }, []);

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

  // Simulated assistant streaming reply (replace with API later)
  const handleSendMessage = useCallback(
    async (text) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      const userMsg = { role: 'user', content: trimmed };
      setMessages((prev) => [...prev, userMsg]);

      const idNote = userId ? `User:${userId}` : 'Guest';
      const modeLabel = mode === 'session' ? 'Session' : mode === 'memory' ? 'Memory' : 'Global';
      const fileNote = files.length > 0 ? ` | ${files.length} doc${files.length>1?'s':''}` : '';

      const target = `(${idNote} • ${modeLabel}${fileNote}) I understand your message: "${trimmed}". I will cross-check with any uploaded health documents and maintain contextual reasoning across turns. How else can I help you?`;

      const assistantSeed = { role: 'assistant', content: '' };
      setMessages((prev) => [...prev, assistantSeed]);

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
      }, 18);
    },
    [files.length, mode, speak, userId]
  );

  const layoutClass = useMemo(() => (
    cinema
      ? 'min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white'
      : 'min-h-screen bg-slate-900 text-white'
  ), [cinema]);

  return (
    <div className={`${layoutClass} antialiased`}> 
      <LayoutHeader
        cinema={cinema}
        onCinemaToggle={setCinema}
        speakReplies={speakReplies}
        onSpeakToggle={setSpeakReplies}
      />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mt-6">
          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-6 self-start">
            <ControlPanel
              userId={userId}
              onUserIdChange={setUserId}
              mode={mode}
              onModeChange={setMode}
            />
            <DocumentUploader files={files} onFilesChange={setFiles} />
          </aside>

          {/* Main chat area */}
          <section className="lg:col-span-8">
            <ChatArea messages={messages} onSend={handleSendMessage} />
          </section>
        </div>
      </main>
    </div>
  );
}
