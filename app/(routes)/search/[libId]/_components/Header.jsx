import { UserButton } from "@clerk/nextjs";
import { Clock, Link, Send } from "lucide-react";
import moment from "moment";
import React from "react";
import { Button } from "../../../../../components/ui/button";

const formatShortTimeAgo = (date) => {
  const now = moment();
  const input = moment(date);
  const diff = moment.duration(now.diff(input));

  const minutes = Math.floor(diff.asMinutes());
  const hours = Math.floor(diff.asHours());
  const days = Math.floor(diff.asDays());

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hrs ago`;
  return `${days} d ago`;
};

function Header({ searchInputRecord }) {
  return (
    <div className="w-full p-3 sm:p-4 sm:border-b sm:border-gray-400 text-white flex flex-row justify-between items-center gap-4 ">
      {/* User Info & Created Time */}
      <div className="flex items-center gap-2 -ml-5">
        <UserButton />
        <div className="flex items-center gap-1 text-gray-400 text-xs ">
          <Clock size={16} />
          <h2>{formatShortTimeAgo(searchInputRecord?.created_at)}</h2>
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
