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

function ChatBoxInput() {
  return (
    <div className="flex flex-col h-screen items-center justify-center w-full -ml-0 sm:-ml-6 px-4 sm:px-6">
      <Image 
        src={"/raw2.png"} 
        alt="Logo" 
        width={250} 
        height={250}
        className="max-w-[180px] sm:max-w-[200px] md:max-w-[250px] mb-6" 
      />
      <div className="p-2 w-full max-w-[95%] sm:max-w-[42rem] border rounded-2xl">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between sm:items-end">
          <Tabs defaultValue="Search" className="w-full sm:max-w-[400px]">
            <TabsContent value="Search">
              <input
                type="text"
                placeholder="Ask anything..."
                className="w-full p-3 sm:p-4 outline-none border-none text-sm sm:text-base"
              />
            </TabsContent>
            <TabsContent value="Research">
              <input
                type="text"
                placeholder="Research anything..."
                className="w-full p-3 sm:p-4 outline-none border-none text-sm sm:text-base"
              />
            </TabsContent>
            <TabsList className="flex w-full sm:w-auto">
              <TabsTrigger value="Search" className="text-primary flex-1 sm:flex-none">
                <SearchCheck className="size-4 sm:size-5" /> 
                <span className="ml-1 text-xs sm:text-sm">Search</span>
              </TabsTrigger>
              <TabsTrigger value="Research" className="text-primary flex-1 sm:flex-none">
                <AtomIcon className="size-4 sm:size-5" /> 
                <span className="ml-1 text-xs sm:text-sm">Research</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-1 sm:gap-2">
            <Button variant="ghost" size="sm" className="sm:size-9">
              <Globe className="text-gray-500 size-4 sm:size-5" />
            </Button>
            <Button variant="ghost" size="sm" className="sm:size-9">
              <Paperclip className="text-gray-500 size-4 sm:size-5" />
            </Button>
            <Button variant="ghost" size="sm" className="sm:size-9">
              <Mic className="text-gray-500 size-4 sm:size-5" />
            </Button>
            <Button size="sm" className="sm:size-9">
              <AudioLines className="text-white size-4 sm:size-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBoxInput;