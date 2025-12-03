// src/components/AnalysisResultTable.tsx
import type { AnalysisItem } from "../types/AnalysisItem";

interface Props {
  items: AnalysisItem[];
  onEdit?: (index: number, key: string, value: number) => void;
}

export default function AnalysisResultTable({ items, onEdit }: Props) {
  const handleChange = (
    index: number,
    key: keyof AnalysisItem,
    value: string
  ) => {
    if (!onEdit) return;
    const numeric = Number(value);
    if (!isNaN(numeric)) {
      onEdit(index, key, numeric);
    }
  };

  return (
    <table className="w-full rounded-lg mt-4">
      <thead className="bg-gray-200 text-black">
        <tr>
          <th className="border p-2">Nombre</th>
          <th className="border p-2">Teórico</th>
          <th className="border p-2">Contado</th>
          <th className="border p-2">Diferencia</th>
          <th className="border p-2">Estado</th>
        </tr>
      </thead>

      <tbody>
        {items.map((item, i) => (
          <tr key={i}>
            <td className="border p-2">{item.nombre}</td>

            <td className="border p-2">
              {onEdit ? (
                <input
                  type="number"
                  className="w-full border p-1"
                  value={item.teorico}
                  onChange={(e) =>
                    handleChange(i, "teorico", e.target.value)
                  }
                />
              ) : (
                item.teorico
              )}
            </td>

            <td className="border p-2">
              {onEdit ? (
                <input
                  type="number"
                  className="w-full border p-1"
                  value={item.contado}
                  onChange={(e) =>
                    handleChange(i, "contado", e.target.value)
                  }
                />
              ) : (
                item.contado
              )}
            </td>

            <td className="border p-2">{item.diferencia}</td>
            <td className="border p-2">{item.estado}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
