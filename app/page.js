import { Button } from "@/components/ui/button";
import Image from "next/image";
import ChatBoxInput from "./_components/ChatBoxInput";

export default function Home() {
  return (
    <div className="w-full">
      <ChatBoxInput />
    </div>
  );
}
