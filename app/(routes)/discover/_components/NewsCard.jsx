import { ImageOff } from "lucide-react";
import React from "react";

function NewsCard({ news }) {
  return (
    <div className="rounded-2xl shadow-lg overflow-hidden bg-[#252626] border border-[#393939] hover:shadow-xl transition-shadow duration-300 flex flex-col w-full max-w-sm sm:max-w-full mx-auto">
      
      {/* Header: Source logo, name, and age */}
      <div className="flex items-center justify-between px-4 pt-4">
        <div className="flex items-center gap-2">
          {news?.profile?.img && (
            <img
              src={news?.profile?.img}
              alt={news?.profile?.name}
              className="w-7 h-7 rounded-full object-cover"
              loading="lazy"
            />
          )}
          <span className="text-gray-400 text-sm font-medium truncate max-w-[150px]">
            {news?.profile?.name || "Unknown Source"}
          </span>
        </div>
        {news?.age && (
          <span className="text-xs text-gray-500">{news?.age}</span>
        )}
      </div>

      {/* News Image */}
      <div
        className="cursor-pointer"
        onClick={() => window.open(news?.url, "_blank")}
      >
        {news?.thumbnail?.original ? (
          <img
            src={news?.thumbnail?.original}
            alt={news?.title}
            width={600}
            height={400}
            className="rounded-2xl w-full h-48 sm:h-56 md:h-48 lg:h-56 object-cover mt-3"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-48 sm:h-56 flex flex-col items-center justify-center text-neutral-500 bg-[#2e2f2f] mt-3 rounded-2xl">
            <ImageOff/>
            <span className="text-sm">No Image Available</span>
          </div>
        )}
      </div>

      {/* News Content */}
      <div className="p-4 flex-grow flex flex-col">
        <h2 className="font-semibold text-lg text-gray-200 line-clamp-1 leading-tight">
          {news?.title}
        </h2>
        <p
          className="text-sm mt-2 text-gray-400 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: news?.description }}
        ></p>
      </div>

      {/* Footer */}
      <div className="px-4 pb-4 mt-auto flex items-center justify-between">
        <a
          href={news?.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-orange-400 text-sm hover:underline text-nowrap"
        >
          Visit Source
        </a>
        {news?.profile?.url && (
          <a
            href={news.profile.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-500 hover:underline text-nowrap"
          >
            {news.profile?.long_name}
          </a>
        )}
      </div>
    </div>
  );
}

export default NewsCard;
