import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

export default function useWebSocket(setHtml) {
  useEffect(() => {
    const handleMarkdownUpdate = (data) => {
      setHtml(data);
      localStorage.setItem("html", data);
    };

    socket.on("markdownUpdate", handleMarkdownUpdate);
    return () => socket.off("markdownUpdate", handleMarkdownUpdate);
  }, [setHtml]);

  return socket;
}
