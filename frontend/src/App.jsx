import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Evento from "./pages/Evento";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/evento/:id" element={<Evento />} />
      </Routes>
    </BrowserRouter>
  );
}
