import API from "./axiosConfig";

export const generateForecastApi = (days = 7, model = "linear_regression") => {
  return API.post(`/forecast/generate?days=${days}&model=${model}`);
};

export const getForecastComparisonApi = () => {
  return API.get("/forecast-comparison/multi-model");
};

export const getAccuracyTrendsApi = () => {
  return API.get("/forecast-comparison/accuracy-trends");
};

export const getConfidenceScoresApi = () => {
  return API.get("/forecast-comparison/confidence");
};

export const getBusinessRecommendationsApi = () => {
  return API.get("/forecast-comparison/business-recommendations");
};