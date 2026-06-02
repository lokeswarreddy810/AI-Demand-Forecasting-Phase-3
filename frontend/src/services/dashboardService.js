import {
  getSummaryApi,
  getMonthlySalesApi,
  getTopProductsApi,
  getCategorySalesApi,
  getRegionSalesApi,
  getRevenuePredictionApi,
  getInventoryRiskApi,
  getDashboardWidgetsApi,
  createDashboardWidgetApi,
  toggleDashboardWidgetApi,
  downloadDashboardSummaryApi,
  getKpiCardsApi,
  getDrillDownAnalyticsApi,
} from "../api/dashboardApi";

export const getDashboardSummary = async () => {
  const response = await getSummaryApi();
  return response.data;
};

export const getMonthlySales = async () => {
  const response = await getMonthlySalesApi();
  return response.data;
};

export const getTopProducts = async () => {
  const response = await getTopProductsApi();
  return response.data;
};

export const getCategorySales = async () => {
  const response = await getCategorySalesApi();
  return response.data;
};

export const getRegionSales = async () => {
  const response = await getRegionSalesApi();
  return response.data;
};

export const getRevenuePrediction = async () => {
  const response = await getRevenuePredictionApi();
  return response.data;
};

export const getInventoryRisk = async () => {
  const response = await getInventoryRiskApi();
  return response.data;
};

export const getDashboardWidgets = async () => {
  const response = await getDashboardWidgetsApi();
  return response.data;
};

export const createDashboardWidget = async (widgetName, widgetType) => {
  const response = await createDashboardWidgetApi(widgetName, widgetType);
  return response.data;
};

export const toggleDashboardWidget = async (widgetId) => {
  const response = await toggleDashboardWidgetApi(widgetId);
  return response.data;
};

export const downloadDashboardSummary = async () => {
  const response = await downloadDashboardSummaryApi();
  return response.data;
};

export const getKpiCards = async () => {
  const response = await getKpiCardsApi();
  return response.data;
};

export const getDrillDownAnalytics = async () => {
  const response = await getDrillDownAnalyticsApi();
  return response.data;
};