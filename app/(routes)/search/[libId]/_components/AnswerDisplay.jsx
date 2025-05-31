import React, { useState } from "react";
import SourceList from "./SourceList";
import DisplaySummary from "./DisplaySummary";
import { Copy, ThumbsDown, ThumbsUp } from "lucide-react";

function AnswerDisplay({ chat, loadingSearch }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (chat?.aiResp) {
      await navigator.clipboard.writeText(chat?.aiResp);
      setCopied(true);
      setTimeout(() => setCopied(false), 1000);
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
      <div className="flex flex-wrap justify-end items-center gap-3 mt-4 sm:gap-4 mb-7">
        <div className="relative group inline-block">
          <button
            onClick={handleCopy}
            className="p-2 rounded hover:bg-accent-foreground hover:rounded-full transition "
          >
            <Copy size={14} className="" />
          </button>
          {copied && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 text-xs sm:text-xs bg-accent text-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              <span className="text-green-600 text-xs font-bold">Copied!</span>
            </div>
          )}
        </div>

        <button
          title="Like"
          className="p-2 rounded hover:bg-accent-foreground hover:rounded-full transition"
        >
          {/* Like icon (thumbs up) */}
          <ThumbsUp size={14} />
        </button>
        <button
          title="Dislike"
          className="p-2 rounded hover:bg-accent-foreground hover:rounded-full transition"
        >
          {/* Dislike icon (thumbs down) */}
          <ThumbsDown size={14} />
        </button>
      </div>

    </div>
  );
}

export default AnswerDisplay;
