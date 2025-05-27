/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  List,
  Smartphone,
  Laptop,
  Car,
  Home as HomeIcon,
  Shirt,
  Gamepad2,
  Heart,
  Camera,
  Palette,
  Wrench,
  FileQuestionIcon,
} from "lucide-react";
import Link from "next/link";
import Container from "./Container";

interface MegaMenuProps {
  className?: string;
}

// Simplified Mega Menu Data Structure
const megaMenuData = {
  categories: {
    title: "Categories",
    sections: [
      {
        title: "Electronics",
        icon: Smartphone,
        items: [
          {
            name: "Smartphones",
            href: "/listings?category=smartphones",
            icon: Smartphone,
          },
          { name: "Laptops", href: "/listings?category=laptops", icon: Laptop },
          { name: "Cameras", href: "/listings?category=cameras", icon: Camera },
          { name: "Gaming", href: "/listings?category=gaming", icon: Gamepad2 },
        ],
      },
      {
        title: "Fashion",
        icon: Shirt,
        items: [
          {
            name: "Men's Clothing",
            href: "/listings?category=mens-clothing",
            icon: Shirt,
          },
          {
            name: "Women's Clothing",
            href: "/listings?category=womens-clothing",
            icon: Shirt,
          },
          { name: "Shoes", href: "/listings?category=shoes", icon: Shirt },
          {
            name: "Accessories",
            href: "/listings?category=accessories",
            icon: Heart,
          },
        ],
      },
      {
        title: "Home & Living",
        icon: HomeIcon,
        items: [
          {
            name: "Furniture",
            href: "/listings?category=furniture",
            icon: HomeIcon,
          },
          {
            name: "Appliances",
            href: "/listings?category=appliances",
            icon: HomeIcon,
          },
          { name: "Decor", href: "/listings?category=decor", icon: Palette },
          {
            name: "Kitchen",
            href: "/listings?category=kitchen",
            icon: HomeIcon,
          },
        ],
      },
      {
        title: "Vehicles",
        icon: Car,
        items: [
          { name: "Cars", href: "/listings?category=cars", icon: Car },
          {
            name: "Motorcycles",
            href: "/listings?category=motorcycles",
            icon: Car,
          },
          { name: "Bicycles", href: "/listings?category=bicycles", icon: Car },
          {
            name: "Parts",
            href: "/listings?category=auto-parts",
            icon: Wrench,
          },
        ],
      },
      {
        title: "Sports & Fitness",
        icon: Heart,
        items: [
          {
            name: "Exercise Equipment",
            href: "/listings?category=exercise",
            icon: Heart,
          },
          {
            name: "Sports Gear",
            href: "/listings?category=sports",
            icon: Heart,
          },
          {
            name: "Outdoor Activities",
            href: "/listings?category=outdoor",
            icon: Heart,
          },
          {
            name: "Team Sports",
            href: "/listings?category=team-sports",
            icon: Heart,
          },
        ],
      },
      {
        title: "Books & Media",
        icon: FileQuestionIcon,
        items: [
          {
            name: "Books",
            href: "/listings?category=books",
            icon: FileQuestionIcon,
          },
          {
            name: "Movies & TV",
            href: "/listings?category=movies",
            icon: FileQuestionIcon,
          },
          {
            name: "Music",
            href: "/listings?category=music",
            icon: FileQuestionIcon,
          },
          {
            name: "Educational",
            href: "/listings?category=educational",
            icon: FileQuestionIcon,
          },
        ],
      },
    ],
  },
};

const MegaMenu = ({ className = "" }: MegaMenuProps) => {
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);

  const handleMegaMenuToggle = (menuType: string) => {
    if (activeMegaMenu === menuType) {
      setActiveMegaMenu(null);
    } else {
      setActiveMegaMenu(menuType);
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        megaMenuRef.current &&
        !megaMenuRef.current.contains(event.target as Node)
      ) {
        setActiveMegaMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const MegaMenuContent = ({ data }: { data: any }) => (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="absolute top-[6vh] left-0 w-[96vw] bg-background/95 backdrop-blur-md border-t border-border shadow-2xl z-50"
      style={{ marginLeft: "calc(-50vw + 60%)" }}
    >
      <Container>
        <div className="py-8 px-4">
          {/* Only Main Sections - No Sidebar */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
            {data.sections.map((section: any, index: number) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-border">
                  <section.icon className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-foreground">
                    {section.title}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {section.items.map((item: any, itemIndex: number) => (
                    <li key={itemIndex}>
                      <Link
                        href={item.href}
                        className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
                        onClick={() => setActiveMegaMenu(null)}
                      >
                        <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        <span className="group-hover:translate-x-1 transition-transform">
                          {item.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </motion.div>
  );

  return (
    <div className={`relative ${className}`} ref={megaMenuRef}>
      {/* Categories Menu Trigger */}
      <div className="relative">
        <button
          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-full hover:bg-accent/20 group"
          onClick={() => handleMegaMenuToggle("categories")}
        >
          <List className="w-5 h-5 group-hover:rotate-6 transition-transform" />
          Categories
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              activeMegaMenu === "categories" ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Mega Menu Content */}
      <AnimatePresence>
        {activeMegaMenu === "categories" && (
          <MegaMenuContent data={megaMenuData.categories} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default MegaMenu;
