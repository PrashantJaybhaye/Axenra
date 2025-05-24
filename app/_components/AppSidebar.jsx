"use client";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { BookCopy, Ghost, LogIn, Orbit, Search } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const MenuOptions = [
  {
    title: "Home",
    icon: Search,
    path: "/",
  },
  {
    title: "Discover",
    icon: Orbit,
    path: "/discover",
  },
  {
    title: "Library",
    icon: BookCopy,
    path: "/library",
  },
  {
    title: "Sign In",
    icon: LogIn,
    path: "#",
  },
];

export function AppSidebar() {
  const path = usePathname();
  return (
    <Sidebar>
      <SidebarHeader className="bg-accent flex items-center py-5">
        <Image src={"/logo2.png"} alt="logo" width={180} height={140} />
      </SidebarHeader>
      <SidebarContent className="bg-accent">
        <SidebarGroup>
          <SidebarContent>
            <SidebarMenu>
              {MenuOptions.map((menu, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    asChild
                    className={`p-5 py-5 hover:bg-transparent hover:font-bold ${
                      path?.includes(menu.path) && "font-bold"
                    }
                    `}
                  >
                    <a href={menu.path} className="">
                      <menu.icon className="h-8 w-8" />
                      <span className="text-[1.1rem] ">{menu.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <Button className="rounded-full mx-4 my-4">Sign Up</Button>
          </SidebarContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className="bg-accent">
        <div className="p-3 ">
          <h2 className="text-gray-500 ">Try Now</h2>
          <p className="text-gray-400">
            Upgrade for image upload, Smarter AI,and more Copilot
          </p>
          <Button variant={"link"} className="text-gray-500 -ml-3">
            Learn More
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
