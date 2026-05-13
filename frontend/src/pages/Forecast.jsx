import { useState } from "react";
import API from "../api/axiosConfig";
import ForecastChart from "../components/charts/ForecastChart";

function Forecast() {
  const [days, setDays] = useState(7);
  const [forecast, setForecast] = useState([]);

  const loadForecast = async () => {
    try {
      const response = await API.get(`/forecast/predict?days=${days}`);

      console.log("FORECAST RESPONSE:", response.data);

      const data = response.data.forecast || response.data || [];

      setForecast(data);

      if (data.length === 0) {
        alert("No forecast data found. Please upload dataset with repeated product names.");
      }
    } catch (error) {
      console.log("FORECAST ERROR:", error.response?.data);
      alert(error.response?.data?.detail || "Forecast failed");
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#123f1f]">
          AI Demand Forecast
        </h1>

        <button
          onClick={loadForecast}
          className="bg-[#8ee000] text-[#123f1f] font-bold px-5 py-3 rounded-xl"
        >
          Refresh Forecast
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 mb-6 max-w-md border border-green-200">
        <label className="font-semibold mr-3 text-[#123f1f]">
          Prediction Days
        </label>

        <input
          type="number"
          value={days}
          className="border border-green-300 p-2 rounded-xl"
          onChange={(e) => setDays(e.target.value)}
        />
      </div>

      <ForecastChart data={forecast} />
    </>
  );
}

export default Forecast;