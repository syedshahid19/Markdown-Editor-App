import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("https://markdown-editor-app.onrender.com");

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
