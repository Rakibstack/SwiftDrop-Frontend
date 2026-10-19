export type ShipmentStatus =
  | "PAYMENT_PENDING"
  | "PAYMENT_CONFIRMED"
  | "ASSIGNED"
  | "IN_TRANSIT"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELLED"
  | (string & {});

export interface AdminAnalyticsOverview {
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

export interface RevenueTrendItem {
  date: string;
  revenue: number;
}

export interface AdminRevenueAnalytics {
  totalPaidAmount: number;
  totalPaidTransactions: number;
  todayPaidAmount: number;
  todayPaidTransactions: number;
  trend: RevenueTrendItem[];
}

export interface RecentShipment {
  id: string;
  senderName: string;
  deliveryFee: string | number;
  recipientAddress: string;
  status: ShipmentStatus;
  createdAt: string;
}

export interface RecentActivity {
  id: string;
  description: string;
  status: ShipmentStatus;
  createdAt: string;
  shipmentId: string;
}

export interface AdminAnalyticsData {
  overview: AdminAnalyticsOverview;
  revenue: AdminRevenueAnalytics;
  recentShipments: RecentShipment[];
  recentActivities: RecentActivity[];
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export type AdminAnalyticsResponse = ApiResponse<AdminAnalyticsData>;
