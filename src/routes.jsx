import { Routes, Route, Navigate } from "react-router-dom";
import Connect from "./pages/Connect";
import Home from "./pages/Home";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Connect" replace={true} />} />
      <Route path="/Connect" element={<Connect />} />
      <Route path="/Room/:roomID" element={<Home />} />
    </Routes>
  );
}
