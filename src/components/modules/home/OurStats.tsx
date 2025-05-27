"use client";

import { useGetStatisticsQuery } from "@/redux/api/extraApi";
import { TStatistics } from "@/types";
import {
  Users,
  Package,
  UserCheck,
  ShoppingBag,
  Shield,
  Store,
} from "lucide-react";

const OurStats = () => {
  const { data, isFetching } = useGetStatisticsQuery(undefined);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K";
    }
    return num.toString();
  };

  const getActivePercentage = (active: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((active / total) * 100);
  };

  if (isFetching) {
    return (
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Our Growing Community
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join thousands of satisfied users in our thriving marketplace
            </p>
          </div>

          {/* Loading Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-card border border-border rounded-2xl p-6 h-32">
                  <div className="h-6 bg-muted rounded mb-4"></div>
                  <div className="h-8 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-card border border-border rounded-2xl p-6 h-40">
                  <div className="h-6 bg-muted rounded mb-4"></div>
                  <div className="h-8 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!data?.success || !data?.data) {
    return (
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Our Growing Community
            </h2>
            <div className="bg-card border border-border rounded-2xl p-12">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Statistics Coming Soon
              </h3>
              <p className="text-muted-foreground">
                We&apos;re gathering the latest statistics to show you our
                community growth.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const stats: TStatistics = data.data;

  const mainStats = [
    {
      icon: Users,
      title: "Total Users",
      value: stats.totalUsers,
      subtitle: `${formatNumber(stats.totalActiveUsers)} active`,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      percentage: getActivePercentage(stats.totalActiveUsers, stats.totalUsers),
    },
    {
      icon: UserCheck,
      title: "Active Users",
      value: stats.totalActiveUsers,
      subtitle: `${getActivePercentage(
        stats.totalActiveUsers,
        stats.totalUsers
      )}% of total`,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      percentage: getActivePercentage(stats.totalActiveUsers, stats.totalUsers),
    },
    {
      icon: Package,
      title: "Total Products",
      value: stats.totalProducts,
      subtitle: `${formatNumber(stats.totalAvailableProducts)} available`,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      percentage: getActivePercentage(
        stats.totalAvailableProducts,
        stats.totalProducts
      ),
    },
    {
      icon: ShoppingBag,
      title: "Available Products",
      value: stats.totalAvailableProducts,
      subtitle: `${getActivePercentage(
        stats.totalAvailableProducts,
        stats.totalProducts
      )}% of total`,
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
      percentage: getActivePercentage(
        stats.totalAvailableProducts,
        stats.totalProducts
      ),
    },
  ];

  const userBreakdownStats = [
    {
      icon: Shield,
      title: "Admins",
      total: stats.userBreakdown.admins.total,
      active: stats.userBreakdown.admins.active,
      color: "text-red-500",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20",
    },
    {
      icon: Store,
      title: "Sellers",
      total: stats.userBreakdown.sellers.total,
      active: stats.userBreakdown.sellers.active,
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
      borderColor: "border-indigo-500/20",
    },
    {
      icon: Users,
      title: "Buyers",
      total: stats.userBreakdown.buyers.total,
      active: stats.userBreakdown.buyers.active,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            Live Statistics
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our Growing <span className="text-primary">Community</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of satisfied users in our thriving marketplace
            ecosystem
          </p>
        </div>

        {/* Main Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {mainStats.map((stat, index) => (
            <div
              key={stat.title}
              className="group bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-300 transform hover:-translate-y-1"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div
                  className={`text-xs font-medium px-2 py-1 rounded-full ${stat.bgColor} ${stat.color}`}
                >
                  {stat.percentage}%
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </h3>
                <p className="text-2xl font-bold text-foreground">
                  {formatNumber(stat.value)}
                </p>
                <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
              </div>

              {/* Progress Bar */}
              <div className="mt-4 w-full bg-muted rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-1000 ease-out ${stat.color.replace(
                    "text-",
                    "bg-"
                  )}`}
                  style={{ width: `${stat.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* User Breakdown */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-foreground mb-2">
              User Breakdown
            </h3>
            <p className="text-muted-foreground">
              Distribution of users across different roles in our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {userBreakdownStats.map((userType, index) => (
              <div
                key={userType.title}
                className={`group bg-card border-2 ${userType.borderColor} rounded-2xl p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
                style={{
                  animationDelay: `${(index + 4) * 100}ms`,
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${userType.bgColor}`}>
                    <userType.icon className={`w-6 h-6 ${userType.color}`} />
                  </div>
                  <div
                    className={`text-xs font-medium px-2 py-1 rounded-full ${userType.bgColor} ${userType.color}`}
                  >
                    {getActivePercentage(userType.active, userType.total)}%
                    Active
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">
                    {userType.title}
                  </h3>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Total:
                    </span>
                    <span className="text-xl font-bold text-foreground">
                      {formatNumber(userType.total)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Active:
                    </span>
                    <span className={`text-lg font-semibold ${userType.color}`}>
                      {formatNumber(userType.active)}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-1000 ease-out ${userType.color.replace(
                        "text-",
                        "bg-"
                      )}`}
                      style={{
                        width: `${getActivePercentage(
                          userType.active,
                          userType.total
                        )}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStats;
