import React, { useEffect, useRef, useState } from 'react';
import { Send, Mic, MicOff } from 'lucide-react';

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
        const text = Array.from(e.results)
          .map((r) => r[0].transcript)
          .join(' ');
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
      try {
        rec.start();
        setRecording(true);
      } catch (e) {
        // ignore multiple start errors
      }
    }
  };

  return (
    <div className="w-full bg-white/5 backdrop-blur rounded-xl border border-white/10 p-4 sm:p-6">
      <div ref={listRef} className="h-[48vh] sm:h-[55vh] overflow-y-auto pr-1 custom-scroll">
        <MessageList messages={messages} />
      </div>

      <div className="mt-4 flex items-end gap-2">
        <button
          onClick={toggleRecording}
          className={`shrink-0 h-10 w-10 rounded-lg border flex items-center justify-center ${
            recording ? 'bg-fuchsia-600 border-fuchsia-400' : 'bg-white/10 border-white/10 hover:bg-white/20'
          }`}
          title={recording ? 'Stop voice input' : 'Start voice input'}
        >
          {recording ? <MicOff size={18} /> : <Mic size={18} />}
        </button>
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
          className="inline-flex items-center gap-2 rounded-lg bg-fuchsia-500 hover:bg-fuchsia-600 transition px-4 py-2 text-sm"
        >
          <Send size={16} /> Send
        </button>
      </div>

      <p className="mt-2 text-xs text-white/60">
        Voice requires a compatible browser (e.g., Chrome). Data shown here is client-side only.
      </p>
    </div>
  );
}

function MessageList({ messages }) {
  return (
    <div className="space-y-3">
      {messages.map((m, idx) => (
        <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          <div
            className={`max-w-[85%] sm:max-w-[70%] rounded-2xl px-4 py-2 text-sm leading-relaxed border ${
              m.role === 'user'
                ? 'bg-fuchsia-600/90 border-fuchsia-400 text-white rounded-br-sm'
                : 'bg-white/5 border-white/10 text-white/90 rounded-bl-sm'
            }`}
          >
            {m.content}
          </div>
        </div>
      ))}
    </div>
  );
}
