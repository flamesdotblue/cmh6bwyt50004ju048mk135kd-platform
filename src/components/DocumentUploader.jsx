import React, { useRef } from 'react';
import { Upload, File } from 'lucide-react';

export default function DocumentUploader({ files, onFilesChange }) {
  const inputRef = useRef(null);

  const handleSelect = (e) => {
    const selected = Array.from(e.target.files || []);
    if (selected.length === 0) return;
    // Keep existing and new, avoid duplicates by name+size
    const map = new Map();
    [...files, ...selected].forEach((f) => map.set(`${f.name}-${f.size}`, f));
    onFilesChange(Array.from(map.values()));
  };

  return (
    <div className="w-full bg-white/5 backdrop-blur rounded-xl border border-white/10 p-4 sm:p-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h3 className="text-lg font-medium">Upload Medical Documents</h3>
          <p className="text-sm text-white/70">PDF, images, or text files. They will be used as context during chat.</p>
        </div>
        <div>
          <input
            ref={inputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleSelect}
            accept=".pdf,.txt,.doc,.docx,.png,.jpg,.jpeg"
          />
          <button
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-md bg-white/10 hover:bg-white/20 border border-white/10 px-4 py-2 text-sm"
          >
            <Upload size={16} /> Select Files
          </button>
        </div>
      </div>

      {files.length > 0 && (
        <ul className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {files.map((f) => (
            <li key={`${f.name}-${f.size}`} className="flex items-center gap-3 rounded-lg bg-black/20 border border-white/10 px-3 py-2">
              <File size={16} className="text-fuchsia-300" />
              <div className="min-w-0">
                <p className="truncate text-sm">{f.name}</p>
                <p className="text-xs text-white/60">{formatSize(f.size)}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(1)} MB`;
}
