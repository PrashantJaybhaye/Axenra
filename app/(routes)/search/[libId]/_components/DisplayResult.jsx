import {
  LucideImage,
  LucideList,
  LucideSparkle,
  LucideVideo,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import AnswerDisplay from "./AnswerDisplay";
import axios from "axios";
import { SEARCH_RESULT } from "../../../../../services/Shared";
import { supabase } from "../../../../../services/Supabase";
import { useParams } from "next/navigation";

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
    label: "Videos",
    icon: LucideVideo,
  },
  {
    label: "Sources",
    icon: LucideList,
    badge: 10,
  },
];

function DisplayResult({ searchInputRecord }) {
  const [activeTab, setActiveTab] = useState("Answer");
  const [searchResult, setSearchResult] = useState(SEARCH_RESULT);
  const { libId } = useParams();

  useEffect(() => {
    // update this method
    searchInputRecord && GetSearchApiResult();
  }, [searchInputRecord]);

  const GetSearchApiResult = async () => {
    // const result = await axios.post("/api/brave-search-api", {
    //   searchInput: searchInputRecord?.searchInput,
    //   searchType: searchInputRecord?.type,
    // });
    // console.log(result.data);

    const searchResp = SEARCH_RESULT;

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
        },
      ])
      .select();
    await GenerateAIResp(formattedSearchResp,data[0].id);
  };

  const GenerateAIResp = async (formattedSearchResp,recordId) => {
    const result = await axios.post("/api/llm-model", {
      searchInput: searchInputRecord?.searchInput,
      searchResult: formattedSearchResp,
      recordId: recordId,
    });

    console.log(result.data);
  };

  return (
    <div className="text-white mt-7">
      <h2 className="font-medium text-xl sm:text-2xl md:text-3xl text-[#D2D2D1] line-clamp-2">
        {searchInputRecord?.searchInput}
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
          <AnswerDisplay searchResult={searchResult} />
        ) : null}
      </div>
    </div>
  );
}

export default DisplayResult;
