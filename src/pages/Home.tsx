// src/pages/Home.tsx
import { useState } from "react";
import FileUploader from "../components/FileUploader";
import AnalysisResultTable from "../components/AnalysisResultTable";
import { useUploadAndAnalyze, type CuadraturaFiles } from "../hooks/useUploadAndAnalyze";
import { useNavigate } from "react-router-dom";
import type { AnalysisItem } from "../types/AnalysisItem";

export default function Home() {
  const navigate = useNavigate();

  const {
    isLoading,
    error,
    result,
    handleUploadAndAnalyze,
  } = useUploadAndAnalyze();

  const [files, setFiles] = useState<CuadraturaFiles>({
    reporteZ: null,
    planillaCaja: null,
    planillaCocina: null,
  });

  const handleFileSelect = (fileType: keyof CuadraturaFiles, file: File | null) => {
    setFiles(prev => ({ ...prev, [fileType]: file }));
  };

  const handleReview = () => {
    if (!result) return;
    navigate("/review", { state: { items: result.items } });
  };

  const canAnalyze = files.reporteZ && files.planillaCaja && files.planillaCocina;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Análisis de Cuadratura</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">1. Reporte Z</label>
          <FileUploader onFileSelect={(file) => handleFileSelect("reporteZ", file)} />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">2. Planilla de Caja</label>
          <FileUploader onFileSelect={(file) => handleFileSelect("planillaCaja", file)} />
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">3. Planilla de Cocina</label>
          <FileUploader onFileSelect={(file) => handleFileSelect("planillaCocina", file)} />
        </div>
      </div>

      <button
        onClick={() => handleUploadAndAnalyze(files)}
        disabled={!canAnalyze || isLoading}
        className="mt-8 w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-md text-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-300"
      >
        {isLoading ? "Procesando..." : "Subir y Analizar"}
      </button>

      {error && (
        <p className="mt-4 text-red-600 font-medium border border-red-300 bg-red-50 p-3 rounded-md">
          {error}
        </p>
      )}

      {result && (
        <div className="mt-8 pt-6 border-t">
          <h3 className="text-2xl font-semibold mb-4 text-gray-800">Resultado del Análisis</h3>
          <AnalysisResultTable items={result.items as AnalysisItem[]} />
          <button
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={handleReview}
          >
            Revisar en Detalle
          </button>
        </div>
      )}
    </div>
  );
}
