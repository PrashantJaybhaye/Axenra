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
      <SidebarHeader className="bg-accent flex items-center justify-center py-2 sm:py-3 md:py-5">
        <Image
          src={"/logo2.png"}
          alt="logo"
          width={140}
          height={100}
          className="w-[120px] sm:w-[140px] md:w-[180px]"
        />
      </SidebarHeader>
      <SidebarContent className="bg-accent">
        <SidebarGroup>
          <SidebarContent>
            <SidebarMenu>
              {MenuOptions.map((menu, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    asChild
                    className={`p-2 sm:p-3 md:p-5 md:py-5 hover:bg-transparent hover:font-bold ${
                      path?.includes(menu.path) && "font-bold"
                    }
                    `}
                  >
                    <a
                      href={menu.path}
                      className="flex items-center gap-2 sm:gap-3"
                    >
                      <menu.icon className="h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8" />
                      <span className="text-sm sm:text-base md:text-[1.1rem]">
                        {menu.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
            <Button className="rounded-full mx-1 sm:mx-2 md:mx-4 my-2 sm:my-3 md:my-4 w-[calc(100%-0.5rem)] sm:w-[calc(100%-1rem)] md:w-[calc(100%-2rem)] text-sm sm:text-base">
              Sign Up
            </Button>
          </SidebarContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className="bg-accent">
        <div className="p-2 md:p-3 ">
          <h2 className="text-gray-500 text-sm md:text-base ">Try Now</h2>
          <p className="text-gray-400 text-sm md:text-base">
            Upgrade for image upload, Smarter AI, and more Copilot
          </p>
          <Button
            variant={"link"}
            className="text-gray-500 -ml-4 text-sm md:text-base"
          >
            Learn More
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
