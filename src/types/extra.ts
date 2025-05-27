export type TStatistics = {
  totalUsers: number;
  totalActiveUsers: number;
  totalProducts: number;
  totalAvailableProducts: number;
  userBreakdown: {
    admins: {
      total: number;
      active: number;
    };
    sellers: {
      total: number;
      active: number;
    };
    buyers: {
      total: number;
      active: number;
    };
  };
};
