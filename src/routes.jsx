import { Routes, Route, Navigate } from "react-router-dom";
import LobbyPage from "./pages/lobby";
import Socket from "./pages/Socket";
import Home from "./components/Home/Home"

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Lobby" replace={true} />} />
      <Route path="/Lobby" element={<LobbyPage />} />
      <Route path="/Room/:roomID" element={<Home />} />
    </Routes>
  );
}
