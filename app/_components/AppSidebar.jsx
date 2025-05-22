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
import { BookCopy, LogIn, Orbit, Search } from "lucide-react";
import Image from "next/image";

const MenuOptions = [
  {
    title: "Home",
    icon: Search,
    path: "/",
  },
  {
    title: "Discover",
    icon: Orbit,
    path: "/",
  },
  {
    title: "Library",
    icon: BookCopy,
    path: "/",
  },
  {
    title: "Sign In",
    icon: LogIn,
    path: "/",
  },
];

export function AppSidebar() {
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
                  <SidebarMenuButton asChild className={`p-5 py-5 hover:bg-transparent hover:font-bold `}>
                    <a href={menu.path} className="">
                      <menu.icon className="h-8 w-8"/>
                      <span className="text-lg ">{menu.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className="bg-accent" />
    </Sidebar>
  );
}
