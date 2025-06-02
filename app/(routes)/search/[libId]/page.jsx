"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../../services/Supabase";
import Header from "./_components/Header";
import DisplayResult from "./_components/DisplayResult";

function SearchQueryResult() {
  const { libId } = useParams();
  const [searchInputRecord, setSearchInputRecord] = useState();


  useEffect(() => {
    GetSearchQueryRecord();
  }, []);

  const GetSearchQueryRecord = async () => {
    let { data: Library, error } = await supabase
      .from("Library")
      .select("*,chats(*)")
      .eq("libId", libId);


    setSearchInputRecord(Library[0]);
  };
  

  return (
    <div>
      <Header searchInputRecord={searchInputRecord}/>
      <div className="sm:px-10 md:px-20 lg:px-36 xl:px-56 max-sm:-ml-9 max-sm:-mt-6">
        <DisplayResult searchInputRecord={searchInputRecord} />
      </div>
    </div>
  );
}

export default SearchQueryResult;
