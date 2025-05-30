import React from "react";
import SourceList from "./SourceList";
import DisplaySummary from "./DisplaySummary";

function AnswerDisplay({ chat }) {
  return (
    <div>
      <SourceList webResult={chat?.searchResult} />
      <DisplaySummary aiResp={chat?.aiResp}/>
    </div>
  );
}

export default AnswerDisplay;
