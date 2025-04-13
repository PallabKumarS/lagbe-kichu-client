"use client";

import {
  Settings,
  LogOut,
  User,
  PackageOpen,
  Users,
  FileText,
  ChevronUp,
  LogIn,
  HomeIcon,
  TrainTrack,
  Package,
  FileSearch,
  ChevronRight,
  ChevronDown,
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
import { privateRoutes } from "@/constants";
import { deleteCookie } from "@/lib/deleteCookie";

// common routes for all users
const items = [
  {
    title: "Home",
    icon: HomeIcon,
    href: "/",
  },
  {
    title: "All Listings",
    icon: PackageOpen,
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
    title: "Listings",
    icon: PackageOpen,
    href: "/dashboard/admin/listing-management",
  },
  {
    title: "Category",
    icon: FileSearch,
    href: "/dashboard/admin/category-management",
  },
];

// seller routes
const landlordRoutes = [
  {
    title: "My Listings",
    icon: PackageOpen,
    href: "/dashboard/seller/create-listing",
  },
  {
    title: "Orders",
    icon: FileText,
    href: "/dashboard/seller/orders",
  },
];

// buyer routes
const tenantRoutes = [
  {
    title: "Applications",
    icon: FileText,
    href: "/dashboard/buyer/orders",
  },
  {
    title: "Track Requests",
    icon: TrainTrack,
    href: "/dashboard/buyer/track",
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

  const renderMenuItems = (routes: typeof items) => (
    <SidebarMenu>
      {routes.map((item) => (
        <SidebarMenuItem
          key={item.title}
          className={`
            group 
            hover:bg-accent/10 
            transition-colors 
            duration-200 
            ${pathname === item.href ? "bg-primary/10 text-primary" : ""}
          `}
        >
          <SidebarMenuButton asChild>
            <a href={item.href} className="flex items-center gap-3 w-full">
              <item.icon
                className={`
                  w-5 h-5 
                  group-hover:rotate-6 
                  transition-transform
                  ${
                    pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  }
                `}
              />
              <span className="flex-grow">{item.title}</span>
              <ChevronRight
                className="
                  w-4 h-4 
                  opacity-0 
                  group-hover:opacity-100 
                  transition-opacity
                  text-muted-foreground
                "
              />
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );

  return (
    <Sidebar className="h-full" collapsible="icon">
      <SidebarContent>
        {/* Logo */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key="logo">
                <SidebarMenuButton asChild>
                  <a
                    href="/"
                    className="flex items-center gap-3 hover:scale-105 transition-transform"
                  >
                    <Package className="text-primary" />
                    <span
                      className="text-gradient"
                      style={{ fontSize: "26px" }}
                    >
                      Lagbe Kichu
                    </span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Profile */}
        <SidebarGroup>
          <SidebarGroupContent>{renderMenuItems(items)}</SidebarGroupContent>
        </SidebarGroup>

        {/* Admin Panel */}
        {user?.role === "admin" && (
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2">
              <Users className="w-4 h-4 text-muted-foreground" />
              Admin Panel
            </SidebarGroupLabel>
            <SidebarGroupContent>
              {renderMenuItems(adminRoutes)}
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Seller Panel */}
        {user?.role === "seller" && (
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2">
              <PackageOpen className="w-4 h-4 text-muted-foreground" />
              Seller
            </SidebarGroupLabel>
            <SidebarGroupContent>
              {renderMenuItems(landlordRoutes)}
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Buyer Panel */}
        {user?.role === "buyer" && (
          <SidebarGroup>
            <SidebarGroupLabel className="flex items-center gap-2">
              <TrainTrack className="w-4 h-4 text-muted-foreground" />
              Buyer
            </SidebarGroupLabel>
            <SidebarGroupContent>
              {renderMenuItems(tenantRoutes)}
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Logout */}
        <div className="mt-auto border-t p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="
                  flex w-full items-center gap-3 
                  rounded-lg p-2 
                  hover:bg-accent/10 
                  transition-colors 
                  group
                "
              >
                <Avatar className="h-8 w-8 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all">
                  {user?.profileImage ? (
                    <AvatarImage src={user?.profileImage} alt={user?.name} />
                  ) : (
                    <AvatarImage src="https://github.com/shadcn.png" />
                  )}
                  <AvatarFallback>LK</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {user?.email}
                  </p>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:rotate-180 transition-transform" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start" side="top">
              {user ? (
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive-foreground cursor-pointer flex items-center gap-3"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" /> Logout
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  className="text-primary focus:text-primary-foreground cursor-pointer flex items-center gap-3"
                  onClick={() => router.push("/login")}
                >
                  <LogIn className="w-4 h-4" /> Login
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
