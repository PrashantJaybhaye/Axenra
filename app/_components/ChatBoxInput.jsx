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
            <TabsList className='flex max-sm:w-full'>
              <TabsTrigger value="Search" className="text-primary">
                <SearchCheck className="size-4 sm:size-5" /> Search
              </TabsTrigger>
              <TabsTrigger value="Research" className="text-primary">
                <AtomIcon className="size-4 sm:size-5"/> Research
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center justify-end gap-0 sm:gap-1">
            <Button variant="ghost">
              <Globe className="text-gray-500 size-4 sm:size-5" />
            </Button>
            <Button variant="ghost">
              <Paperclip className="text-gray-500 size-4 sm:size-5" />
            </Button>
            <Button variant="ghost">
              <Mic className="text-gray-500 size-4 sm:size-5" />
            </Button>

            <Button>
              <AudioLines className="text-white size-4 sm:size-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBoxInput;
