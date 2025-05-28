import { UserButton } from "@clerk/nextjs";
import { Clock, Link, Send } from "lucide-react";
import moment from "moment";
import React from "react";
import { Button } from "../../../../../components/ui/button";

function Header({ searchInputRecord }) {
  return (
    <div className="w-full p-4 sm:border-b sm:border-gray-400 text-white flex flex-row justify-between items-center gap-4 -ml-5">
      {/* User Info & Created Time */}
      <div className="flex items-center gap-2 ">
        <UserButton />
        <div className="flex items-center gap-1 text-gray-400 text-sm ">
          <Clock size={16} className="mt-1" />
          <h2>{moment(searchInputRecord?.created_at).fromNow()}</h2>
        </div>
      </div>

      {/* Search Input */}
      <div className="max-w-md overflow-hidden text-sm text-center sm:text-left hidden sm:block font-bold capitalize">
        <h2 className="line-clamp-1">{searchInputRecord?.searchInput}</h2>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center sm:justify-end gap-2">
        <Button
          size="sm"
          variant="outline"
          className="text-white border-gray-600"
        >
          <Link size={16} />
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="text-white border-gray-600 flex items-center gap-1"
        >
          <Send size={16} />
          <span className="hidden sm:inline">Share</span>
        </Button>
      </div>
    </div>
  );
}

export default Header;
