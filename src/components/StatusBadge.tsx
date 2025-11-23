type Props = { estado: "OK" | "FALTANTE" | "SOBRANTE" | "NO_DATA" };

export default function StatusBadge({ estado }: Props) {
  const colors = {
    OK: "bg-green-100 text-green-700",
    FALTANTE: "bg-red-100 text-red-700",
    SOBRANTE: "bg-yellow-100 text-yellow-700",
    NO_DATA: "bg-gray-200 text-gray-600",
  };

  return (
    <span className={`px-2 py-1 rounded-md text-sm font-semibold ${colors[estado]}`}>
      {estado}
    </span>
  );
}
