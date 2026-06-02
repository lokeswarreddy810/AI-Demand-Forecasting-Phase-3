import { useEffect, useState } from "react";
import {
  getForecastComparison,
  getAccuracyTrends,
  getConfidenceScores,
  getBusinessRecommendations,
} from "../services/forecastService";

import ForecastComparisonChart from "../components/charts/ForecastComparisonChart";
import AccuracyTrendChart from "../components/charts/AccuracyTrendChart";
import ConfidenceScoreChart from "../components/charts/ConfidenceScoreChart";

import PageLoader from "../components/loaders/PageLoader";
import ReusableTable from "../components/tables/ReusableTable";

function ForecastComparison() {
  const [comparison, setComparison] = useState([]);
  const [accuracyTrends, setAccuracyTrends] = useState([]);
  const [confidence, setConfidence] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadComparison = async () => {
    try {
      setLoading(true);

      const comparisonData =
        await getForecastComparison();

      setComparison(
        Array.isArray(comparisonData)
          ? comparisonData
          : []
      );

      const trendsData =
        await getAccuracyTrends();

      setAccuracyTrends(
        Array.isArray(trendsData)
          ? trendsData
          : []
      );

      const confidenceData =
        await getConfidenceScores();

      setConfidence(
        Array.isArray(confidenceData)
          ? confidenceData
          : []
      );

      const recommendationData =
        await getBusinessRecommendations();

      setRecommendations(
        Array.isArray(recommendationData)
          ? recommendationData
          : []
      );
    } catch (error) {
      console.log(
        "Forecast Comparison Error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComparison();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  const comparisonRows = comparison.map(
    (item) => [
      item.model_name,
      `${item.accuracy}%`,
      `${item.confidence_score}%`,
    ]
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#123f1f] dark:text-white">
          Forecast Comparison & Insights
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Compare AI models, accuracy trends,
          confidence scores, and business
          recommendations.
        </p>
      </div>

      <Section title="Multi-Model Forecast Comparison Dashboard">
        <ForecastComparisonChart
          data={comparison}
        />

        <div className="mt-8">
          <ReusableTable
            headers={[
              "Model",
              "Accuracy",
              "Confidence Score",
            ]}
            rows={comparisonRows}
            emptyMessage="No comparison data available"
          />
        </div>
      </Section>

      <Section title="Model Accuracy Trends">
        <AccuracyTrendChart
          data={accuracyTrends}
        />
      </Section>

      <Section title="Forecasting Confidence Score Visualization">
        <ConfidenceScoreChart
          data={confidence}
        />
      </Section>

      <Section title="Trend-Based Business Recommendations">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendations.length === 0 ? (
            <div className="text-gray-500 dark:text-gray-300">
              No recommendations available
            </div>
          ) : (
            recommendations.map(
              (item, index) => (
                <div
                  key={index}
                  className="bg-[#f5fff0] dark:bg-[#2a2a2a] p-5 rounded-xl border border-green-300 dark:border-gray-700"
                >
                  <h3 className="font-bold text-[#123f1f] dark:text-white mb-2">
                    Recommendation {index + 1}
                  </h3>

                  <p className="text-gray-700 dark:text-gray-300">
                    {item.recommendation}
                  </p>
                </div>
              )
            )
          )}
        </div>
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
}) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-md border border-green-300 dark:border-gray-700 mb-10">
      <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-6">
        {title}
      </h2>

      {children}
    </div>
  );
}

export default ForecastComparison;