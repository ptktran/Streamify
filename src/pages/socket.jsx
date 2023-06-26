import io from "socket.io-client";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { useEffect } from "react";

const socket = io("http://localhost:3001", {
  transports: ["websocket", "polling"],
  autoConnect: false,
});

export default function Socket() {
  const { roomID } = useParams();

  const { data, isLoading } = useQuery({
    queryFn: async () => {
      const res = await axios.get(`/api/room/${roomID}`);
      return res.data;
    },
    onSuccess: () => {
      socket.connect();
      socket.emit("join_room", roomID);
    },
    onError: () => {
      console.log("Error");
    },
    retry: 0,
    refetchOnWindowFocus: false,
  });

  const sendMessage = () => {
    try {
      if (!socket.connected) throw new Error("Socket not connected");

      socket.emit("send_message", { message: `hello socket from ${roomID}` });
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <h1>Currently in room {roomID}</h1>
      <button className="bg-red-main text-gray-text" onClick={sendMessage}>
        Say hello to socket
      </button>
      <div>{JSON.stringify(data)}</div>
    </div>
  );
}
