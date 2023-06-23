import { Routes, Route } from "react-router-dom";
import LobbyPage from "./pages/lobby";
import Socket from "./pages/socket";

export default function Router() {
  return (
    <Routes>
      <Route path="/Lobby" element={<LobbyPage />} />
      <Route path="/Room/:roomID" element={<Socket />} />
    </Routes>
  );
}
