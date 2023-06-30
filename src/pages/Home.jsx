import React, { useState, useEffect } from "react";
import VideoBox from "../components/VideoBox/VideoBox";
import NavBar from "../components/NavBar/NavBar";
import socket from "../utils/socket";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useSessionStore } from "../utils/store";
import ChatBox from "../components/ChatBox/ChatBox";
import axios from "axios";

export default function Home() {
  const { roomID } = useParams();
  const { Name } = useSessionStore();
  const [chat, setChat] = useState();
  const [name, setName] = useState("");
  const { isLoading } = useQuery({
    queryFn: async () => {
      const res = await axios.get(`/api/room/${roomID}`);
      return res.data;
    },
    onSuccess: () => {
      try {
        socket.connect();
        socket.emit("join_room", { roomID, name });
      } catch (e) {
        console.log(e);
      }
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
      setChat(chat);
    }
    socket.on("receive_message", onReceiveMessageEvent);

    return () => {
      socket.off("receive_message", onReceiveMessageEvent);
      socket.emit("leave_room", roomID, (response) => {
        console.log(JSON.stringify(response));
      });
      socket.disconnect();
    };
  }, []);

  const sendMessage = (message) => {
    try {
      if (!socket.connected) throw new Error("Socket not connected");

      socket.emit("send_message", {
        roomID,
        message,
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      <main className="bg-gray-bg grid grid-cols-5 h-screen">
        <div className="col-span-4 flex flex-col gap-y-2 p-2 pr-0">
          <div className="h-[7%]">
            <NavBar />
          </div>
          <div className="h-[93%]">
            <VideoBox />
          </div>
        </div>
        <div className="col-span-1 h-screen p-2">
          <ChatBox chat={chat} sendMessage={sendMessage} sender={name} />
        </div>
      </main>
    </>
  );
}
