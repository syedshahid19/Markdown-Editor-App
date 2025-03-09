import { useEffect } from "react";

export default function useMutationObserver(previewRef, applyHighlighting) {
  useEffect(() => {
    if (!previewRef.current) return;

    const observer = new MutationObserver((mutations) => {
      let hasNewCodeBlocks = false;

      mutations.forEach((mutation) => {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach((node) => {
            if (node.querySelectorAll) {
              const codeBlocks = node.querySelectorAll("pre code");
              if (codeBlocks.length > 0) {
                hasNewCodeBlocks = true;
              }
            }
          });
        }
      });

      if (hasNewCodeBlocks) {
        applyHighlighting();
      }
    });

    observer.observe(previewRef.current, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, [previewRef, applyHighlighting]);
}
