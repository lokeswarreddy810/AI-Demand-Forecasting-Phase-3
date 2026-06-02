import API from "./axiosConfig";

export const getSummaryApi = () => API.get("/analytics/summary");
export const getMonthlySalesApi = () => API.get("/analytics/monthly-sales");
export const getTopProductsApi = () => API.get("/analytics/top-products");
export const getCategorySalesApi = () => API.get("/analytics/category-sales");
export const getRegionSalesApi = () => API.get("/analytics/region-sales");
export const getRevenuePredictionApi = () => API.get("/analytics/revenue-prediction");
export const getInventoryRiskApi = () => API.get("/analytics/inventory-risk");

export const getDashboardWidgetsApi = () => {
  return API.get("/dashboard-settings/widgets");
};

export const createDashboardWidgetApi = (widgetName, widgetType) => {
  return API.post(
    `/dashboard-settings/widgets?widget_name=${widgetName}&widget_type=${widgetType}`
  );
};

export const toggleDashboardWidgetApi = (widgetId) => {
  return API.patch(`/dashboard-settings/widgets/${widgetId}`);
};

export const downloadDashboardSummaryApi = () => {
  return API.get("/dashboard-settings/download-summary");
};

export const getKpiCardsApi = () => {
  return API.get("/dashboard-settings/kpi-cards");
};

export const getDrillDownAnalyticsApi = () => {
  return API.get("/dashboard-settings/drill-down");
};