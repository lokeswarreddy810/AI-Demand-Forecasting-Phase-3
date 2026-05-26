import { useState } from "react";
import API from "../api/axiosConfig";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
} from "recharts";

function Forecast() {
  const [forecastData, setForecastData] = useState([]);
  const [seasonalData, setSeasonalData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState("linear_regression");

  const generateForecast = async () => {
    try {
      setLoading(true);

      const response = await API.post(
        `/forecast/generate?days=7&model=${selectedModel}`
      );

      setForecastData(response.data?.forecast || response.data?.data || []);
      setSeasonalData(
        response.data?.seasonal_predictions ||
          response.data?.seasonal_data ||
          []
      );
    } catch (error) {
      console.log("Forecast Error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const totalRevenue = forecastData.reduce(
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
      <div className="flex items-center justify-between mb-8 gap-6">
        <div>
          <h1 className="text-4xl font-bold text-[#123f1f] dark:text-white">
            AI Forecast Prediction
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Generate forecast, revenue, accuracy, seasonal prediction and inventory recommendation.
          </p>
        </div>

        <div className="flex gap-4">
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="border border-green-300 rounded-xl px-4 py-3 bg-white text-black"
          >
            <option value="linear_regression">Linear Regression</option>
            <option value="random_forest">Random Forest</option>
            <option value="gradient_boosting">Gradient Boosting</option>
          </select>

          <button
            onClick={generateForecast}
            className="bg-[#9dff00] text-[#032b11] font-bold px-6 py-3 rounded-xl"
          >
            {loading ? "Generating..." : "Generate Forecast"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <Card title="Forecast Records" value={forecastData.length} />
        <Card title="Forecast Revenue" value={`₹ ${totalRevenue.toFixed(2)}`} />
        <Card title="Average Accuracy" value={`${avgAccuracy}%`} />
        <Card title="Model" value={selectedModel.replace("_", " ")} />
      </div>

      <ChartBox title="Forecast Trend">
        {forecastData.length === 0 ? (
          <EmptyText text="Click Generate Forecast to view chart" />
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="forecast_date" />
              <YAxis width={90} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="predicted_quantity"
                stroke="#123f1f"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </ChartBox>

      <ChartBox title="Seasonal Prediction">
        {seasonalData.length === 0 ? (
          <EmptyText text="No seasonal prediction available" />
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={seasonalData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis width={90} />
              <Tooltip />
              <Bar dataKey="predicted_sales" fill="#9dff00" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </ChartBox>

      <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-md border border-green-200">
        <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-6">
          Forecast Details
        </h2>

        <div className="overflow-x-auto max-h-[450px] overflow-y-auto rounded-xl border border-green-200">
          <table className="w-full min-w-[1200px]">
            <thead className="sticky top-0 bg-white dark:bg-[#1e1e1e] z-10">
              <tr className="border-b border-green-200 text-left">
                <th className="py-3 px-3">Product</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Quantity</th>
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
                    No forecast generated yet
                  </td>
                </tr>
              ) : (
                forecastData.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-4 px-3">{item.product_name}</td>
                    <td className="py-4 px-3">{item.forecast_date}</td>
                    <td className="py-4 px-3">{item.predicted_quantity}</td>
                    <td className="py-4 px-3">₹ {item.predicted_revenue || 0}</td>
                    <td className="py-4 px-3">{item.accuracy || 0}%</td>
                    <td className="py-4 px-3">{item.model_used || selectedModel}</td>
                    <td className="py-4 px-3">
                      {item.inventory_recommendation || "Safe Inventory"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
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

function ChartBox({ title, children }) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-md border border-green-200 mb-10">
      <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-6">
        {title}
      </h2>
      {children}
    </div>
  );
}

function EmptyText({ text }) {
  return (
    <div className="h-[300px] flex items-center justify-center text-gray-500">
      {text}
    </div>
  );
}

export default Forecast;