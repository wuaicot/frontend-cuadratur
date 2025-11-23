import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import AnalysisReview from "./pages/AnalysisReview";
import History from "./pages/History";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow p-4 flex justify-between items-center">
          
          <h1 className="text-lg font-bold"> <span className="border">C</span>UADRATURapp</h1>

          <nav className="flex gap-4 text-sm align-center">
            <a href="/" className="hover:underline">Home</a>
            <a href="/analysis-review" className="hover:underline">Revisión</a>
            <a href="/history" className="hover:underline">Historial</a>
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
