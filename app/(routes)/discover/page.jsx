"use client";
import axios from "axios";
import {
  ArrowBigRightDash,
  Cpu,
  Drama,
  Globe2,
  IndianRupee,
  Medal,
  Palette,
  Star,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { SEARCH_RESULT } from "../../../services/Shared";
import NewsCard from "./_components/NewsCard";

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

  useEffect(() => {
    selectedOption && GetSearchResult();
  }, [selectedOption]);

  const GetSearchResult = async () => {
    const result = await axios.post("/api/brave-search-api", {
      searchInput: selectedOption + "Latest News & Updates",
      searchType: "Search",
    });
    console.log(result.data);
    // setLatestNews(result.data);
  };

  return (
    <div className="mt-15 px-3 sm:px-6 md:px-12 lg:px-32 xl:px-52 max-sm:-ml-12 text-white">
      {/* Heading */}
      <h2 className="font-semibold text-3xl flex items-center gap-3 mb-6">
        _Discover
      </h2>

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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
        {latestNews?.map((news, index) => {
          // 0-based index: first card full width, next 3 in 3 columns, repeat
          const mod = index % 4;
          return (
            <div
              key={index}
              className={
                mod === 0
                  ? "col-span-full"
                  : ""
              }
            >
              <NewsCard news={news} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Discover;
