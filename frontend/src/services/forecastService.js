import {
  generateForecastApi,
  getForecastComparisonApi,
  getAccuracyTrendsApi,
  getConfidenceScoresApi,
  getBusinessRecommendationsApi,
} from "../api/forecastApi";

export const generateForecast = async (
  days = 7,
  model = "linear_regression"
) => {
  const response = await generateForecastApi(days, model);
  return response.data;
};

export const getForecastComparison = async () => {
  const response = await getForecastComparisonApi();
  return response.data;
};

export const getAccuracyTrends = async () => {
  const response = await getAccuracyTrendsApi();
  return response.data;
};

export const getConfidenceScores = async () => {
  const response = await getConfidenceScoresApi();
  return response.data;
};

export const getBusinessRecommendations = async () => {
  const response = await getBusinessRecommendationsApi();
  return response.data;
};