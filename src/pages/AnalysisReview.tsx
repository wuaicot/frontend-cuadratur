import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import AnalysisResultTable from "../components/AnalysisResultTable";

export default function AnalysisReview() {
  const location = useLocation();

  const [items, setItems] = useState(() => {
    if (location.state?.items) {
      return location.state.items;
    }
    const storedResult = sessionStorage.getItem("analysisResult");
    if (storedResult) {
      return JSON.parse(storedResult).items || [];
    }
    return [];
  });

  useEffect(() => {
    // This effect ensures that if we navigate to this page with new state, it updates.
    // And it preserves the sessionStorage logic as a fallback.
    if (location.state?.items) {
      setItems(location.state.items);
      // Optionally, update sessionStorage as well
      sessionStorage.setItem("analysisResult", JSON.stringify({ items: location.state.items }));
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
