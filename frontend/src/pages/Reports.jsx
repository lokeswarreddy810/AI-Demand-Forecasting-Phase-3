import { useEffect, useState } from "react";
import API from "../api/axiosConfig";

function Reports() {
  const [forecastData, setForecastData] = useState([]);
  const [summary, setSummary] = useState({});

  const loadReports = async () => {
    try {
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
      console.log("Reports Error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

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
      acc[item.product_name].total += Number(item.predicted_quantity || 0);

      return acc;
    }, {})
  );

  const totalPredictedRevenue = forecastData.reduce(
    (sum, item) => sum + Number(item.predicted_revenue || 0),
    0
  );

  const avgAccuracy =
    forecastData.length > 0
      ? (
          forecastData.reduce(
            (sum, item) => sum + Number(item.accuracy || 0),
            0
          ) / forecastData.length
        ).toFixed(2)
      : 0;

  return (
    <div>
      <h1 className="text-4xl font-bold text-[#123f1f] dark:text-white mb-8">
        Reports & AI Business Insights
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <Card title="Current Sales" value={`₹ ${summary.total_sales || 0}`} />
        <Card title="Forecast Revenue" value={`₹ ${totalPredictedRevenue.toFixed(2)}`} />
        <Card title="Forecast Records" value={forecastData.length} />
        <Card title="Avg Accuracy" value={`${avgAccuracy}%`} />
      </div>

      <Section title="AI Generated Business Insights">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Insight
            title="Sales Insight"
            text={`Current sales are ₹ ${summary.total_sales || 0}. Forecast revenue is ₹ ${totalPredictedRevenue.toFixed(2)}.`}
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
        <div className="flex gap-4">
          <button
            onClick={() => alert("Excel Export Started")}
            className="bg-[#9dff00] text-[#032b11] font-bold px-8 py-3 rounded-xl"
          >
            Export Excel
          </button>

          <button
            onClick={() => alert("PDF Export Started")}
            className="bg-[#123f1f] text-white font-bold px-8 py-3 rounded-xl"
          >
            Export PDF
          </button>
        </div>
      </Section>

      <Section title="Forecasting Comparison Report">
        <div className="overflow-x-auto max-h-[350px] overflow-y-auto rounded-xl border border-green-200">
          <table className="w-full min-w-[1000px]">
            <thead className="sticky top-0 bg-white dark:bg-[#1e1e1e] z-10">
              <tr className="border-b border-green-200 text-left">
                <th className="py-3 px-3">Product</th>
                <th className="py-3 px-3">Forecast Count</th>
                <th className="py-3 px-3">Total Predicted Quantity</th>
              </tr>
            </thead>

            <tbody>
              {comparisonData.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center py-8 text-gray-500">
                    No comparison data available
                  </td>
                </tr>
              ) : (
                comparisonData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-4 px-3">{item.product_name}</td>
                    <td className="py-4 px-3">{item.count}</td>
                    <td className="py-4 px-3">{item.total.toFixed(2)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Detailed Forecasting Report View">
        <div className="overflow-x-auto max-h-[450px] overflow-y-auto rounded-xl border border-green-200">
          <table className="w-full min-w-[1200px]">
            <thead className="sticky top-0 bg-white dark:bg-[#1e1e1e] z-10">
              <tr className="border-b border-green-200 text-left">
                <th className="py-3 px-3">Product</th>
                <th className="py-3 px-3">Forecast Date</th>
                <th className="py-3 px-3">Predicted Quantity</th>
                <th className="py-3 px-3">Revenue</th>
                <th className="py-3 px-3">Accuracy</th>
                <th className="py-3 px-3">Model</th>
                <th className="py-3 px-3">Recommendation</th>
              </tr>
            </thead>

            <tbody>
              {forecastData.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-8 text-gray-500">
                    No forecast report data available
                  </td>
                </tr>
              ) : (
                forecastData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-4 px-3">{item.product_name}</td>
                    <td className="py-4 px-3">{item.forecast_date}</td>
                    <td className="py-4 px-3">{item.predicted_quantity}</td>
                    <td className="py-4 px-3">₹ {item.predicted_revenue}</td>
                    <td className="py-4 px-3">{item.accuracy}%</td>
                    <td className="py-4 px-3">{item.model_used}</td>
                    <td className="py-4 px-3">{item.inventory_recommendation}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl shadow-md border border-green-200">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-3xl font-bold text-[#123f1f] dark:text-white mt-3">
        {value}
      </h2>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-md border border-green-200 mb-10">
      <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-6">
        {title}
      </h2>
      {children}
    </div>
  );
}

function Insight({ title, text }) {
  return (
    <div className="bg-[#f5fff0] dark:bg-[#2a2a2a] p-5 rounded-xl border border-green-200">
      <h3 className="font-bold text-[#123f1f] dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{text}</p>
    </div>
  );
}

export default Reports;