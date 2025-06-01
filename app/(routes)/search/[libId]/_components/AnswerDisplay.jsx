import React, { useState } from "react";
import SourceList from "./SourceList";
import DisplaySummary from "./DisplaySummary";
import { Copy, ThumbsDown, ThumbsUp, Check } from "lucide-react";

function AnswerDisplay({ chat, loadingSearch }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
  if (chat?.aiResp && navigator?.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(chat.aiResp);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
    } catch (err) {
      console.error("Clipboard copy failed:", err);
    }
  } else {
    console.warn("Clipboard API is not supported on this device or context.");
    alert("Copy not supported on this device.");
  }
};

  return (
    <div>
      <SourceList
        webResult={chat?.searchResult}
        loadingSearch={loadingSearch}
      />
      <DisplaySummary aiResp={chat?.aiResp} />

      {/* Bottom Data */}
      <div className="flex flex-wrap justify-end items-center gap-3 sm:mt-6 mt-9 mx-6 sm:gap-4 mb-4">
        <div className="relative group inline-block">
          <button
            onClick={handleCopy}
            className="p-2 rounded-full hover:bg-accent-foreground hover:rounded-full transition "
          >
            {copied ? (
              <Check size={14} className="text-orange-600" />
            ) : (
              <Copy size={14} className="text-[#8D9191]"/>
            )}
          </button>
          <div
            className={`absolute bottom-full left-1/2 -translate-x-1/2 sm:mb-2 w-max px-2 py-1 text-xs sm:text-xs bg-accent text-white rounded shadow-lg pointer-events-none
              transition-all duration-300
              ${copied
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2"
              }
            `}
          >
            <span className="text-orange-600 text-xs font-bold">Copied!</span>
          </div>
        </div>

        <button
          title="Like"
          className="p-2 rounded-full hover:bg-accent-foreground hover:rounded-full transition"
        >
          {/* Like icon (thumbs up) */}
          <ThumbsUp size={14} className="text-[#8D9191]" />
        </button>
        <button
          title="Dislike"
          className="p-2 rounded-full hover:bg-accent-foreground hover:rounded-full transition"
        >
          {/* Dislike icon (thumbs down) */}
          <ThumbsDown size={14} className="text-[#8D9191]" />
        </button>
      </div>
    </div>
  );
}

export default AnswerDisplay;
