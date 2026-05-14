import { useCallback, useRef, useState } from 'react';

interface DropzoneProps {
  onFileSelected: (file: File) => void;
}

export function Dropzone({ onFileSelected }: DropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return;
      const file = files[0];
      if (!file.name.toLowerCase().endsWith('.txt')) {
        alert('Por favor, sube un archivo .txt exportado de WhatsApp.');
        return;
      }
      onFileSelected(file);
    },
    [onFileSelected],
  );

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
      }}
      onClick={() => inputRef.current?.click()}
      className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed p-12 transition ${
        isDragging
          ? 'border-whatsapp-green bg-green-50'
          : 'border-slate-300 bg-white hover:border-whatsapp-teal hover:bg-slate-50'
      }`}
    >
      <div className="text-5xl">📂</div>
      <div className="text-center">
        <div className="text-lg font-semibold text-slate-800">
          Arrastra aquí tu archivo .txt
        </div>
        <div className="text-sm text-slate-500">o haz click para seleccionarlo</div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept=".txt,text/plain"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
