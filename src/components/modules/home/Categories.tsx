"use client";

import { useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { isValidImageUrl } from "@/lib/utils";

export type TCategory = {
  _id: string;
  title: string;
  image: string;
  description?: string;
};

const Categories = () => {
  const { data: categories, isFetching } = useGetAllCategoriesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const router = useRouter();

  const handleCategoryClick = (categoryId: string) => {
    const params = new URLSearchParams();
    params.set("category", categoryId);
    router.push(`/listings?${params.toString()}`);
  };

  if (isFetching) {
    return (
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Browse by Categories
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover what you need across our diverse range of categories
            </p>
          </div>

          {/* Loading Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="aspect-square bg-muted"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-full"></div>
                    <div className="h-3 bg-muted rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!categories?.success || !categories?.data?.length) {
    return (
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Browse by Categories
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Discover what you need across our diverse range of categories
            </p>
            <div className="bg-card border border-border rounded-2xl p-12">
              <div className="text-6xl mb-4">📂</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No Categories Available
              </h3>
              <p className="text-muted-foreground">
                Categories will appear here once they are added by
                administrators.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Browse by <span className="text-primary">Categories</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover what you need across our diverse range of categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(200px,100%),1fr))] gap-6">
          {categories.data.map((category: TCategory) => (
            <div
              key={category._id}
              onClick={() => handleCategoryClick(category._id)}
              className="group cursor-pointer bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-primary/20 transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Category Image */}
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={
                    isValidImageUrl(category.image)
                      ? category.image
                      : "https://res.cloudinary.com/dchqfpvjb/image/upload/v1744367811/CJrg-LWjjfsCEAE_rlwotv.png"
                  }
                  alt={category.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Category Info */}
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-1">
                  {category.title}
                </h3>
                {category.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {category.description}
                  </p>
                )}
                <div className="flex items-center text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <span>Explore Category</span>
                  <svg
                    className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Categories Button */}
        {categories.data.length > 10 && (
          <div className="text-center mt-12">
            <button
              onClick={() => router.push("/listings")}
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200"
            >
              View All Categories
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;
