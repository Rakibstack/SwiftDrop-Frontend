

export interface AIShipmentOverview {
  totalUsers: number;
  activeUsers: number;
  activeRiders: number;
  totalShipments: number;
  pendingShipments: number;
  confirmedShipments: number;
  cancelledShipments: number;
  deliveredShipments: number;
  todayShipments: number;
}

export interface AIRevenueTrend {
  date: string;
  revenue: number;
}

export interface AIRevenueMetrics {
  totalPaidAmount: number;
  totalPaidTransactions: number;
  todayPaidAmount: number;
  todayPaidTransactions: number;
  trend: AIRevenueTrend[];
}

export interface AICalculatedMetrics {
  cancellationRatePercent: number;
  deliveredSharePercent: number;
  paymentPendingSharePercent: number;
}

export interface AIInsightsMetrics {
  overview: AIShipmentOverview;
  revenue: AIRevenueMetrics;
  calculatedMetrics: AICalculatedMetrics;
}

export interface AIInsightsData {
  generatedAt: string;
  metrics: AIInsightsMetrics;
  insights: string;
}

export interface AIInsightsResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: AIInsightsData;
}
