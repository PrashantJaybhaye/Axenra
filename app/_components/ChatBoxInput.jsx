"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  ArrowRight,
  AtomIcon,
  AudioLines,
  Cpu,
  Globe,
  Mic,
  Paperclip,
  Router,
  SearchCheck,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { AiModelsOption } from "../../services/Shared";
import { supabase } from "../../services/Supabase";
import { useUser, useClerk, UserButton } from "@clerk/nextjs";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";

function ChatBoxInput() {
  const [pageLoading, setPageLoading] = useState(true);
  const [userSearchInput, setUserSearchInput] = useState();
  const [searchType, setSearchType] = useState("search");
  const [loading, setLoading] = useState();
  const [showLoginToast, setShowLoginToast] = useState(false);
  const { user } = useUser();
  const clerk = useClerk();
  const router = useRouter();

  // Hide loader after 2 seconds as a fallback
  useEffect(() => {
    const timeout = setTimeout(() => setPageLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  // Hide loader when image loads or errors
  const handleImageReady = () => setPageLoading(false);

  // Hide toast after 2 seconds
  useEffect(() => {
    if (showLoginToast) {
      const timer = setTimeout(() => setShowLoginToast(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showLoginToast]);

  // Show toast and then open Clerk sign up modal
  useEffect(() => {
    if (showLoginToast) {
      const timer = setTimeout(() => {
        setShowLoginToast(false);
        clerk.openSignUp();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [showLoginToast, clerk]);

  // Prevent scroll on mobile when input is fixed at bottom
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isMobile = window.matchMedia("(max-width: 640px)").matches;
      if (isMobile) {
        document.body.classList.add("overflow-hidden", "h-screen");
        return () => {
          document.body.classList.remove("overflow-hidden", "h-screen");
        };
      }
    }
  }, []);

  const onSearchQuery = async () => {
    if (loading) return; // Prevent duplicate requests
    setLoading(true);
    const libId = uuidv4();
    const { data } = await supabase
      .from("Library")
      .insert([
        {
          searchInput: userSearchInput,
          userEmail: user?.primaryEmailAddress.emailAddress,
          type: searchType,
          libId: libId,
        },
      ])
      .select();

    await router.push("/search/" + libId);
    setLoading(false);
    console.log(data[0]);
  };

  if (pageLoading) {
    return (
      <div className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center gap-6">
        <div className="spinner-wrapper">
          <div className="spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-full -ml-6 md:ml-0 md:items-center md:justify-center md:flex md:h-screen md:w-full">
      {/* Log In Button at top-right */}
      <div className=" fixed top-2 right-3 z-[10] mt-1">
        {!user && (
          <Button
            variant="outline"
            className="bg-neutral-900 text-white border border-neutral-700 px-6 py-2 rounded-full shadow-sm tracking-wide duration-200 ease-in-out hover:bg-neutral-800 hover:text-white font-bold"
            onClick={() => clerk.openSignIn()}
            aria-label="Log In to your account"
          >
            Log In
          </Button>
        )}
        {user && (
          <div className="flex items-center gap-3 px-4 py-2">
            <span className="text-base font-bold text-gray-400 truncate max-w-[120px]">
              {user.username || user.fullName}
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
        )}
      </div>
      {/* Toast Notification */}
      {showLoginToast && (
        <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[9999] w-[90vw] sm:w-auto max-w-sm md:max-w-md bg-neutral-900 text-white px-4 sm:px-6 py-3 rounded-lg shadow-xl border border-neutral-700 flex items-center gap-3 animate-slide-in-right text-sm md:text-base">
          <span className="text-yellow-400 text-lg">⚠️</span>
          <div className="flex flex-col">
            <span className="font-semibold">Login Required</span>
            <span className="text-neutral-300 text-xs md:text-sm">
              Please log in to continue.
            </span>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center justify-center w-full h-full md:h-auto md:justify-center md:items-center max-sm:h-screen max-sm:justify-between">
        {/* Centered logo */}
        <div className="flex-1 flex items-center justify-center w-full">
          <Image
            src={"/logo.png"}
            alt="Logo"
            width={250}
            height={250}
            className="w-[300px] sm:w-[250px] md:w-[250px] mb-3 max-sm:mb-50"
            onLoad={handleImageReady}
            onError={handleImageReady}
            priority
          />
        </div>
        {/* Input box at bottom on mobile, centered on md+ */}
        <div className="p-2 w-full max-w-2xl rounded-2xl bg-[#202222] border-[#303130] border-2 mt-2 max-sm:pb-4 max-sm:fixed max-sm:bottom-0 max-sm:left-1/2 max-sm:-translate-x-1/2 max-sm:w-[98vw] max-sm:rounded-b-none max-sm:rounded-t-2xl max-sm:border-b-0">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between sm:items-end">
            <Tabs defaultValue="Search" className="w-full sm:w-[400px]">
              <TabsContent value="Search">
                <input
                  type="text"
                  placeholder="Ask anything..."
                  className="w-full p-3 sm:p-4 rounded-lg text-white outline-none border-none transition placeholder:text-gray-400 sm:text-base"
                  onChange={(e) => setUserSearchInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !loading) { // Prevent while loading
                      if (!user) {
                        setShowLoginToast(true);
                        return;
                      }
                      if (userSearchInput) {
                        onSearchQuery();
                      }
                    }
                  }}
                />
              </TabsContent>
              <TabsContent value="Research">
                <input
                  type="text"
                  placeholder="Research anything..."
                  className="w-full p-3 sm:p-4 rounded-lg text-white outline-none border-none transition placeholder:text-gray-400 sm:text-base"
                  onChange={(e) => setUserSearchInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !loading) { // Prevent while loading
                      if (!user) {
                        setShowLoginToast(true);
                        return;
                      }
                      if (userSearchInput) {
                        onSearchQuery();
                      }
                    }
                  }}
                />
              </TabsContent>
              <TabsList className="flex max-sm:w-full bg-[#191A1A]  ">
                <TabsTrigger
                  value="Search"
                  className="data-[state=active]:bg-[#331B12] data-[state=active]:text-primary data-[state=active]:font-bold data-[state=active]:shadow data-[state=inactive]:text-gray-400 data-[state=inactive]:bg-transparent px-4 py-2 rounded-md transition data-[state=active]:border data-[state=active]:border-primary"
                  onClick={() => setSearchType("search")}
                >
                  <SearchCheck className="size-4 sm:size-5" /> Search
                </TabsTrigger>
                <TabsTrigger
                  value="Research"
                  className="data-[state=active]:bg-[#331B12] data-[state=active]:text-primary data-[state=active]:font-bold data-[state=active]:shadow data-[state=inactive]:text-gray-400 data-[state=inactive]:bg-transparent px-4 py-2 rounded-md transition data-[state=active]:border   data-[state=active]:border-primary"
                  onClick={() => setSearchType("research")}
                >
                  <AtomIcon className="size-4 sm:size-5" /> Research
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center justify-end gap-0 sm:gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="relative group inline-block">
                    <Button variant="ghost" className="hover:bg-[#454545]">
                      <Cpu className="text-gray-500 size-4 sm:size-5" />
                    </Button>
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 text-xs sm:text-xs bg-black text-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                      Choose a model
                    </div>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="overflow-y-auto">
                  <DropdownMenuLabel>
                    <span className="text-primary">Best</span>
                    <p className="text-xs text-gray-500">
                      Select the best model for each query
                    </p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {AiModelsOption.map((model, index) => (
                    <DropdownMenuItem key={index}>
                      <div className="mb-1">
                        <h2 className="text-sm">{model.name}</h2>
                        <p className="text-xs">{model.desc}</p>
                      </div>
                    </DropdownMenuItem>
                  ))}
                  {/* <DropdownMenuSeparator />
                <p className="text-xs">Reasoning</p>
                {ReasoningModels.map((model, index) => (
                  <DropdownMenuItem key={index}>
                    <div className="mb-1">
                      <h2 className="text-sm">{model.name}</h2>
                      <p className="text-xs">{model.desc}</p>
                    </div>
                  </DropdownMenuItem>
                ))} */}
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="relative group inline-block">
                <Button variant="ghost" className="hover:bg-[#454545]">
                  <Globe className="text-gray-500 size-4 sm:size-5" />
                </Button>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 text-xs sm:text-xs bg-black text-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  Set sources for search
                </div>
              </div>

              <div className="relative group inline-block">
                <Button variant="ghost" className="hover:bg-[#454545]">
                  <Paperclip className="text-gray-500 size-4 sm:size-5" />
                </Button>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 text-xs sm:text-xs bg-black text-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  Attach File
                </div>
              </div>

              <div className="relative group inline-block">
                <Button variant="ghost" className="hover:bg-[#454545]">
                  <Mic className="text-gray-500 size-4 sm:size-5" />
                </Button>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 text-xs sm:text-xs bg-black text-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  Dictation
                </div>
              </div>

              <div className="relative group inline-block">
                <Button
                  onClick={() => {
                    if (loading) return; // Prevent while loading
                    if (!user) {
                      setShowLoginToast(true);
                      return;
                    }
                    if (userSearchInput) {
                      onSearchQuery();
                    }
                  }}
                  disabled={loading}
                >
                  {loading ? (
                    // Spinner for loading state
                    <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : !userSearchInput ? (
                    <AudioLines className="text-white size-4 sm:size-5" />
                  ) : (
                    <ArrowRight
                      className="text-white size-4 sm:size-5"
                      disabled={loading}
                    />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBoxInput;
