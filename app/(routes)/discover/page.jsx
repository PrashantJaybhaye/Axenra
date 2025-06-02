"use client";
import axios from "axios";
import { Cpu, Drama, IndianRupee, Loader2Icon, Medal, Palette, Star } from "lucide-react";
import React, { useEffect, useState } from "react";
import { SEARCH_RESULT } from "../../../services/Shared";
import NewsCard from "./_components/NewsCard";
import { UserButton, useUser } from "@clerk/nextjs"; // Add this import if using Clerk

const options = [
  {
    title: "Top",
    icon: Star,
  },
  {
    title: "Tech & Science",
    icon: Cpu,
  },
  {
    title: "Finance",
    icon: IndianRupee,
  },
  {
    title: "Arts & Culture",
    icon: Palette,
  },
  {
    title: "Sports",
    icon: Medal,
  },
  {
    title: "Entertainment",
    icon: Drama,
  },
];

function Discover() {
  const [selectedOption, setSelectedOption] = useState("Top");
  const [latestNews, setLatestNews] = useState(SEARCH_RESULT?.web?.results);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    selectedOption && GetSearchResult();
  }, [selectedOption]);

  const GetSearchResult = async () => {
    setLoading(true);
    try {
      const result = await axios.post("/api/brave-search-api", {
        searchInput: selectedOption + "Latest News & Updates",
        searchType: "Search",
      });
      // setLatestNews(result.data);
    } catch (e) {
      // Optionally handle error
    }
    setLoading(false);
  };

  // Skeleton Card Component
  const SkeletonCard = () => (
    <div className="rounded-2xl shadow-lg overflow-hidden bg-[#232323] border border-[#393939] animate-pulse flex flex-col w-full max-w-sm sm:max-w-full mx-auto min-h-[320px]">
      <div className="flex items-center gap-2 px-4 pt-4">
        <div className="w-7 h-7 rounded-full bg-neutral-700" />
        <div className="h-4 w-24 bg-neutral-700 rounded" />
      </div>
      <div className="w-full h-48 sm:h-40 md:h-48 lg:h-56 bg-neutral-800 mt-3 rounded-2xl" />
      <div className="p-4 flex-grow flex flex-col">
        <div className="h-5 w-3/4 bg-neutral-700 rounded mb-2" />
        <div className="h-3 w-full bg-neutral-700 rounded mb-1" />
        <div className="h-3 w-5/6 bg-neutral-700 rounded mb-1" />
        <div className="h-3 w-2/3 bg-neutral-700 rounded" />
      </div>
      <div className="px-4 pb-4 mt-auto flex items-center justify-between">
        <div className="h-4 w-20 bg-neutral-700 rounded" />
        <div className="h-3 w-12 bg-neutral-700 rounded" />
      </div>
    </div>
  );

  return (
    <div className="mt-15 px-3 sm:px-6 md:px-12 lg:px-32 xl:px-52 max-sm:-ml-12 text-white">
      {/* Absolute Top Right User Info with Background Header */}
      <div className="fixed top-2 right-2 z-50">
        <div className="flex items-center gap-3 bg-neutral-900/80 border border-neutral-700 shadow-lg rounded-xl px-4 py-2 backdrop-blur-md">
          {user === undefined ? (
            <div  className="animate-spin"><Loader2Icon/></div>
          ) : (
            <span className="text-base font-bold text-gray-400 truncate max-w-[120px]">
              {user?.username || user?.fullName}
            </span>
          )}
          <UserButton
            appearance={{
              elements: {
                rootBox: "flex items-center gap-3",
                userButtonAvatarBox:
                  "h-10 w-10 rounded-full ring-2 ring-accent ring-offset-2 ring-offset-neutral-900",
                userButtonPopoverCard:
                  "bg-neutral-900 border border-neutral-700 shadow-lg rounded-lg p-2 w-48",
                userButtonPopoverActionButton:
                  "text-sm text-white hover:bg-neutral-800 px-4 py-2 rounded-md text-left w-full transition-colors",
                userButtonPopoverActionButton__signOut:
                  "text-red-500 hover:text-red-600 font-semibold",
              },
            }}
          />
        </div>
      </div>

      {/* Heading */}
      <div className="mb-6">
        <h2 className="font-semibold text-3xl flex items-center gap-3">
          _Discover
        </h2>
      </div>

      {/* Category Tabs */}
      <div className="relative">
        <div
          className={`
        flex flex-wrap gap-3 pb-3 
        sm:flex-nowrap sm:overflow-x-auto sm:scroll-smooth sm:no-scrollbar
      `}
        >
          {options.map((item, index) => {
            const isActive = selectedOption === item.title;

            return (
              <button
                key={index}
                onClick={() => setSelectedOption(item.title)}
                className={`flex items-center gap-2 px-4 py-1.5 rounded-full shrink-0 transition-all duration-200 cursor-pointer text-sm font-medium border border-[#3a3a3a]/40 backdrop-blur-md whitespace-nowrap ${
                  isActive
                    ? "bg-[#331B12] border-1 border-primary text-primary shadow-md"
                    : "hover:bg-[#2b2b2b]/60 text-gray-300"
                }`}
              >
                <item.icon
                  size={18}
                  className={isActive ? "text-primary" : "text-gray-400"}
                />
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* News Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
        {(loading || !latestNews) && (
          <>
            {[...Array(4)].map((_, i) => (
              <div key={i} className={i % 4 === 0 ? "col-span-full" : ""}>
                <SkeletonCard />
              </div>
            ))}
          </>
        )}
        {!loading && latestNews?.map((news, index) => {
          // 0-based index: first card full width, next 3 in 3 columns, repeat
          const mod = index % 4;
          return (
            <div key={index} className={mod === 0 ? "col-span-full" : ""}>
              <NewsCard news={news} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Discover;
