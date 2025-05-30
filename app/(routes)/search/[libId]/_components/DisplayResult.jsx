import {
  LucideImage,
  LucideList,
  LucideSparkle,
  LucideVideo,
  LucideVideotape,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import AnswerDisplay from "./AnswerDisplay";
import axios from "axios";
import { SEARCH_RESULT } from "../../../../../services/Shared";
import { supabase } from "../../../../../services/Supabase";
import { useParams } from "next/navigation";
import ImageListTab from "./ImageListTab";
import SourcesListTab from "./SourceListTab";

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
      searchInput: searchInputRecord?.searchInput,
      searchType: searchInputRecord?.type,
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
          userSearchInput: searchInputRecord?.searchInput,
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
      .eq("libId", libId);

    setSearchResult(Library[0]);
  };

  return (
    <div className="text-white mt-7">
      {!searchResult?.chats && (
        <div>
          <div className="px-2 sm:px-4 md:px-8 max-w-3xl mx-auto w-full h-5 bg-neutral-800 animate-pulse rounded-md -ml-2 mt-4"></div>
          <div className="px-2 sm:px-4 md:px-8 max-w-3xl mx-auto w-1/2 h-5 bg-neutral-800 animate-pulse rounded-md -ml-2 mt-2"></div>
          <div className="px-2 sm:px-4 md:px-8 max-w-3xl mx-auto w-[70%] h-5 bg-neutral-800 animate-pulse rounded-md -ml-2 mt-2"></div>
        </div>
      )}
      {searchResult?.chats?.map((chat, index) => (
        <div key={index} className="mt-7">
          <h2 className="font-medium text-xl sm:text-2xl md:text-3xl text-[#D2D2D1] line-clamp-2">
            {chat?.userSearchInput}
          </h2>
          <div className="flex flex-wrap md:flex-nowrap items-start md:items-center gap-3 md:gap-6 border-b border-gray-700 pb-3 mt-5">
            {tabs.map(({ label, icon: Icon, badge }) => (
              <button
                key={label}
                onClick={() => setActiveTab(label)}
                className={`flex items-center gap-1 relative text-sm font-medium transition-colors ${
                  activeTab === label
                    ? "text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="capitalize">{label}</span>
                {badge && (
                  <span className="ml-1 text-xs bg-gray-800 text-gray-200 px-1.5 py-0.5 rounded">
                    {badge}
                  </span>
                )}
                {activeTab === label && (
                  <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-white rounded" />
                )}
              </button>
            ))}
          </div>

          <div>
            {activeTab === "Answer" ? (
              <AnswerDisplay chat={chat} loadingSearch={loadingSearch} />
            ) : activeTab == "Images" ? (
              <ImageListTab chat={chat} />
            ) : activeTab == "Sources" ? (
              <SourcesListTab chat={chat} />
            ) : null}
          </div>
          <hr className="my-5 border-0 h-px bg-[#282D36]" />
        </div>
      ))}
    </div>
  );
}

export default DisplayResult;
