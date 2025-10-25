import React, { useState, useCallback } from 'react';
import Hero from './components/Hero';
import Controls from './components/Controls';
import DocumentUploader from './components/DocumentUploader';
import Chat from './components/Chat';

export default function App() {
  const [userId, setUserId] = useState('');
  const [mode, setMode] = useState('session'); // session | memory | global
  const [files, setFiles] = useState([]);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am your Vadarth Health Assistant. How can I help you today?' },
  ]);

  const handleSendMessage = useCallback(
    (text) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      const nextMessages = [...messages, { role: 'user', content: trimmed }];
      setMessages(nextMessages);

      // Simulated assistant reply
      const fileNote = files.length > 0 ? ` I also have ${files.length} document(s) available for context.` : '';
      const idNote = userId ? ` (User ID: ${userId})` : '';
      const modeLabel = mode === 'session' ? 'Session' : mode === 'memory' ? 'Memory' : 'Global';
      const reply = `Under ${modeLabel} mode${idNote}, I received: "${trimmed}".${fileNote}`;

      setTimeout(() => {
        setMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
      }, 500);
    },
    [messages, files, userId, mode]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <Hero />

      <main className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <section id="controls" className="mt-8">
          <Controls userId={userId} onUserIdChange={setUserId} mode={mode} onModeChange={setMode} />
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
