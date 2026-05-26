import { useState } from "react";
import API from "../api/axiosConfig";

function GlobalSearch() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState(null);

  const searchData = async () => {
    if (!keyword.trim()) {
      return;
    }

    try {
      const response = await API.get(`/search/?keyword=${keyword}`);
      setResults(response.data);
    } catch (error) {
      console.log("Search Error:", error.response?.data);
    }
  };

  return (
    <div className="bg-white border border-green-200 rounded-2xl shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold text-[#123f1f] mb-4">
        Global Search
      </h2>

      <div className="flex gap-4 mb-6">
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search products, forecasts, datasets..."
          className="border border-green-300 rounded-xl px-4 py-3 w-full"
        />

        <button
          onClick={searchData}
          className="bg-[#7ed900] text-[#123f1f] font-bold px-6 rounded-xl"
        >
          Search
        </button>
      </div>

      {results && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-green-100 rounded-xl p-4">
            <h3 className="font-bold text-[#123f1f] mb-3">
              Dataset Results
            </h3>

            {results.datasets?.length === 0 ? (
              <p className="text-gray-500">No dataset results</p>
            ) : (
              results.datasets?.map((item) => (
                <div key={item.id} className="border-b py-2">
                  {item.product_name} - {item.category} - {item.region}
                </div>
              ))
            )}
          </div>

          <div className="border border-green-100 rounded-xl p-4">
            <h3 className="font-bold text-[#123f1f] mb-3">
              Forecast Results
            </h3>

            {results.forecasts?.length === 0 ? (
              <p className="text-gray-500">No forecast results</p>
            ) : (
              results.forecasts?.map((item) => (
                <div key={item.id} className="border-b py-2">
                  {item.product_name} - {item.forecast_date} -{" "}
                  {item.predicted_quantity}
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default GlobalSearch;