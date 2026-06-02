import { useEffect, useState } from "react";
import API from "../api/axiosConfig";
import PageLoader from "../components/loaders/PageLoader";
import ReusableTable from "../components/tables/ReusableTable";

function Datasets() {
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDatasets = async () => {
    try {
      setLoading(true);

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

  if (loading) {
    return <PageLoader />;
  }

  const totalProducts = [
    ...new Set(datasets.map((item) => item.product_name)),
  ].length;

  const totalSales = datasets
    .reduce(
      (sum, item) => sum + Number(item.sales_amount || 0),
      0
    )
    .toFixed(2);

  const tableRows = datasets.map((item) => [
    item.product_name,
    item.category,
    item.region || "N/A",
    item.quantity_sold,
    `₹ ${item.sales_amount}`,
  ]);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-5">
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
          className="bg-[#7ed900] hover:bg-[#8ee600] text-[#123f1f] font-bold px-6 py-3 rounded-xl"
        >
          Refresh
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard title="Total Records" value={datasets.length} />

        <StatCard title="Products" value={totalProducts} />

        <StatCard title="Total Sales" value={`₹ ${totalSales}`} />
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-md border border-green-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-6">
          Uploaded Dataset Records
        </h2>

        <ReusableTable
          headers={[
            "Product",
            "Category",
            "Region",
            "Quantity Sold",
            "Sales Amount",
          ]}
          rows={tableRows}
          emptyMessage="No datasets uploaded yet"
        />
      </div>
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl shadow-md border border-green-200 dark:border-gray-700">
      <p className="text-gray-500 dark:text-gray-300">
        {title}
      </p>

      <h2 className="text-3xl font-bold text-[#123f1f] dark:text-white">
        {value}
      </h2>
    </div>
  );
}

export default Datasets;