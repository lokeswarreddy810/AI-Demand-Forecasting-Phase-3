import { useEffect, useState } from "react";
import API from "../api/axiosConfig";
import DemandSpikeChart from "../components/charts/DemandSpikeChart";
import InventoryRiskChart from "../components/charts/InventoryRiskChart";

function AIRecommendations() {
  const [demandData, setDemandData] = useState([]);
  const [spikeData, setSpikeData] = useState([]);
  const [lowStockData, setLowStockData] = useState([]);
  const [optimizationData, setOptimizationData] = useState([]);

  const loadAIData = async () => {
    try {
      const demandRes = await API.get("/ai-recommendations/product-demand");
      const spikeRes = await API.get("/ai-recommendations/demand-spike");
      const lowStockRes = await API.get("/ai-recommendations/low-stock");
      const optimizationRes = await API.get(
        "/ai-recommendations/inventory-optimization"
      );

      setDemandData(Array.isArray(demandRes.data) ? demandRes.data : []);
      setSpikeData(Array.isArray(spikeRes.data) ? spikeRes.data : []);
      setLowStockData(Array.isArray(lowStockRes.data) ? lowStockRes.data : []);
      setOptimizationData(
        Array.isArray(optimizationRes.data) ? optimizationRes.data : []
      );
    } catch (error) {
      console.log("AI Recommendations Error:", error.response?.data || error);
    }
  };

  useEffect(() => {
    loadAIData();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-[#123f1f] dark:text-white">
            Advanced AI Recommendations
          </h1>

          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Product demand, buying behavior, demand spikes, low-stock prediction,
            and AI inventory optimization.
          </p>
        </div>

        <button
          onClick={loadAIData}
          className="bg-[#9dff00] text-[#032b11] font-bold px-6 py-3 rounded-xl"
        >
          Refresh
        </button>
      </div>

      <Section title="Product Demand Recommendation Engine">
        <Table
          headers={["Product", "Average Quantity", "Recommendation"]}
          rows={demandData.map((item) => [
            item.product_name,
            item.average_quantity,
            item.recommendation,
          ])}
        />
      </Section>

      <Section title="Demand Spike Prediction">
        <DemandSpikeChart data={spikeData} />

        <div className="mt-8">
          <Table
            headers={["Product", "Quantity Sold", "Message"]}
            rows={spikeData.map((item) => [
              item.product_name,
              item.quantity_sold,
              item.message,
            ])}
          />
        </div>
      </Section>

      <Section title="Low Stock Prediction System">
        <Table
          headers={["Product", "Average Quantity", "Prediction"]}
          rows={lowStockData.map((item) => [
            item.product_name,
            item.average_quantity,
            item.prediction,
          ])}
        />
      </Section>

      <Section title="AI-Based Inventory Optimization Suggestions">
        <InventoryRiskChart data={optimizationData} />

        <div className="mt-8">
          <Table
            headers={["Product", "Average Quantity", "Suggestion"]}
            rows={optimizationData.map((item) => [
              item.product_name,
              item.average_quantity,
              item.optimization_suggestion,
            ])}
          />
        </div>
      </Section>

      <Section title="Customer Buying Behavior Analysis">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Insight
            title="Repeat Demand"
            text="Products with consistent sales quantity indicate repeat customer buying behavior."
          />

          <Insight
            title="Seasonal Behavior"
            text="Monthly and category sales trends help identify seasonal customer behavior."
          />

          <Insight
            title="High-Value Products"
            text="Products with high predicted revenue should be prioritized for stock planning."
          />
        </div>
      </Section>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-md border border-green-200 dark:border-gray-700 mb-10">
      <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-6">
        {title}
      </h2>

      {children}
    </div>
  );
}

function Insight({ title, text }) {
  return (
    <div className="bg-[#f5fff0] dark:bg-[#2a2a2a] p-5 rounded-xl border border-green-200 dark:border-gray-700">
      <h3 className="font-bold text-[#123f1f] dark:text-white mb-2">
        {title}
      </h3>

      <p className="text-gray-600 dark:text-gray-300">
        {text}
      </p>
    </div>
  );
}

function Table({ headers, rows }) {
  return (
    <div className="overflow-x-auto max-h-[350px] overflow-y-auto rounded-xl border border-green-200 dark:border-gray-700">
      <table className="w-full min-w-[900px]">
        <thead className="sticky top-0 bg-white dark:bg-[#1e1e1e] z-10">
          <tr className="border-b border-green-200 dark:border-gray-700 text-left">
            {headers.map((head) => (
              <th
                key={head}
                className="py-3 px-3 text-gray-900 dark:text-white"
              >
                {head}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={headers.length}
                className="text-center py-8 text-gray-500 dark:text-gray-300"
              >
                No data available
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 dark:border-gray-700"
              >
                {row.map((cell, i) => (
                  <td
                    key={i}
                    className="py-4 px-3 text-gray-800 dark:text-gray-200"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AIRecommendations;