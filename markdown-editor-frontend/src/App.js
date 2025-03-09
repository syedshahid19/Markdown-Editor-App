import { useRef } from "react";
import "./App.css";
import DOMPurify from "dompurify";
import Panel from "./components/Panel";
import usePersistentState from "./customHook/usePersistentState";
import useWebSocket from "./customHook/useWebSocket";
import useSyntaxHighlight from "./customHook/useSyntaxHighlight";
import useMutationObserver from "./customHook/useMutationObserver";
import "highlight.js/styles/github-dark.css"; // Highlight.js Theme
import { toast } from "react-hot-toast";

export default function App() {
  const [markdown, setMarkdown] = usePersistentState("markdown", "");
  const [html, setHtml] = usePersistentState("html", "");
  const previewRef = useRef(null);

  console.log("html converted code", html);

  // WebSocket Hook
  const socket = useWebSocket(setHtml);

  // Highlighting Hook
  const { applyHighlighting, highlightedBlocks } = useSyntaxHighlight(
    html,
    previewRef
  );

  useMutationObserver(previewRef, applyHighlighting);

  // Handle Markdown input changes
  const handleChange = (e) => {
    const text = e.target.value;
    setMarkdown(text);
    localStorage.setItem("markdown", text);

    // If text is empty, HTML preview is also cleared
    if (text.trim() === "") {
      setHtml("");
      localStorage.removeItem("html");
      highlightedBlocks.current.clear();
    }

    // Emit to Socket.io for real-time sync
    socket.emit("message", JSON.stringify({ event: "markdown", data: text }));
  };

  // Clearing both Markdown input and HTML preview
  function handleClear() {
    if (!markdown && !html) {
      toast.error("Nothing to clear!");
      return;
    }

    setMarkdown("");
    setHtml("");
    localStorage.removeItem("markdown");
    localStorage.removeItem("html");

    if (highlightedBlocks?.current) {
      highlightedBlocks.current.clear();
    }

    toast.success("Data cleared successfully!");
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header Section */}
      <header className="header bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg p-3 mb-5">
        <div className="flex justify-between items-center max-w-6xl mx-auto px-4">
          <h1 className="text-lg sm:text-2xl font-bold text-white tracking-wide">
            Markdown Editor
          </h1>
          <button
            onClick={handleClear}
            className="cursor-pointer border border-white/30 shadow-sm font-medium rounded-md text-white hover:bg-white/10 bg-white/5 py-2 px-4 text-xs sm:text-sm transition-all duration-200 ease-in-out"
          >
            Clear All
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 p-4 sm:p-8 flex-grow mx-auto w-full overflow-auto">
        {/* Markdown Input Area */}
        <Panel title="Markdown">
          <textarea
            className="w-full p-3 outline-slate-600 border border-gray-700 resize-none h-[369px] sm:h-[469px]"
            placeholder="Type Markdown..."
            value={markdown}
            onChange={handleChange}
          />
        </Panel>

        {/* Live Preview Area */}
        <Panel title="Live Preview">
          <div
            ref={previewRef}
            className="prose max-w-none p-4 sm:p-8 overflow-auto h-full preview-panel"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
          />
        </Panel>
      </div>
    </div>
  );
}
