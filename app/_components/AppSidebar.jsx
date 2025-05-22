import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Image from "next/image";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="bg-accent flex items-center py-5">
        <Image src={'/logo2.png'} alt='logo' width={180} height={140} />
      </SidebarHeader>
      <SidebarContent className="bg-accent">
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className="bg-accent" />
    </Sidebar>
  );
}
