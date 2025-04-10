"use client";

import {
  Settings,
  LogOut,
  User,
  Building,
  Users,
  Key,
  FileText,
  ChevronUp,
  LogIn,
  HomeIcon,
  TrainTrack,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { logout, userSelector } from "@/redux/features/authSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname, useRouter } from "next/navigation";
import { deleteCookie } from "@/services/AuthService";
import { privateRoutes } from "@/constants";

// common routes for all users
const items = [
  {
    title: "Home",
    icon: HomeIcon,
    href: "/",
  },
  {
    title: "All Rentals",
    icon: Building,
    href: "/listings",
  },
  {
    title: "Profile",
    icon: User,
    href: `/dashboard/profile`,
  },
  {
    title: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
  },
];

// admin routes
const adminRoutes = [
  {
    title: "Users",
    icon: Users,
    href: "/dashboard/admin/user-management",
  },
  {
    title: "Properties",
    icon: Building,
    href: "/dashboard/admin/listing-management",
  },
];

// landlord routes
const landlordRoutes = [
  {
    title: "My Properties",
    icon: Building,
    href: "/dashboard/landlord/create-listing",
  },
  {
    title: "Requests",
    icon: FileText,
    href: "/dashboard/landlord/requests",
  },
];

// tenant routes
const tenantRoutes = [
  {
    title: "Applications",
    icon: FileText,
    href: "/dashboard/tenant/requests",
  },
  {
    title: "Track Requests",
    icon: TrainTrack,
    href: "/dashboard/tenant/track",
  },
];

export function AppSidebar() {
  const user = useAppSelector(userSelector);
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    deleteCookie();
    if (privateRoutes.some((route) => pathname.match(route))) {
      router.push("/login");
    }
  };

  return (
    <Sidebar className="h-full" collapsible="icon">
      <SidebarContent className="">
        {/* Logo */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <div className="flex-shrink-0" onClick={() => router.push("/")}>
                <h1 className="text-2xl font-black">
                  <span className="text-gradient">Lagbe Kichu</span>
                </h1>
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Profile */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* admin panel  */}
        {user?.role === "admin" && (
          <SidebarGroup>
            <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminRoutes.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.href}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* landlord panel  */}
        {user?.role === "landlord" && (
          <SidebarGroup>
            <SidebarGroupLabel>Landlord</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {landlordRoutes.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.href}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* tenant panel  */}
        {user?.role === "tenant" && (
          <SidebarGroup>
            <SidebarGroupLabel>Tenant</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {tenantRoutes.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.href}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* logout */}
        <div className="mt-auto border-t p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex w-full items-center gap-3 rounded-lg p-2 hover:bg-muted">
                <Avatar className="h-8 w-8">
                  {user?.profileImage ? (
                    <AvatarImage src={user?.profileImage} alt={user?.name} />
                  ) : (
                    <AvatarImage src="https://github.com/shadcn.png" />
                  )}
                  <AvatarFallback>NH</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {user?.email}
                  </p>
                </div>
                <ChevronUp className="h-4 w-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start" side="top">
              {user ? (
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  className="text-teal-600"
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
