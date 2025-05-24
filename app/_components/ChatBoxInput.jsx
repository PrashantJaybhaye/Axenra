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
    <div className="flex flex-col h-screen items-center justify-center w-full -ml-6">
      <Image src={"/raw2.png"} alt="Logo" width={250} height={2500} />
      <div className="p-2 w-full max-w-2xl border rounded-2xl">
        <div className="flex justify-between items-end">
          <Tabs defaultValue="Search" className="w-[400px]">
            <TabsContent value="Search">
              <input
                type="text"
                placeholder="Ask anything..."
                className="w-full p-4 outline-none border-none"
              />
            </TabsContent>
            <TabsContent value="Research">
              <input
                type="text"
                placeholder="Research anything..."
                className="w-full p-4 outline-none border-none"
              />
            </TabsContent>
            <TabsList>
              <TabsTrigger value="Search" className={"text-primary"}>
                {" "}
                <SearchCheck /> Search
              </TabsTrigger>
              <TabsTrigger value="Research" className={"text-primary"}>
                {" "}
                <AtomIcon /> Research
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center">
            <Button variant={"ghost"}>
              <Globe className="text-gray-500 size-5" />
            </Button>
            <Button variant={"ghost"}>
              <Paperclip className="text-gray-500 size-5" />
            </Button>
            <Button variant={"ghost"}>
              <Mic className="text-gray-500 size-5" />
            </Button>

            <Button>
              <AudioLines className="text-white size-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatBoxInput;
