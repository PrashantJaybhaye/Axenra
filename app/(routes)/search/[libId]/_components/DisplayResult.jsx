import {
  Loader2Icon,
  LucideImage,
  LucideList,
  LucideSparkle,
  LucideVideo,
  LucideVideotape,
  Send,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import AnswerDisplay from "./AnswerDisplay";
import axios from "axios";
import { SEARCH_RESULT } from "../../../../../services/Shared";
import { supabase } from "../../../../../services/Supabase";
import { useParams } from "next/navigation";
import ImageListTab from "./ImageListTab";
import SourcesListTab from "./SourceListTab";
import { Button } from "../../../../../components/ui/button";

const tabs = [
  {
    label: "Answer",
    icon: LucideSparkle,
  },
  {
    label: "Images",
    icon: LucideImage,
  },
  {
    label: "Sources",
    icon: LucideList,
    badge: 10,
  },
];

function DisplayResult({ searchInputRecord }) {
  const [activeTab, setActiveTab] = useState("Answer");
  const [searchResult, setSearchResult] = useState(searchInputRecord);
  const { libId } = useParams();
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [userInput, setUserInput] = useState();

  useEffect(() => {
    // update this method
    searchInputRecord?.chats?.length == 0
      ? GetSearchApiResult()
      : GetSearchRecord();
    setSearchResult(searchInputRecord);
    console.log(searchInputRecord);
  }, [searchInputRecord]);

  const GetSearchApiResult = async () => {
    setLoadingSearch(true);
    const result = await axios.post("/api/brave-search-api", {
      searchInput: userInput ?? searchInputRecord?.searchInput,
      searchType: searchInputRecord?.type ?? "Search",
    });
    console.log(result.data);

    const searchResp = result.data;

    //save to DB
    const formattedSearchResp = searchResp?.web?.results?.map(
      (item, index) => ({
        title: item?.title,
        description: item?.description,
        long_namme: item?.profile?.long_name,
        img: item?.profile?.img,
        url: item?.url,
        thumbnail: item?.thumbnail?.src,
      })
    );
    console.log(formattedSearchResp);

    const { data, error } = await supabase
      .from("chats")
      .insert([
        {
          libId: libId,
          searchResult: formattedSearchResp,
          userSearchInput: userInput ?? searchInputRecord?.searchInput,
        },
      ])
      .select();
    await GetSearchRecord();
    setLoadingSearch(false);
    await GenerateAIResp(formattedSearchResp, data[0].id);
  };

  const GenerateAIResp = async (formattedSearchResp, recordId) => {
    const result = await axios.post("/api/llm-model", {
      searchInput: searchInputRecord?.searchInput,
      searchResult: formattedSearchResp,
      recordId: recordId,
    });

    console.log(result.data);
    const runId = result.data;

    const interval = setInterval(async () => {
      const runResp = await axios.post("/api/get-inngest-status", {
        runId: runId,
      });

      if (runResp.data?.data[0].status == "Completed") {
        console.log("Completed!!!");
        await GetSearchRecord();
        clearInterval(interval);
        //Get Updated Data fromm Database
      }
    }, 1000);
  };

  const GetSearchRecord = async () => {
    let { data: Library, error } = await supabase
      .from("Library")
      .select("*,chats(*)")
      .eq("libId", libId)
      .order("id", { foreignTable: "chats", ascending: true });

    setSearchResult(Library[0]);
  };

  return (
    <div className="text-white mb-50 -ml-4">
      {!searchResult?.chats && (
        <div className="p-4 space-y-6 max-w-md md:max-w-4xl lg:max-w-6xl mx-auto mt-6">
          {/* Top Bar Skeleton */}
          <div className="h-5 w-20 bg-neutral-800 animate-pulse rounded-md"></div>

          {/* Title Skeleton */}
          <div className="h-6 w-3/4 bg-neutral-800 animate-pulse rounded-md"></div>

          {/* Tabs Skeleton */}
          <div className="flex space-x-3">
            <div className="h-6 w-16 bg-neutral-800 animate-pulse rounded-md"></div>
            <div className="h-6 w-16 bg-neutral-800 animate-pulse rounded-md"></div>
            <div className="h-6 w-16 bg-neutral-800 animate-pulse rounded-md"></div>
          </div>

          {/* Source Links Skeleton (Responsive Grid) */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-8 w-full bg-neutral-800 animate-pulse rounded-md"
              ></div>
            ))}
          </div>

          {/* Section Title Skeleton */}
          <div className="h-5 w-2/3 bg-neutral-800 animate-pulse rounded-md mt-4"></div>

          {/* Paragraph/Description Skeleton */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-neutral-800 animate-pulse rounded-md"></div>
            <div className="h-4 w-5/6 bg-neutral-800 animate-pulse rounded-md"></div>
            <div className="h-4 w-3/4 bg-neutral-800 animate-pulse rounded-md"></div>
          </div>

          {/* Key Considerations */}
          <div className="mt-4 space-y-3">
            <div className="h-5 w-2/3 bg-neutral-800 animate-pulse rounded-md"></div>
            <div className="h-4 w-full bg-neutral-800 animate-pulse rounded-md"></div>
            <div className="h-4 w-11/12 bg-neutral-800 animate-pulse rounded-md"></div>
            <div className="h-4 w-10/12 bg-neutral-800 animate-pulse rounded-md"></div>
          </div>
        </div>
      )}
      {searchResult?.chats?.map((chat, index) => (
        <div key={index} className="mt-8 sm:mt-8">
          {/* Tabs and content */}
          <div className="mb-4 px-1">
            <h2 className="font-medium text-2xl sm:text-3xl md:text-3xl text-[#e0e0e0] tracking-tight break-words">
              {chat?.userSearchInput}
            </h2>
          </div>
          <div className="bg-transparent rounded-lg border border-[#2A2B2B] shadow p-3 sm:p-4 mb-3 sm:mb-4">
            {/* Always show user input above tabs */}
            {/* Tab navigation */}
            <div className="flex flex-wrap items-center gap-1 mb-3 sm:mb-4 border-b border-[#292d33]">
              {tabs.map(({ label, icon: Icon, badge }) => (
                <button
                  key={label}
                  onClick={() => setActiveTab(label)}
                  className={`relative flex items-center gap-1 sm:gap-2 px-3 py-1.5 rounded-t-md transition-colors focus:outline-none
                    ${
                      activeTab === label
                        ? "bg-[#282c31] text-white font-semibold shadow-inner"
                        : "bg-transparent text-gray-400 hover:text-white"
                    }
                  `}
                  aria-selected={activeTab === label}
                  aria-controls={`tabpanel-${label}`}
                  role="tab"
                  tabIndex={activeTab === label ? 0 : -1}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="capitalize text-xs sm:text-base">
                    {label}
                  </span>
                  {badge && (
                    <span className="ml-1 text-[10px] sm:text-xs bg-[#23272b] text-gray-300 px-1.5 sm:px-2 py-0.5 rounded-full border border-[#292d33]">
                      {badge}
                    </span>
                  )}
                  {activeTab === label && (
                    <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 rounded-t" />
                  )}
                </button>
              ))}
            </div>
            {/* Tab content */}
            <div
              id={`tabpanel-${activeTab}`}
              role="tabpanel"
              className="bg-transparent rounded-b-lg p-1 sm:p-2 min-h-[60px] sm:min-h-[80px] transition-all"
            >
              {activeTab === "Answer" ? (
                <AnswerDisplay chat={chat} loadingSearch={loadingSearch} />
              ) : activeTab === "Images" ? (
                <ImageListTab chat={chat} />
              ) : activeTab === "Sources" ? (
                <SourcesListTab chat={chat} />
              ) : null}
            </div>
          </div>
          {/* <hr className="my-2 sm:my-3 border-0 h-px bg-[#23272b]" /> */}
        </div>
      ))}

      {/* for searching related data */}
      <div className="fixed bottom-6 bg-[#303030] w-full max-w-sm sm:max-w-lg lg:max-w-2xl xl:max-w-3xl border border-accent-foreground rounded-xl shadow-lg p-3 px-4 flex items-center space-x-3 z-50">
        <input
          type="text"
          placeholder="Type anything..."
          className="flex-1 bg-transparent text-base  outline-none"
          onChange={(e) => setUserInput(e.target.value)}
        />
        {userInput && (
          <Button
            size="icon"
            className=""
            onClick={GetSearchApiResult}
            disabled={loadingSearch}
          >
            {loadingSearch ? (
              <Loader2Icon className="animate-spin" />
            ) : (
              <Send />
            )}
          </Button>
        )}
      </div>
    </div>
  );
}

export default DisplayResult;
