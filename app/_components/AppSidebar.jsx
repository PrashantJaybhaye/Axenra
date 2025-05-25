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
import {
  SignOutButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { BookCopy, LogIn, Orbit, Search } from "lucide-react";
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
    path: "/sign-in",
  },
];

export function AppSidebar() {
  const path = usePathname();
  const { user } = useUser();

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
              {MenuOptions.filter((menu) => {
                // Hide "Sign In" if user is logged in
                if (menu.title === "Sign In" && user) return false;
                return true;
              }).map((menu, index) => (
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
            {!user ? (
              <SignUpButton mode="modal">
                <Button className="rounded-full mx-1 sm:mx-2 md:mx-4 my-2 sm:my-3 md:my-4 w-[calc(100%-0.5rem)] sm:w-[calc(100%-1rem)] md:w-[calc(100%-2rem)] text-sm sm:text-base">
                  Sign Up
                </Button>
              </SignUpButton>
            ) : (
              <SignOutButton>
                <Button className="rounded-full mx-1 sm:mx-2 md:mx-4 my-2 sm:my-3 md:my-4 w-[calc(100%-0.5rem)] sm:w-[calc(100%-1rem)] md:w-[calc(100%-2rem)] text-sm sm:text-base">
                  Logout
                </Button>
              </SignOutButton>
            )}
          </SidebarContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className="bg-accent">
        <div className="p-2 md:p-3 flex flex-col">
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
          <hr className="my-2 border-t border-gray-300" />
          <div className="flex justify-end">
            <UserButton
              appearance={{
                elements: {
                  rootBox: "flex items-center gap-3",
                  userButtonAvatarBox:
                    "h-10 w-10 rounded-full ring-2 ring-accent",
                  userButtonPopoverCard:
                    "bg-white border border-gray-200 shadow-xl rounded-lg p-2",
                  userButtonPopoverActionButton:
                    "text-sm hover:bg-accent px-4 py-2 rounded-md text-left w-full transition",
                  userButtonPopoverActionButton__signOut:
                    "text-red-600 hover:text-red-700 font-semibold",
                },
              }}
              showName={true}
              userProfileMode="navigation"
            />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
