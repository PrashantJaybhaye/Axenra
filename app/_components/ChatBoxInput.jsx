import Image from "next/image";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AtomIcon,
  AudioLines,
  Cpu,
  Globe,
  Mic,
  Paperclip,
  SearchCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AiModelsOption, ReasoningModels } from "@/services/Shared";

function ChatBoxInput() {
  return (
    <div className="flex flex-col h-screen items-center justify-center w-full -ml-6 ">
      <Image
        src={"/raw2.png"}
        alt="Logo"
        width={250}
        height={250}
        className="w-[300px] sm:w-[250px] md:w-[250px]"
      />
      <div className="p-2 w-full max-w-2xl border rounded-2xl">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between sm:items-end">
          <Tabs defaultValue="Search" className="w-full sm:w-[400px]">
            <TabsContent value="Search">
              <input
                type="text"
                placeholder="Ask anything..."
                className="w-full p-3 sm:p-4 outline-none border-none sm:text-base"
              />
            </TabsContent>
            <TabsContent value="Research">
              <input
                type="text"
                placeholder="Research anything..."
                className="w-full p-3 sm:p-4 outline-none border-none sm:text-base"
              />
            </TabsContent>
            <TabsList className="flex max-sm:w-full">
              <TabsTrigger value="Search" className="text-primary">
                <SearchCheck className="size-4 sm:size-5" /> Search
              </TabsTrigger>
              <TabsTrigger value="Research" className="text-primary">
                <AtomIcon className="size-4 sm:size-5" /> Research
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center justify-end gap-0 sm:gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="relative group inline-block">
                  <Button variant="ghost">
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
              <Button variant="ghost">
                <Globe className="text-gray-500 size-4 sm:size-5" />
              </Button>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 text-xs sm:text-xs bg-black text-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                Set sources for search
              </div>
            </div>

            <div className="relative group inline-block">
              <Button variant="ghost">
                <Paperclip className="text-gray-500 size-4 sm:size-5" />
              </Button>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 text-xs sm:text-xs bg-black text-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                Attach File
              </div>
            </div>

            <div className="relative group inline-block">
              <Button variant="ghost">
                <Mic className="text-gray-500 size-4 sm:size-5" />
              </Button>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 text-xs sm:text-xs bg-black text-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                Dictation
              </div>
            </div>

            <div className="relative group inline-block">
              <Button>
                <AudioLines className="text-white size-4 sm:size-5" />
              </Button>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 text-xs sm:text-xs bg-black text-white rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                Voice Mode
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBoxInput;
