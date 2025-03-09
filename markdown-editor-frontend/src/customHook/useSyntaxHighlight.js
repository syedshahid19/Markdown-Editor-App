import { useEffect, useRef, useCallback } from "react";
import hljs from "highlight.js";

export default function useSyntaxHighlight(html, previewRef) {
  const highlightedBlocks = useRef(new Set());

  // applyHighlighting as a stable function using useCallback
  const applyHighlighting = useCallback(() => {
    if (!previewRef.current) return;

    const codeBlocks = previewRef.current.querySelectorAll("pre code");

    codeBlocks.forEach((block) => {
      const blockContent = block.textContent;
      const blockId = blockContent.substring(0, 50);

      if (block.classList.contains("hljs") && highlightedBlocks.current.has(blockId)) {
        return;
      }

      try {
        hljs.highlightElement(block);
        highlightedBlocks.current.add(blockId);
      } catch (e) {
        console.error("Error highlighting block:", e);
      }
    });
  }, [previewRef]);

  useEffect(() => {
    if (html) {
      const timer = setTimeout(() => {
        applyHighlighting();
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [html, applyHighlighting]);

  return { applyHighlighting, highlightedBlocks };
}
