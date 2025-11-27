// src/pages/AnalysisReview.tsx
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import AnalysisResultTable from "../components/AnalysisResultTable";

export default function AnalysisReview() {
  const location = useLocation();

  const [items, setItems] = useState(() => {
    if (location.state?.items) {
      return location.state.items;
    }
    const stored = sessionStorage.getItem("analysisResult");
    if (stored) {
      return JSON.parse(stored).items || [];
    }
    return [];
  });

  useEffect(() => {
    if (location.state?.items) {
      setItems(location.state.items);
      sessionStorage.setItem(
        "analysisResult",
        JSON.stringify({ items: location.state.items })
      );
    }
  }, [location.state]);

  const handleEdit = (index: number, key: string, value: number) => {
    const updated = [...items];
    updated[index][key] = value;

    updated[index].diferencia =
      updated[index].contado - updated[index].teorico;

    updated[index].estado =
      updated[index].diferencia === 0
        ? "OK"
        : updated[index].diferencia > 0
        ? "SOBRANTE"
        : "FALTANTE";

    setItems(updated);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Revisión del Análisis</h1>

      <AnalysisResultTable items={items} onEdit={handleEdit} />
    </div>
  );
}
