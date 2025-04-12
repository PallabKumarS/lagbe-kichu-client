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
// import { deleteCookie } from "@/services/AuthService";
import { privateRoutes } from "@/constants";
import { deleteCookie } from "@/services/AuthService";

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

  return (
    <Sidebar className="h-full" collapsible="icon">
      <SidebarContent className="">
        {/* Logo */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key={"logo"}>
                <SidebarMenuButton asChild>
                  <a href={"/"}>
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

        {/* seller panel  */}
        {user?.role === "seller" && (
          <SidebarGroup>
            <SidebarGroupLabel>Seller</SidebarGroupLabel>
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

        {/* buyer panel  */}
        {user?.role === "buyer" && (
          <SidebarGroup>
            <SidebarGroupLabel>Buyer</SidebarGroupLabel>
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
                  <AvatarFallback>LK</AvatarFallback>
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
