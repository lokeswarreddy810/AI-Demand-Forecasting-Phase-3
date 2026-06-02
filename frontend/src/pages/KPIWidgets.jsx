import { useEffect, useState } from "react";
import API from "../api/axiosConfig";

function KPIWidgets() {
  const [kpis, setKpis] = useState([]);

  const loadKpis = async () => {
    try {
      const res = await API.get("/dashboard-settings/kpi-cards");
      setKpis(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.log("KPI Error:", error);
      setKpis([]);
    }
  };

  useEffect(() => {
    loadKpis();
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#123f1f] dark:text-white">
          Advanced KPI Widgets
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Monitor key performance indicators and business metrics in real time.
        </p>
      </div>

      {kpis.length === 0 ? (
        <div className="bg-white dark:bg-[#1e1e1e] border border-green-300 dark:border-gray-700 rounded-2xl p-10 text-center">
          <p className="text-gray-500 dark:text-gray-300 text-lg">
            No KPI widgets available
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {kpis.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-md border border-green-300 dark:border-gray-700 hover:border-[#9dff00] transition-all duration-300"
            >
              <p className="text-gray-500 dark:text-gray-300 text-sm uppercase tracking-wide">
                {item.title}
              </p>

              <h2 className="text-4xl font-bold text-[#123f1f] dark:text-white mt-4">
                {item.value}
              </h2>

              <div className="mt-4 h-1 bg-[#9dff00] rounded-full"></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default KPIWidgets;