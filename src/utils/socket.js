import io from "socket.io-client";

const WebSocketServerPort = "http://localhost:3001";

const socket = io("http://localhost:3001", {
  transports: ["websocket", "polling"],
  autoConnect: false,
});

export default socket;
