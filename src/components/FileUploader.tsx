import { useRef } from "react";

interface Props {
  onFileSelect: (file: File | null) => void;
}

export default function FileUploader({ onFileSelect }: Props) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;

    console.log("[FileUploader] Archivo seleccionado:", file?.name);

    onFileSelect(file);
  };

  return (
    <div className="flex flex-col gap-2 ">
      <input
        type="file"
        accept=".xlsx, .xls, image/jpeg, image/png"
        ref={fileInputRef}
        onChange={handleChange}
        className="border p-2 rounded cursor-pointer hover:border-blue-500 transition-colors duration-200"
      />
    </div>
  );
}
