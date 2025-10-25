import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Send, Mic, MicOff, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Chat({ messages, onSend }) {
  const [input, setInput] = useState('');
  const [recording, setRecording] = useState(false);
  const listRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages.length]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'en-US';

      rec.onresult = (e) => {
        const text = Array.from(e.results).map((r) => r[0].transcript).join(' ');
        setInput((prev) => (prev ? prev + ' ' + text : text));
      };
      rec.onend = () => setRecording(false);
      rec.onerror = () => setRecording(false);

      recognitionRef.current = rec;
    }
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleRecording = () => {
    const rec = recognitionRef.current;
    if (!rec) return;
    if (recording) {
      rec.stop();
      setRecording(false);
    } else {
      try { rec.start(); setRecording(true); } catch {}
    }
  };

  return (
    <div className="w-full bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-3 text-white/70 text-xs">
        <Bot size={14} /> Secure, on-device UI demo. Voice input requires a compatible browser.
      </div>

      <div ref={listRef} className="h-[48vh] sm:h-[55vh] overflow-y-auto pr-1 custom-scroll">
        <MessageList messages={messages} />
      </div>

      <div className="mt-4 flex items-end gap-2">
        <VoiceButton recording={recording} onClick={toggleRecording} />
        <div className="flex-1 rounded-lg bg-white/5 border border-white/10 px-3 py-2">
          <textarea
            rows={2}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message or use voice..."
            className="w-full bg-transparent outline-none text-sm resize-none placeholder:text-white/50"
          />
        </div>
        <button
          onClick={handleSend}
          className="inline-flex items-center gap-2 rounded-lg bg-fuchsia-500 hover:bg-fuchsia-600 transition px-4 py-2 text-sm shadow-[0_0_20px_rgba(217,70,239,0.35)]"
        >
          <Send size={16} /> Send
        </button>
      </div>

      <p className="mt-2 text-xs text-white/60">Shift+Enter for new line • Enter to send</p>
    </div>
  );
}

function MessageList({ messages }) {
  return (
    <div className="space-y-3">
      <AnimatePresence initial={false}>
        {messages.map((m, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <Bubble role={m.role}>
              {m.content}
            </Bubble>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function Bubble({ role, children }) {
  const isUser = role === 'user';
  return (
    <div
      className={`max-w-[85%] sm:max-w-[70%] rounded-2xl px-4 py-2 text-sm leading-relaxed border relative ${
        isUser
          ? 'bg-fuchsia-600/90 border-fuchsia-400 text-white rounded-br-sm'
          : 'bg-white/5 border-white/10 text-white/90 rounded-bl-sm'
      }`}
    >
      {children}
    </div>
  );
}

function VoiceButton({ recording, onClick }) {
  const bars = useMemo(() => Array.from({ length: 10 }), []);
  return (
    <button
      onClick={onClick}
      className={`relative shrink-0 h-12 w-12 rounded-xl border flex items-center justify-center overflow-hidden ${
        recording ? 'bg-fuchsia-600 border-fuchsia-400' : 'bg-white/10 border-white/10 hover:bg-white/20'
      }`}
      title={recording ? 'Stop voice input' : 'Start voice input'}
    >
      <AnimatePresence>
        {recording ? (
          <motion.div
            key="viz"
            className="absolute inset-0 flex items-end justify-center gap-[2px] px-2 pb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {bars.map((_, i) => (
              <motion.span
                key={i}
                className="w-[3px] rounded-full bg-white"
                animate={{ height: [6, 18, 8, 16, 10, 14, 6] }}
                transition={{ duration: 1 + (i % 3) * 0.3, repeat: Infinity, delay: i * 0.05, ease: 'easeInOut' }}
                style={{ height: 8 }}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div key="mic" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <Mic size={18} />
          </motion.div>
        )}
      </AnimatePresence>
      {recording && (
        <div className="absolute inset-0 -z-10">
          <motion.span
            className="absolute inset-0 rounded-xl"
            animate={{ boxShadow: ['0 0 0 0 rgba(217,70,239,0.0)','0 0 0 12px rgba(217,70,239,0.18)','0 0 0 0 rgba(217,70,239,0.0)'] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </div>
      )}
      {!recording && <MicOff size={0} className="opacity-0" />}
    </button>
  );
}
