import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getDashboardWidgets,
  createDashboardWidget,
  toggleDashboardWidget,
  downloadDashboardSummary,
  getDrillDownAnalytics,
} from "../services/dashboardService";
import { downloadTextFile } from "../utils/exportUtils";

function DashboardSettings() {
  const navigate = useNavigate();

  const [widgets, setWidgets] = useState([]);
  const [widgetName, setWidgetName] = useState("");
  const [widgetType, setWidgetType] = useState("KPI");
  const [drillDown, setDrillDown] = useState(null);
  const [message, setMessage] = useState("");

  const loadWidgets = async () => {
    try {
      const data = await getDashboardWidgets();
      setWidgets(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Widgets Error:", error);
    }
  };

  useEffect(() => {
    loadWidgets();
  }, []);

  const handleCreate = async () => {
    if (!widgetName.trim()) {
      setMessage("Please enter widget name");
      return;
    }

    try {
      await createDashboardWidget(widgetName, widgetType);
      setMessage("Dashboard widget created successfully");
      setWidgetName("");
      loadWidgets();
    } catch (error) {
      console.log("Create Widget Error:", error);
      setMessage("Failed to create widget");
    }
  };

  const handleToggle = async (id) => {
    try {
      await toggleDashboardWidget(id);
      setMessage("Widget visibility updated successfully");
      loadWidgets();
    } catch (error) {
      console.log("Toggle Widget Error:", error);
      setMessage("Failed to update widget");
    }
  };

  const handleDownloadSummary = async () => {
    try {
      const data = await downloadDashboardSummary();

      const content = `
Advanced AI Demand Forecasting Dashboard Summary

Total Sales: ${data.summary?.total_sales || 0}
Total Quantity: ${data.summary?.total_quantity || 0}
Total Products: ${data.summary?.total_products || 0}
Forecast Accuracy: ${data.summary?.forecast_accuracy || 0}
`;

      downloadTextFile("dashboard_summary.txt", content);
      setMessage("Dashboard summary downloaded successfully");
    } catch (error) {
      console.log("Download Summary Error:", error);
      setMessage("Failed to download dashboard summary");
    }
  };

  const handleDrillDown = async () => {
    try {
      const data = await getDrillDownAnalytics();
      setDrillDown(data);
      setMessage("Drill-down analytics loaded successfully");
    } catch (error) {
      console.log("Drill Down Error:", error);
      setMessage("Failed to load drill-down analytics");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-[#123f1f] dark:text-white">
            Dashboard Settings
          </h1>

          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Manage dashboard widgets, summaries, and analytics settings.
          </p>
        </div>

        <button
          onClick={() => navigate("/kpi-widgets")}
          className="bg-[#9dff00] hover:bg-[#8ee600] text-[#032b11] px-6 py-3 rounded-xl font-bold"
        >
          KPI Widgets
        </button>
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-md mb-8 border border-green-300 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-[#123f1f] dark:text-white">
          Dashboard Actions
        </h2>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleDownloadSummary}
            className="bg-[#9dff00] hover:bg-[#8ee600] text-[#032b11] px-6 py-3 rounded-xl font-bold"
          >
            Download Dashboard Summary
          </button>

          <button
            onClick={handleDrillDown}
            className="bg-[#06451d] hover:bg-[#0b5e28] text-white px-6 py-3 rounded-xl font-bold"
          >
            View Drill-Down Analytics
          </button>
        </div>

        {message && (
          <div className="mt-5 bg-[#f5fff0] dark:bg-[#2a2a2a] text-[#123f1f] dark:text-white px-5 py-4 rounded-xl border border-green-300 dark:border-gray-700">
            {message}
          </div>
        )}
      </div>

      {drillDown && (
        <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-md mb-8 border border-green-300 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-[#123f1f] dark:text-white">
            Interactive Drill-Down Analytics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DrillBox
              title="Region Level"
              data={drillDown.region_level}
              keyName="region"
            />

            <DrillBox
              title="Category Level"
              data={drillDown.category_level}
              keyName="category"
            />

            <DrillBox
              title="Product Level"
              data={drillDown.product_level}
              keyName="product_name"
            />
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-md mb-8 border border-green-300 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-[#123f1f] dark:text-white">
          Create Dashboard Widget
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          <input
            value={widgetName}
            onChange={(e) => setWidgetName(e.target.value)}
            placeholder="Widget Name"
            className="bg-white dark:bg-[#2a2a2a] text-black dark:text-white border border-green-300 rounded-xl px-4 py-3 outline-none"
          />

          <select
            value={widgetType}
            onChange={(e) => setWidgetType(e.target.value)}
            className="bg-white dark:bg-[#2a2a2a] text-black dark:text-white border border-green-300 rounded-xl px-4 py-3 outline-none"
          >
            <option value="KPI">KPI</option>
            <option value="Chart">Chart</option>
            <option value="Table">Table</option>
          </select>

          <button
            onClick={handleCreate}
            className="bg-[#9dff00] hover:bg-[#8ee600] text-[#032b11] rounded-xl font-bold"
          >
            Create Widget
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-md border border-green-300 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-[#123f1f] dark:text-white">
          Dashboard Widgets
        </h2>

        <div className="overflow-x-auto max-h-[500px] overflow-y-auto rounded-xl border border-green-300 dark:border-gray-700">
          <table className="w-full min-w-[700px]">
            <thead className="sticky top-0 bg-white dark:bg-[#1e1e1e] z-10">
              <tr className="border-b border-green-300 dark:border-gray-700 text-left">
                <th className="py-4 px-4 text-gray-900 dark:text-white">
                  Widget Name
                </th>

                <th className="py-4 px-4 text-gray-900 dark:text-white">
                  Widget Type
                </th>

                <th className="py-4 px-4 text-gray-900 dark:text-white">
                  Visible
                </th>

                <th className="py-4 px-4 text-gray-900 dark:text-white">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {widgets.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-8 text-gray-500 dark:text-gray-300"
                  >
                    No widgets available
                  </td>
                </tr>
              ) : (
                widgets.map((widget) => (
                  <tr
                    key={widget.id}
                    className="border-b border-gray-100 dark:border-gray-700"
                  >
                    <td className="py-4 px-4 text-gray-800 dark:text-gray-200 font-bold">
                      {widget.widget_name}
                    </td>

                    <td className="py-4 px-4 text-gray-800 dark:text-gray-200">
                      {widget.widget_type}
                    </td>

                    <td className="py-4 px-4">
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-bold ${
                          widget.is_visible
                            ? "bg-[#9dff00] text-[#032b11]"
                            : "bg-gray-500 text-white"
                        }`}
                      >
                        {widget.is_visible ? "Visible" : "Hidden"}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleToggle(widget.id)}
                        className="bg-[#9dff00] hover:bg-[#8ee600] text-[#032b11] px-4 py-2 rounded-lg font-bold"
                      >
                        Toggle
                      </button>
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

function DrillBox({ title, data = [], keyName }) {
  return (
    <div className="bg-[#f5fff0] dark:bg-[#2a2a2a] p-5 rounded-xl border border-green-300 dark:border-gray-700">
      <h3 className="font-bold text-[#123f1f] dark:text-white mb-4">
        {title}
      </h3>

      {data.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">
          No data
        </p>
      ) : (
        data.map((item, index) => (
          <p
            key={index}
            className="text-gray-700 dark:text-gray-300 mb-2"
          >
            {item[keyName]} - ₹ {item.total_sales}
          </p>
        ))
      )}
    </div>
  );
}

export default DashboardSettings;