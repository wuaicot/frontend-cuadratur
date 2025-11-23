import { useEffect, useState } from "react";
import axios from "axios";

interface HistoryRecord {
  fecha: string;
  ok: number;
  sobrantes: number;
  faltantes: number;
}

export default function History() {
  const [list, setList] = useState<HistoryRecord[]>([]);

  useEffect(() => {
    axios
      .get<HistoryRecord[]>("http://localhost:3000/api/cuadratur/history")
      .then((res) => setList(res.data));
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Historial de análisis</h1>

      <table className="w-full border rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3">Fecha</th>
            <th className="p-3">OK</th>
            <th className="p-3">Sobrantes</th>
            <th className="p-3">Faltantes</th>
          </tr>
        </thead>

        <tbody>
          {list.map((h, i) => (
            <tr key={i} className="border-b last:border-none">
              <td className="p-3">{new Date(h.fecha).toLocaleString()}</td>
              <td className="p-3">{h.ok}</td>
              <td className="p-3">{h.sobrantes}</td>
              <td className="p-3">{h.faltantes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
