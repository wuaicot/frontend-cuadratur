// src/components/AnalysisResultTable.tsx
import type { AnalysisItem } from "../types/AnalysisItem";

interface Props {
  items: AnalysisItem[];
  onEdit?: () => void;
}

export default function AnalysisResultTable({ items }: Props) {
  return (
    <table className="w-full border mt-4">
      <thead className="bg-gray-200">
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
            <td className="border p-2">{item.teorico}</td>
            <td className="border p-2">{item.contado}</td>
            <td className="border p-2">{item.diferencia}</td>
            <td className="border p-2">{item.estado}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
