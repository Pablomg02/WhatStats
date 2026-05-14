import JSZip from 'jszip';
import { useCallback, useRef, useState } from 'react';

interface DropzoneProps {
  onFileSelected: (file: File) => void;
}

async function extractTxtFromZip(zipFile: File): Promise<File> {
  const zip = await JSZip.loadAsync(zipFile);
  const txtEntries = Object.values(zip.files).filter(
    (f) => !f.dir && f.name.toLowerCase().endsWith('.txt'),
  );

  if (txtEntries.length === 0) {
    throw new Error('El archivo .zip no contiene ningún archivo .txt.');
  }
  if (txtEntries.length > 1) {
    throw new Error(
      `El archivo .zip contiene ${txtEntries.length} archivos .txt. Debe contener exactamente uno.`,
    );
  }

  const content = await txtEntries[0].async('blob');
  return new File([content], txtEntries[0].name, { type: 'text/plain' });
}

export function Dropzone({ onFileSelected }: DropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) return;
      const file = files[0];
      const nameLower = file.name.toLowerCase();

      if (nameLower.endsWith('.zip')) {
        try {
          const txtFile = await extractTxtFromZip(file);
          onFileSelected(txtFile);
        } catch (err) {
          alert(err instanceof Error ? err.message : 'Error al procesar el archivo .zip.');
        }
        return;
      }

      if (!nameLower.endsWith('.txt')) {
        alert('Por favor, sube un archivo .txt o .zip exportado de WhatsApp.');
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
          ? 'border-ws-green bg-ws-card'
          : 'border-ws-border bg-ws-surface hover:border-ws-green hover:bg-ws-card'
      }`}
    >
      <div className="text-5xl">📂</div>
      <div className="text-center">
        <div className="text-lg font-semibold text-ws-text">
          Arrastra aquí tu archivo .txt o .zip
        </div>
        <div className="text-sm text-ws-muted">o haz click para seleccionarlo</div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept=".txt,text/plain,.zip,application/zip"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  );
}
