import { useState } from "react";
import API from "../api/axiosConfig";

function AIOptimization() {
  const [anomalies, setAnomalies] = useState([]);
  const [seasonalTrends, setSeasonalTrends] = useState([]);
  const [retrainResult, setRetrainResult] = useState(null);

  const loadAnomalies = async () => {
    const response = await API.get("/ai-optimization/anomalies");
    setAnomalies(response.data.anomalies || []);
  };

  const loadSeasonalTrends = async () => {
    const response = await API.get("/ai-optimization/seasonal-trends");
    setSeasonalTrends(response.data.seasonal_trends || []);
  };

  const retrainModel = async () => {
    const response = await API.post("/ai-optimization/retrain");
    setRetrainResult(response.data);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-[#123f1f] mb-8">
        AI Optimization
      </h1>

      <div className="bg-white border border-green-200 rounded-2xl shadow-md p-6 mb-8">
        <h2 className="text-2xl font-bold text-[#123f1f] mb-5">
          Model Retraining
        </h2>

        <button
          onClick={retrainModel}
          className="bg-[#7ed900] text-[#123f1f] font-bold px-6 py-3 rounded-xl"
        >
          Retrain Model
        </button>

        {retrainResult && (
          <div className="mt-5 bg-[#f7fff0] border border-green-200 rounded-xl p-4">
            <p>{retrainResult.message}</p>
            <p>Best Model: {retrainResult.best_model}</p>
            <p>Score: {retrainResult.score}</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="bg-white border border-green-200 rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-[#123f1f] mb-5">
            Anomaly Detection
          </h2>

          <button
            onClick={loadAnomalies}
            className="bg-[#123f1f] text-white font-bold px-6 py-3 rounded-xl mb-5"
          >
            Detect Anomalies
          </button>

          {anomalies.length === 0 ? (
            <p className="text-gray-500">No anomalies found</p>
          ) : (
            anomalies.map((item, index) => (
              <div key={index} className="border-b py-3">
                {item.product_name} - {item.quantity_sold} - {item.anomaly_type}
              </div>
            ))
          )}
        </div>

        <div className="bg-white border border-green-200 rounded-2xl shadow-md p-6">
          <h2 className="text-2xl font-bold text-[#123f1f] mb-5">
            Seasonal Trend Detection
          </h2>

          <button
            onClick={loadSeasonalTrends}
            className="bg-[#123f1f] text-white font-bold px-6 py-3 rounded-xl mb-5"
          >
            Detect Seasonal Trends
          </button>

          {seasonalTrends.length === 0 ? (
            <p className="text-gray-500">No seasonal trends found</p>
          ) : (
            seasonalTrends.map((item, index) => (
              <div key={index} className="border-b py-3">
                {item.month} - ₹ {item.total_sales} - Qty {item.total_quantity}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AIOptimization;