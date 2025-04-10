/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { getListingLocations } from "@/services/ListingService";
import { Checkbox } from "../ui/checkbox";

const Filter = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [locations, setLocations] = useState<[{ location: string }] | []>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  useEffect(() => {
    const fetchLocations: any = async () => {
      const res = await getListingLocations();
      setLocations(res?.data);
    };

    fetchLocations();
  }, [pathname, router]);

  const handleFilter = (query: {
    houseLocation?: string[];
    [key: string]: any;
  }) => {
    const params = new URLSearchParams();

    if (Number(query.bedrooms) > 0) {
      params.set("bedroomNumber", Number(query.bedrooms).toString());
    }

    if (Number(query.minPrice) && Number(query.minPrice) > 0) {
      params.set("minPrice", Number(query.minPrice).toString());
      params.set("maxPrice", Number(query.maxPrice).toString());
    }

    if (query.availability !== undefined) {
      params.set("availability", String(query.availability));
    }

    if (Array.isArray(query.houseLocation)) {
      params.set("houseLocation", query.houseLocation.join(", "));
    }

    router.push(`/listings?${params.toString()}`);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent className="px-3 md:px-8 bg-sidebar">
        <SheetDescription></SheetDescription>
        <SheetHeader>
          <SheetTitle>Filter Listings</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 mt-4">
          {/* price range here  */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Price Range</label>
            <div className="pt-2">
              <Slider
                defaultValue={[0, 50000]}
                max={50000}
                step={500}
                value={priceRange}
                onValueChange={(priceRange) => {
                  setPriceRange(priceRange);
                  handleFilter({
                    minPrice: priceRange[0],
                    maxPrice: priceRange[1],
                  });
                }}
                className="my-4"
              />
              <div className="flex justify-between text-sm">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>

          {/* locations here  */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Location</label>
            <Command className="bg-chart-5">
              <CommandInput placeholder="Type a location or search..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {locations?.map((location) => (
                    <CommandItem
                      key={location.location}
                      onSelect={(value) => {
                        setSelectedLocations((prev) => {
                          if (prev.includes(value)) {
                            return prev.filter((loc) => loc !== value);
                          }
                          return [...prev, value];
                        });
                        handleFilter({
                          houseLocation: [...selectedLocations, value],
                        });
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={selectedLocations.includes(
                            location.location
                          )}
                        />
                        {location.location}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>

          {/* bedroom here  */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Bedrooms</label>
            <Input
              type="number"
              min={1}
              placeholder="Number of bedrooms"
              onChange={(e) => {
                handleFilter({
                  bedrooms: Number(e.target.value),
                });
              }}
            />
          </div>

          {/* availability here  */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Availability</label>
            <RadioGroup
              onValueChange={(value) => {
                handleFilter({
                  availability: value === "true" ? "true" : "false",
                });
              }}
              className="flex flex-col space-y-1 mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="true" id="available" />
                <Label htmlFor="available">Available</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="false" id="rented" />
                <Label htmlFor="rented">Rented</Label>
              </div>
            </RadioGroup>
          </div>
        </div>

        <Button
          variant={"outline"}
          className="w-full mt-4"
          onClick={() => {
            handleFilter({});
            setSelectedLocations([]);
          }}
        >
          Clear
        </Button>
      </SheetContent>
    </Sheet>
  );
};

export default Filter;
