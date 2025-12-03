import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import AnalysisReview from "./pages/AnalysisReview";
import History from "./pages/History";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen ">
        <header className=" shadow p-4 flex justify-between items-center">
          <h1 className="mt-8 text-sm">
            <span className="border">C</span>
            <span className="text-[0.6em]">UADRATUR</span>
          </h1>
          <p className="border mt-12 ml-1 pl-1 pr-1">Obelisco</p>

          <nav className="flex text-sm align-center mt-8">
            <a href="/" className="hover:underline">
              Home
            </a>
            <a href="/analysis-review" className="hover:underline">
              Revisión
            </a>
            <a href="/history" className="hover:underline">
              Historial
            </a>
          </nav>
        </header>

        <main className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analysis-review" element={<AnalysisReview />} />
            <Route path="/history" element={<History />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
