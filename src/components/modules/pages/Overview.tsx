"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  Package,
  ShoppingCart,
  TrendingUp,
  DollarSign,
  Eye,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Activity,
} from "lucide-react";
import Link from "next/link";
import { useGetDetailedStatisticsQuery } from "@/redux/api/extraApi";

export interface TGrowthMetrics {
  users: number;
  listings: number;
  orders: number;
  revenue: number;
}

export interface TStatistics {
  totalUsers: number;
  totalListings: number;
  totalOrders: number;
  totalRevenue: number;
  monthlyGrowth: TGrowthMetrics;
  yearlyGrowth: TGrowthMetrics;
}

const Overview = () => {
  const { data: stats, isFetching } = useGetDetailedStatisticsQuery(undefined);

  const recentActivities = [
    {
      id: 1,
      type: "user",
      message: "New user registered: john.doe@example.com",
      time: "2 minutes ago",
    },
    {
      id: 2,
      type: "listing",
      message: "New listing created: Modern Apartment in Downtown",
      time: "15 minutes ago",
    },
    {
      id: 3,
      type: "order",
      message: "Order #1234 completed successfully",
      time: "1 hour ago",
    },
    {
      id: 4,
      type: "user",
      message: "User profile updated: jane.smith@example.com",
      time: "2 hours ago",
    },
  ];

  const quickActions = [
    {
      title: "Manage Users",
      description: "View and manage user accounts",
      href: "/dashboard/admin/user-management",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Manage Listings",
      description: "Review and moderate listings",
      href: "/dashboard/admin/listing-management",
      icon: Package,
      color: "bg-green-500",
    },
    {
      title: "Categories",
      description: "Manage listing categories",
      href: "/dashboard/admin/category-management",
      icon: Plus,
      color: "bg-purple-500",
    },
    {
      title: "View All Listings",
      description: "Browse all property listings",
      href: "/listings",
      icon: Eye,
      color: "bg-orange-500",
    },
  ];

  const StatCard = ({
    title,
    value,
    growth,
    icon: Icon,
    prefix = "",
    suffix = "",
  }: {
    title: string;
    value: number;
    growth: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any;
    prefix?: string;
    suffix?: string;
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {prefix}
          {value?.toLocaleString() || 0}
          {suffix}
        </div>
        <div className="flex items-center text-xs text-muted-foreground mt-1">
          {growth > 0 ? (
            <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
          ) : growth < 0 ? (
            <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
          ) : null}
          <span
            className={
              growth > 0
                ? "text-green-500"
                : growth < 0
                ? "text-red-500"
                : "text-muted-foreground"
            }
          >
            {growth > 0 ? "+" : ""}
            {growth}%
          </span>
          <span className="ml-1">from last month</span>
        </div>
      </CardContent>
    </Card>
  );

  // Handle loading state
  if (isFetching) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Dashboard Overview
            </h1>
            <p className="text-muted-foreground">Loading statistics...</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3 mt-2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s what&apos;s happening with Lagbe Kichu
            today.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Users"
          value={stats?.totalUsers || 0}
          growth={stats?.monthlyGrowth?.users || 0}
          icon={Users}
        />
        <StatCard
          title="Total Listings"
          value={stats?.totalListings || 0}
          growth={stats?.monthlyGrowth?.listings || 0}
          icon={Package}
        />
        <StatCard
          title="Total Orders"
          value={stats?.totalOrders || 0}
          growth={stats?.monthlyGrowth?.orders || 0}
          icon={ShoppingCart}
        />
        <StatCard
          title="Total Revenue"
          value={stats?.totalRevenue || 0}
          growth={stats?.monthlyGrowth?.revenue || 0}
          icon={DollarSign}
          prefix="$"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Quick Actions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              {quickActions.map((action) => (
                <Link key={action.title} href={action.href}>
                  <Card className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${action.color}`}>
                          <action.icon className="h-4 w-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm">
                            {action.title}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1">
                            {action.description}
                          </p>
                        </div>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <Badge
                      variant={
                        activity.type === "user"
                          ? "default"
                          : activity.type === "listing"
                          ? "secondary"
                          : "outline"
                      }
                      className="text-xs"
                    >
                      {activity.type}
                    </Badge>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">
                      {activity.message}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4">
              View All Activities
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Yearly Growth Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Yearly Growth Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm font-medium">Users Growth</p>
                <p className="text-xs text-muted-foreground">Year over year</p>
              </div>
              <div className="flex items-center">
                {(stats?.yearlyGrowth?.users || 0) > 0 ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                ) : (stats?.yearlyGrowth?.users || 0) < 0 ? (
                  <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                ) : null}
                <Badge
                  className={`${
                    (stats?.yearlyGrowth?.users || 0) > 0
                      ? "bg-green-500"
                      : (stats?.yearlyGrowth?.users || 0) < 0
                      ? "bg-red-500"
                      : "bg-gray-500"
                  }`}
                >
                  {(stats?.yearlyGrowth?.users || 0) > 0 ? "+" : ""}
                  {stats?.yearlyGrowth?.users || 0}%
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="text-sm font-medium">Listings Growth</p>
                <p className="text-xs text-muted-foreground">Year over year</p>
              </div>
              <div className="flex items-center">
                {(stats?.yearlyGrowth?.listings || 0) > 0 ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                ) : (stats?.yearlyGrowth?.listings || 0) < 0 ? (
                  <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                ) : null}
                <Badge
                  className={`${
                    (stats?.yearlyGrowth?.listings || 0) > 0
                      ? "bg-green-500"
                      : (stats?.yearlyGrowth?.listings || 0) < 0
                      ? "bg-red-500"
                      : "bg-gray-500"
                  }`}
                >
                  {(stats?.yearlyGrowth?.listings || 0) > 0 ? "+" : ""}
                  {stats?.yearlyGrowth?.listings || 0}%
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div>
                <p className="text-sm font-medium">Orders Growth</p>
                <p className="text-xs text-muted-foreground">Year over year</p>
              </div>
              <div className="flex items-center">
                {(stats?.yearlyGrowth?.orders || 0) > 0 ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                ) : (stats?.yearlyGrowth?.orders || 0) < 0 ? (
                  <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                ) : null}
                <Badge
                  className={`${
                    (stats?.yearlyGrowth?.orders || 0) > 0
                      ? "bg-green-500"
                      : (stats?.yearlyGrowth?.orders || 0) < 0
                      ? "bg-red-500"
                      : "bg-gray-500"
                  }`}
                >
                  {(stats?.yearlyGrowth?.orders || 0) > 0 ? "+" : ""}
                  {stats?.yearlyGrowth?.orders || 0}%
                </Badge>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div>
                <p className="text-sm font-medium">Revenue Growth</p>
                <p className="text-xs text-muted-foreground">Year over year</p>
              </div>
              <div className="flex items-center">
                {(stats?.yearlyGrowth?.revenue || 0) > 0 ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                ) : (stats?.yearlyGrowth?.revenue || 0) < 0 ? (
                  <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                ) : null}
                <Badge
                  className={`${
                    (stats?.yearlyGrowth?.revenue || 0) > 0
                      ? "bg-green-500"
                      : (stats?.yearlyGrowth?.revenue || 0) < 0
                      ? "bg-red-500"
                      : "bg-gray-500"
                  }`}
                >
                  {(stats?.yearlyGrowth?.revenue || 0) > 0 ? "+" : ""}
                  {stats?.yearlyGrowth?.revenue || 0}%
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="text-sm font-medium">API Status</p>
                <p className="text-xs text-muted-foreground">
                  All systems operational
                </p>
              </div>
              <Badge className="bg-green-500">Online</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="text-sm font-medium">Database</p>
                <p className="text-xs text-muted-foreground">
                  Response time: 45ms
                </p>
              </div>
              <Badge className="bg-blue-500">Healthy</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div>
                <p className="text-sm font-medium">Storage</p>
                <p className="text-xs text-muted-foreground">
                  78% capacity used
                </p>
              </div>
              <Badge className="bg-orange-500">Good</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Overview;
