import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { ReactNode } from "react";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import Footer from "@/components/shared/Footer";
import { NotificationDrawer } from "@/components/shared/NotificationDrawer";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider className="flex min-h-screen overflow-x-hidden">
      <AppSidebar />
      <SidebarInset className="flex flex-1 flex-col overflow-x-hidden">
        <div className="flex items-center justify-between border-b px-4 py-2">
          <SidebarTrigger />
          <div className="flex items-center justify-between gap-2 overflow-x-hidden">
            <ThemeToggle />
            <NotificationDrawer />
          </div>
        </div>
        <div className="mt-2 flex-1 p-4 min-h-screen">{children}</div>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default layout;
