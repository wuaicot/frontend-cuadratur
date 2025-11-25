import { useState } from "react";
import type { AnalysisItem } from "../types/AnalysisItem";

export interface AnalysisResult {
  fecha: string;
  items: AnalysisItem[];
}

export interface CuadraturaFiles {
  reporteZ: File | null;
  planillaCaja: File | null;
  planillaCocina: File | null;
}

export function useUploadAndAnalyze() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleUploadAndAnalyze = async (files: CuadraturaFiles): Promise<void> => {
    console.log("[HOOK] Iniciando handleUploadAndAnalyze…");

    if (!files.reporteZ || !files.planillaCaja || !files.planillaCocina) {
      console.warn("[HOOK] Faltan uno o más archivos.");
      setError("Debes seleccionar los tres archivos antes de procesar.");
      return;
    }

    console.log("[HOOK] Archivos a enviar:", {
      reporteZ: files.reporteZ.name,
      planillaCaja: files.planillaCaja.name,
      planillaCocina: files.planillaCocina.name,
    });

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("reporteZ", files.reporteZ);
      formData.append("planillaCaja", files.planillaCaja);
      formData.append("planillaCocina", files.planillaCocina);

      console.log("[HOOK] Enviando al backend…");

      const response = await fetch("http://localhost:4000/api/cuadratur/analizar", {
        method: "POST",
        body: formData,
      });

      console.log("[HOOK] Respuesta recibida:", response.status);

      if (!response.ok) {
        let errMsg = "Error procesando los archivos.";

        try {
          const errData = await response.json();
          errMsg = errData.error || errMsg;
        } catch {
          console.warn("[HOOK] Backend devolvió error sin JSON válido.");
        }

        throw new Error(errMsg);
      }

      let data: unknown = null;

      try {
        data = await response.json();
      } catch {
        throw new Error("El backend devolvió una respuesta inválida.");
      }

      console.log("[HOOK] Payload recibido:", data);

      if (
        !data ||
        typeof data !== "object" ||
        !("fecha" in data) ||
        !("items" in data)
      ) {
        console.error("[HOOK] Respuesta inesperada:", data);
        throw new Error("Estructura inesperada en la respuesta del análisis.");
      }

      const validData = data as AnalysisResult;
      console.log("[HOOK] Resultado final validado:", validData);

      setResult(validData);

    } catch (err) {
      console.error("[HOOK] ERROR:", err);
      setError(err instanceof Error ? err.message : "Error inesperado.");
    } finally {
      setIsLoading(false);
      console.log("[HOOK] Finalizando proceso.");
    }
  };

  return {
    isLoading,
    error,
    result,
    handleUploadAndAnalyze,
  };
}
