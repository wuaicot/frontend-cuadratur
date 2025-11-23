import { Outlet, Link } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b shadow-sm p-4 flex justify-between items-center">
        <h1 className="font-bold text-xl">Cuadratur</h1>
        <nav className="flex gap-4">
          <Link to="/" className="hover:underline">Inicio</Link>
          <Link to="/history" className="hover:underline">Historial</Link>
        </nav>
      </header>

      <main className="p-6 max-w-5xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
