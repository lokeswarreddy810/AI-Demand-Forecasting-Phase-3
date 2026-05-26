import { useEffect, useState } from "react";
import API from "../api/axiosConfig";

function Datasets() {
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDatasets = async () => {
    try {
      const response = await API.get("/datasets/");

      console.log("Dataset API Response:", response.data);

      setDatasets(
        response.data.data ||
          response.data.datasets ||
          response.data ||
          []
      );
    } catch (error) {
      console.log(
        "Dataset Error:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDatasets();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-[#123f1f] dark:text-white">
            Datasets
          </h1>

          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Uploaded dataset records and analytics.
          </p>
        </div>

        <button
          onClick={loadDatasets}
          className="bg-[#7ed900] text-[#123f1f] font-bold px-6 py-3 rounded-xl"
        >
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl shadow-md border border-green-200">
          <p className="text-gray-500">Total Records</p>

          <h2 className="text-3xl font-bold text-[#123f1f] dark:text-white">
            {datasets.length}
          </h2>
        </div>

        <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl shadow-md border border-green-200">
          <p className="text-gray-500">Products</p>

          <h2 className="text-3xl font-bold text-[#123f1f] dark:text-white">
            {
              [...new Set(
                datasets.map((item) => item.product_name)
              )].length
            }
          </h2>
        </div>

        <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl shadow-md border border-green-200">
          <p className="text-gray-500">Total Sales</p>

          <h2 className="text-3xl font-bold text-[#123f1f] dark:text-white">
            ₹{" "}
            {datasets
              .reduce(
                (sum, item) =>
                  sum + Number(item.sales_amount || 0),
                0
              )
              .toFixed(2)}
          </h2>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-md border border-green-200">
        <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-6">
          Uploaded Dataset Records
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-green-200 text-left">
                <th className="py-3">Product</th>
                <th className="py-3">Category</th>
                <th className="py-3">Region</th>
                <th className="py-3">Quantity Sold</th>
                <th className="py-3">Sales Amount</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-8 text-gray-500"
                  >
                    Loading datasets...
                  </td>
                </tr>
              ) : datasets.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-8 text-gray-500"
                  >
                    No datasets uploaded yet
                  </td>
                </tr>
              ) : (
                datasets.map((item, index) => (
                  <tr
                    key={item.id || index}
                    className="border-b border-gray-100"
                  >
                    <td className="py-4">
                      {item.product_name}
                    </td>

                    <td className="py-4">
                      {item.category}
                    </td>

                    <td className="py-4">
                      {item.region || "N/A"}
                    </td>

                    <td className="py-4">
                      {item.quantity_sold}
                    </td>

                    <td className="py-4">
                      ₹ {item.sales_amount}
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

export default Datasets;