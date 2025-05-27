"use client";

import {
  Settings,
  LogOut,
  User,
  PackageOpen,
  Users,
  FileText,
  LogIn,
  HomeIcon,
  TrainTrack,
  Package,
  FileSearch,
  ChevronRight,
  ChevronDown,
  FilePenLineIcon,
  Eye,
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
import { useAppDispatch } from "@/redux/hook";
import { logout } from "@/redux/features/authSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname, useRouter } from "next/navigation";
import { privateRoutes } from "@/constants";
import { deleteCookie } from "@/lib/deleteCookie";
import { useUser } from "@/hooks/useUser";

// Skeleton Components
const MenuItemSkeleton = () => (
  <SidebarMenuItem className="group hover:bg-accent/10 transition-colors duration-200">
    <SidebarMenuButton asChild>
      <div className="flex items-center gap-3 w-full animate-pulse">
        <div className="w-5 h-5 bg-muted rounded"></div>
        <div className="h-4 bg-muted rounded flex-grow max-w-24"></div>
        <div className="w-4 h-4 bg-muted rounded"></div>
      </div>
    </SidebarMenuButton>
  </SidebarMenuItem>
);

const GroupLabelSkeleton = () => (
  <div className="flex items-center gap-2 animate-pulse">
    <div className="w-4 h-4 bg-muted rounded"></div>
    <div className="h-4 bg-muted rounded w-20"></div>
  </div>
);

const UserProfileSkeleton = () => (
  <div className="flex w-full items-center gap-3 rounded-lg p-2 animate-pulse">
    <div className="h-8 w-8 bg-muted rounded-full"></div>
    <div className="flex-1">
      <div className="h-4 bg-muted rounded w-24 mb-1"></div>
      <div className="h-3 bg-muted rounded w-32"></div>
    </div>
    <div className="h-4 w-4 bg-muted rounded"></div>
  </div>
);

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
  {
    title: "Overview",
    icon: Eye,
    href: "/dashboard/admin/overview",
  },
];

// seller routes
const sellerRoutes = [
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
const buyerRoutes = [
  {
    title: "Track Orders",
    icon: TrainTrack,
    href: "/dashboard/buyer/track",
  },
  {
    title: "Reviews",
    icon: FilePenLineIcon,
    href: "/dashboard/buyer/reviews",
  },
];

export function AppSidebar() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();

  const { user, isFetching } = useUser();

  const handleLogout = async () => {
    dispatch(logout());
    await deleteCookie();

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

  const renderSkeletonMenuItems = (count: number) => (
    <SidebarMenu>
      {Array.from({ length: count }).map((_, index) => (
        <MenuItemSkeleton key={`skeleton-${index}`} />
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

        {/* Common Routes */}
        <SidebarGroup>
          <SidebarGroupContent>
            {isFetching ? renderSkeletonMenuItems(4) : renderMenuItems(items)}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Role-based Routes */}
        {isFetching ? (
          <>
            {/* Skeleton for role-based sections */}
            <SidebarGroup>
              <SidebarGroupLabel>
                <GroupLabelSkeleton />
              </SidebarGroupLabel>
              <SidebarGroupContent>
                {renderSkeletonMenuItems(3)}
              </SidebarGroupContent>
            </SidebarGroup>

            <SidebarGroup>
              <SidebarGroupLabel>
                <GroupLabelSkeleton />
              </SidebarGroupLabel>
              <SidebarGroupContent>
                {renderSkeletonMenuItems(2)}
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        ) : (
          <>
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
                  {renderMenuItems(sellerRoutes)}
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
                  {renderMenuItems(buyerRoutes)}
                </SidebarGroupContent>
              </SidebarGroup>
            )}
          </>
        )}

        {/* User Profile / Logout */}
        <div className="mt-auto border-t p-4 pl-0">
          {isFetching ? (
            <UserProfileSkeleton />
          ) : (
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
                    <p className="text-sm font-medium">
                      {user?.name || "Guest"}
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">
                      {user?.email || "Not logged in"}
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
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
