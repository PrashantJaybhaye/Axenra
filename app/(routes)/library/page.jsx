"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../../../services/Supabase";
import { useUser, UserButton } from "@clerk/nextjs";
import moment from "moment";
import { SquareArrowOutUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";

function Library() {
  const { user } = useUser();
  const [libraryHistory, setLibraryHistory] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      GetLibraryHistory();
    }
  }, [user]);

  const GetLibraryHistory = async () => {
    const { data: Library, error } = await supabase
      .from("Library")
      .select("*")
      .eq("userEmail", user?.primaryEmailAddress?.emailAddress)
      .order("id", { ascending: false });

    if (error) {
      console.error("Error fetching library data:", error.message);
      return;
    }

    setLibraryHistory(Library);
  };

  return (
    <div className="mt-15 px-2 sm:px-6 md:px-12 lg:px-32 xl:px-52 max-sm:-ml-10">
      {/* Absolute Top Right User Info */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
        <span className="text-base font-bold text-gray-400 truncate max-w-[120px]">
          {user?.username || user?.fullName || "User"}
        </span>
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

      <h2 className="font-bold text-2xl sm:text-2xl md:text-2xl text-[#E8E8E6] mb-6">
        Your Library
      </h2>

      {libraryHistory.length > 0 ? (
        <div className="space-y-4  max-sm:-ml-2 max-sm:mr-2">
          {libraryHistory.map((item, index) => (
            <div
              key={index}
              onClick={() => router.push(`/search/${item?.libId}`)}
              className="p-5 bg-gradient-to-br from-neutral-900 to-neutral-800/60 backdrop-blur-sm border border-neutral-700/60 rounded-2xl shadow-md  cursor-pointer group"
            >
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="text-base sm:text-lg md:text-lg font-semibold text-[#E8E8E6] line-clamp-1">
                    {item?.searchInput}
                  </h3>
                  <p className="text-xs sm:text-xs text-gray-400 mt-1">
                    {moment(item?.created_at).fromNow()}
                  </p>
                </div>
                <SquareArrowOutUpRight
                  size={18}
                  className="text-gray-500 group-hover:text-[#E8E8E6] transition"
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        // No History
        <div className="min-h-[70vh] grid place-items-start sm:place-items-center px-4 max-sm:-ml-2 max-sm:mr-2 max-sm:mt-25">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 max-w-md w-full text-center flex flex-col items-center space-y-5 border border-white/10">
            <Sparkles size={42} className="text-orange-300 animate-pulse" />
            <p className="text-lg font-semibold text-gray-100">
              No history found
            </p>
            <p className="text-sm text-gray-400">
              You haven’t searched anything yet. Start exploring to see your
              results here!
            </p>
            <button
              className="mt-2 px-5 py-2 rounded-lg bg-orange-400 hover:bg-orange-500 text-[#E8E8E6] text-sm font-medium transition-all duration-200 shadow-md"
              onClick={() => router.push(`/`)}
            >
              Start Searching
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Library;
