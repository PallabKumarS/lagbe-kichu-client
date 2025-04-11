"use client";

import { Button } from "../ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "./ThemeToggle";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { logout, userSelector } from "@/redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import Searchbar from "./Searchbar";
import { deleteCookie } from "@/services/AuthService";
import { privateRoutes } from "@/constants";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector(userSelector);

  const navItems = [
    { href: "/listings", label: "All Rentals" },
    { href: "/about", label: "About" },
  ];

  const handleLogout = () => {
    dispatch(logout());
    deleteCookie();

    if (privateRoutes.some((route) => pathname.match(route))) {
      router.push("/login");
    }
  };

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-30 pt-2">
      <nav className="container mx-auto px-4 pb-2 lg:h-16 flex items-center justify-center lg:justify-between gap-4 flex-wrap lg:flex-nowrap">
        {/* Logo */}
        <div onClick={() => router.push("/")} className="flex-shrink-0">
          <h1 className="text-2xl font-black">
            <span className="text-gradient">Lagbe Kichu</span>
          </h1>
        </div>

        {/* Search Bar - Always in main navbar */}
        <div className="flex-grow max-w-md hidden md:block z-[100]">
          <Searchbar />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {user?.email ? (
            <>
              {user?.role === "seller" && (
                <Link
                  href="/dashboard/seller/create-listing"
                  className="hidden sm:block"
                >
                  <Button variant="outline" className="rounded-full">
                    Post Rental
                  </Button>
                </Link>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={`/dashboard/profile`}>Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={`/dashboard/profile`}>Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href={`/dashboard/settings`}>Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-red-500"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link href="/login">
              <Button variant="outline" className="rounded-full">
                Login
              </Button>
            </Link>
          )}

          <ThemeToggle />

          {/* Mobile Menu Button */}
          <Button
            variant="outline"
            size="icon"
            className="md:hidden rounded-full transition-all duration-300 ease-in-out"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="relative">
              <X
                className={`absolute -translate-y-2 -translate-x-2 transition-all duration-300 ease-in-out ${
                  isMenuOpen
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 rotate-90 scale-0"
                }`}
              />
              <Menu
                className={`absolute -translate-y-2 -translate-x-2 transition-all duration-300 ease-in-out ${
                  isMenuOpen
                    ? "opacity-0 rotate-90 scale-0"
                    : "opacity-100 rotate-0 scale-100"
                }`}
              />
            </div>
          </Button>
        </div>
      </nav>

      {/* Mobile Search - Always visible on small screens */}
      <div className="flex-grow max-w-xs md:hidden z-[100] mx-auto mb-2">
        <Searchbar />
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <AnimatePresence>
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="md:hidden border-t"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              {user && user.role === "seller" && (
                <Link
                  href="/dashboard/seller/create-listing"
                  className="block text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Post Rental
                </Link>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </header>
  );
}
