import { useEffect, useState } from "react";
import API from "../api/axiosConfig";
import PageLoader from "../components/loaders/PageLoader";
import ReusableTable from "../components/tables/ReusableTable";

function Reports() {
  const [forecastData, setForecastData] = useState([]);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);

  const downloadFile = async (url, filename) => {
    try {
      const response = await API.get(url, {
        responseType: "blob",
      });

      const blob = new Blob([response.data]);
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(downloadUrl);

      window.dispatchEvent(
        new CustomEvent("notification-updated")
      );
    } catch (error) {
      console.log(
        "Download Error:",
        error.response?.data || error.message
      );

      alert("File download failed");
    }
  };

  const loadReports = async () => {
    try {
      setLoading(true);

      const forecastRes = await API.post(
        "/forecast/generate?days=7&model=linear_regression"
      );

      const summaryRes = await API.get("/analytics/summary");

      setForecastData(
        forecastRes.data?.forecast ||
          forecastRes.data?.data ||
          []
      );

      setSummary(summaryRes.data || {});
    } catch (error) {
      console.log(
        "Reports Error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  const comparisonData = Object.values(
    forecastData.reduce((acc, item) => {
      if (!acc[item.product_name]) {
        acc[item.product_name] = {
          product_name: item.product_name,
          count: 0,
          total: 0,
        };
      }

      acc[item.product_name].count += 1;
      acc[item.product_name].total += Number(
        item.predicted_quantity || 0
      );

      return acc;
    }, {})
  );

  const totalPredictedRevenue = forecastData.reduce(
    (sum, item) =>
      sum + Number(item.predicted_revenue || 0),
    0
  );

  const avgAccuracy =
    forecastData.length > 0
      ? (
          forecastData.reduce(
            (sum, item) =>
              sum + Number(item.accuracy || 0),
            0
          ) / forecastData.length
        ).toFixed(2)
      : 0;

  const comparisonRows = comparisonData.map((item) => [
    item.product_name,
    item.count,
    item.total.toFixed(2),
  ]);

  const forecastRows = forecastData.map((item) => [
    item.product_name,
    item.forecast_date,
    item.predicted_quantity,
    `₹ ${item.predicted_revenue}`,
    `${item.accuracy}%`,
    item.model_used,
    item.inventory_recommendation,
  ]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#123f1f] dark:text-white">
          Reports & AI Business Insights
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Generate reports, business insights, analytics summaries and
          forecasting comparisons.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <Card
          title="Current Sales"
          value={`₹ ${summary.total_sales || 0}`}
        />

        <Card
          title="Forecast Revenue"
          value={`₹ ${totalPredictedRevenue.toFixed(2)}`}
        />

        <Card
          title="Forecast Records"
          value={forecastData.length}
        />

        <Card
          title="Avg Accuracy"
          value={`${avgAccuracy}%`}
        />
      </div>

      <Section title="AI Generated Business Insights">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Insight
            title="Sales Insight"
            text={`Current sales are ₹ ${
              summary.total_sales || 0
            }. Forecast revenue is ₹ ${totalPredictedRevenue.toFixed(
              2
            )}.`}
          />

          <Insight
            title="Demand Insight"
            text="Products with higher predicted quantity should be stocked early."
          />

          <Insight
            title="Inventory Insight"
            text="Follow inventory recommendations to reduce overstock and stockout risk."
          />
        </div>
      </Section>

      <Section title="Download Analytics Summary">
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() =>
              downloadFile(
                "/reports/export-excel",
                "forecast_report.xlsx"
              )
            }
            className="bg-[#9dff00] hover:bg-[#8ee600] text-[#032b11] font-bold px-8 py-3 rounded-xl"
          >
            Export Excel
          </button>

          <button
            onClick={() =>
              downloadFile(
                "/reports/export-pdf",
                "forecast_report.pdf"
              )
            }
            className="bg-[#06451d] hover:bg-[#0b5e28] text-white font-bold px-8 py-3 rounded-xl"
          >
            Export PDF
          </button>
        </div>
      </Section>

      <Section title="Forecasting Comparison Report">
        <ReusableTable
          headers={[
            "Product",
            "Forecast Count",
            "Total Predicted Quantity",
          ]}
          rows={comparisonRows}
          emptyMessage="No comparison data available"
        />
      </Section>

      <Section title="Detailed Forecasting Report View">
        <ReusableTable
          headers={[
            "Product",
            "Forecast Date",
            "Predicted Quantity",
            "Revenue",
            "Accuracy",
            "Model",
            "Recommendation",
          ]}
          rows={forecastRows}
          emptyMessage="No forecast data available"
        />
      </Section>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl shadow-md border border-green-300 dark:border-gray-700">
      <p className="text-gray-500 dark:text-gray-300">
        {title}
      </p>

      <h2 className="text-3xl font-bold text-[#123f1f] dark:text-white mt-3">
        {value}
      </h2>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-md border border-green-300 dark:border-gray-700 mb-10">
      <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-6">
        {title}
      </h2>

      {children}
    </div>
  );
}

function Insight({ title, text }) {
  return (
    <div className="bg-[#f5fff0] dark:bg-[#2a2a2a] p-5 rounded-xl border border-green-300 dark:border-gray-700">
      <h3 className="font-bold text-[#123f1f] dark:text-white mb-2">
        {title}
      </h3>

      <p className="text-gray-700 dark:text-gray-300">
        {text}
      </p>
    </div>
  );
}

export default Reports;