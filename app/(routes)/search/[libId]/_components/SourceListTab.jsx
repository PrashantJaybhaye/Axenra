import Image from "next/image";
import React from "react";

function SourceListTab({ chat }) {
  return (
    <div className="space-y-4 mt-4">
      {chat?.searchResult.slice(0, 10).map((item, index) => (
        <div
          key={index}
          className="bg-zinc-900 rounded-lg p-4 border border-zinc-800 shadow-sm hover:shadow-md transition-all duration-200"
        >
          {/* Header: index, avatar, name */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-bold text-[#8D9191] text-center select-text selection:text-orange-400 min-w-[20px]">
              {index + 1}
            </span>
            <Image
              src={item?.img}
              alt=""
              width={32}
              height={32}
              className="rounded-full border border-zinc-700 bg-zinc-800 flex-shrink-0"
            />
            <div className="flex flex-col min-w-0 flex-1">
              <a
                href={item?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <p className="text-sm font-medium text-zinc-200 truncate select-text selection:text-orange-400 w-full max-w-[60vw] sm:max-w-[300px]">
                  {item?.long_namme || "Unknown Source"}
                </p>
                <p className="text-xs font-medium text-zinc-400 truncate select-text selection:text-orange-400 w-full max-w-[60vw] sm:max-w-[300px]">
                  {item?.url || "Unknown Source"}
                </p>
              </a>
            </div>
          </div>

          {/* Description */}
          <div className="mt-3 space-y-1">
            <div
              className="text-sm text-zinc-100 line-clamp-1 select-text selection:text-orange-400 max-w-full"
              dangerouslySetInnerHTML={{ __html: item?.title }}
            />
            <div
              className="text-xs text-zinc-400 line-clamp-2 select-text selection:text-orange-400 max-w-full"
              dangerouslySetInnerHTML={{ __html: item?.description }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default SourceListTab;
