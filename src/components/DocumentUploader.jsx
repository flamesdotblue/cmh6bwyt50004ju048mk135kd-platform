import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Upload, File, Image } from 'lucide-react';

export default function DocumentUploader({ files, onFilesChange }) {
  const inputRef = useRef(null);
  const [drag, setDrag] = useState(false);

  const handleSelect = (list) => {
    const selected = Array.from(list || []);
    if (selected.length === 0) return;
    const map = new Map();
    [...files, ...selected].forEach((f) => map.set(`${f.name}-${f.size}-${f.lastModified}`, f));
    onFilesChange(Array.from(map.values()));
  };

  const onInputChange = (e) => handleSelect(e.target.files);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDrag(false);
    handleSelect(e.dataTransfer?.files);
  }, [files]);

  const previews = useMemo(() => {
    return files.slice(0, 6).map((f) => ({
      key: `${f.name}-${f.size}-${f.lastModified}`,
      name: f.name,
      size: f.size,
      type: f.type,
      url: f.type.startsWith('image/') ? URL.createObjectURL(f) : null,
    }));
  }, [files]);

  return (
    <div className="w-full bg-white/5 backdrop-blur rounded-2xl border border-white/10 p-4 sm:p-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h3 className="text-lg font-medium">Upload Medical Documents</h3>
          <p className="text-sm text-white/70">Drag & drop or click. PDF, images, or text files are supported.</p>
        </div>
        <div>
          <input
            ref={inputRef}
            type="file"
            multiple
            className="hidden"
            onChange={onInputChange}
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

      <div
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={onDrop}
        className={`mt-4 rounded-xl border-2 border-dashed p-6 transition ${drag ? 'border-fuchsia-500 bg-fuchsia-500/10' : 'border-white/10 bg-white/5'}`}
      >
        <p className="text-sm text-white/70">Drop files here to add them as context for your conversation.</p>
      </div>

      {files.length > 0 && (
        <div className="mt-4">
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {previews.map((p) => (
              <li key={p.key} className="group flex items-center gap-3 rounded-lg bg-black/20 border border-white/10 px-3 py-2">
                <div className="relative h-10 w-10 overflow-hidden rounded-md border border-white/10 bg-white/5 flex items-center justify-center">
                  {p.url ? (
                    <img src={p.url} alt={p.name} className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-white/70">{p.type.includes('image') ? <Image size={16} /> : <File size={16} />}</span>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm">{p.name}</p>
                  <p className="text-xs text-white/60">{formatSize(p.size)}</p>
                </div>
              </li>
            ))}
          </ul>
          {files.length > 6 && (
            <p className="mt-2 text-xs text-white/60">+{files.length - 6} more</p>
          )}
        </div>
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
