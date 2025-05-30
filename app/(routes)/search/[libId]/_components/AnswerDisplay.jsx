import React from "react";
import SourceList from "./SourceList";
import DisplaySummary from "./DisplaySummary";

function AnswerDisplay({ chat, loadingSearch }) {
  return (
    <div>
      <SourceList webResult={chat?.searchResult} loadingSearch={loadingSearch}/>
      <DisplaySummary aiResp={chat?.aiResp}/>
    </div>
  );
}

export default AnswerDisplay;
