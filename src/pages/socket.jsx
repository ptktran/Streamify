import io from "socket.io-client";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSessionStore } from "../utils/store";

const socket = io("http://localhost:3001", {
  transports: ["websocket", "polling"],
  autoConnect: false,
});

export default function Socket() {
  const { roomID } = useParams();
  const { Name } = useSessionStore();
  const [chat, setChat] = useState();
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const { isLoading } = useQuery({
    queryFn: async () => {
      const res = await axios.get(`/api/room/${roomID}`);
      return res.data;
    },
    onSuccess: () => {
      socket.connect();
      socket.emit("join_room", { roomID, name });
    },
    onError: () => {
      console.log("Error");
    },
    retry: 0,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    setName(Name);
  }, []);

  useEffect(() => {
    function onReceiveMessageEvent(chat) {
      console.log(chat);
      setChat(chat);
    }
    socket.on("receive_message", onReceiveMessageEvent);

    return () => {
      socket.off("receive_message", onReceiveMessageEvent);
    };
  }, []);

  const sendMessage = () => {
    try {
      if (!socket.connected) throw new Error("Socket not connected");

      socket.emit("send_message", {
        roomID,
        message,
      });
      setMessage("");
    } catch (e) {
      console.log(e.message);
    }
  };

  const renderChat = () => {
    if (!chat) return;

    return chat.map((value, index) => (
      <p key={index}>
        {value.sender} : {value.message}
      </p>
    ));
  };

  return (
    <div className="flex justify-center items-center">
      <h1>Currently in room {roomID}</h1>
      <input
        className="bg-gray-comps text-white"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="bg-red-main text-gray-text" onClick={sendMessage}>
        Say hello to socket
      </button>
      <div>{renderChat()}</div>
    </div>
  );
}
