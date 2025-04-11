"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronUpCircle, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { TListing } from "@/types";
import Image from "next/image";
import { getAllListings } from "@/services/ListingService";
import { Button } from "../ui/button";

const isValidImageUrl = (url: string) => {
  const pattern = new RegExp(
    "^https?:\\/\\/.+\\.(jpg|jpeg|png|webp|gif|bmp)$",
    "i"
  );
  return pattern.test(url);
};

const Searchbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<TListing[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleSearch = async (searchTerm: string) => {
    try {
      const res = await getAllListings({ searchTerm: searchTerm, limit: 5 });

      setSearchResults(res?.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="relative w-full " ref={searchRef}>
      <div className="relative">
        <input
          name="searchTerm"
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            handleSearch(e.target.value);
          }}
          onFocus={() => setIsOpen(true)}
          onTouchStart={() => setIsOpen(true)}
          placeholder="Search for houses..."
          className="w-full px-4 py-2 rounded-full border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 pl-10"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        {isOpen && (
          <ChevronUpCircle
            onClick={() => setIsOpen(false)}
            className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
          />
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full mt-2 w-full bg-yellow-50 dark:bg-cyan-950 border rounded-lg shadow-xl max-h-[300px] overflow-y-auto z-[100]">
          <div className="p-4 space-y-4">
            {!searchQuery && (
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">Popular Searches</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-muted/80 rounded-full text-sm cursor-pointer hover:bg-primary/20 transition-colors">
                    rangpur
                  </span>
                  <span className="px-4 py-2 bg-muted/80 rounded-full text-sm cursor-pointer hover:bg-primary/20 transition-colors">
                    10000
                  </span>
                </div>
              </div>
            )}

            {searchQuery && searchResults?.length > 0 && (
              <div className="space-y-3 mb-5">
                {searchResults.map((result) => (
                  <div
                    key={result.listingId}
                    className="flex items-center gap-4 p-3 hover:bg-muted/80 rounded-lg cursor-pointer transition-colors"
                    onClick={() => router.push(`/listings/${result.listingId}`)}
                  >
                    <Image
                      src={
                        isValidImageUrl(result.images[0])
                          ? result.images[0]
                          : "https://res.cloudinary.com/dchqfpvjb/image/upload/v1741016548/house2_jvg6nd.jpg"
                      }
                      alt={result.title}
                      width={48}
                      height={48}
                      className="rounded-md object-cover"
                    />
                    <div>
                      <p className="font-medium text-foreground">
                        {result.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ${result.price}/month
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* at the end of the search results */}
          <div className="border-t pt-3">
            <p
              onClick={() =>
                router.push(
                  `/listings?${searchQuery ? `searchTerm=${searchQuery}` : ""}`
                )
              }
              className="text-center font-medium text-primary hover:text-primary/80 cursor-pointer transition-colors py-2 rounded-md hover:bg-muted/50"
            >
              View all results
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Searchbar;
