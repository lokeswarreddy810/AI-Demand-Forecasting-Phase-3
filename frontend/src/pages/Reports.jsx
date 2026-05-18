import { useEffect, useState } from "react";
import API from "../api/axiosConfig";

function Reports() {
  const [summary, setSummary] = useState({});
  const [preview, setPreview] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    loadReports();
  }, [page]);

  const loadReports = async () => {
    const summaryRes = await API.get("/reports/analytics-summary");
    const previewRes = await API.get(
      `/reports/preview?page=${page}&limit=${limit}`
    );

    setSummary(summaryRes.data.data || summaryRes.data);
    setPreview(previewRes.data.data || []);
    setTotalPages(previewRes.data.total_pages || 1);
  };

  const downloadFile = async (url, filename) => {
    const response = await API.get(url, { responseType: "blob" });

    const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");

    link.href = blobUrl;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-[#123f1f] mb-8">
        Reports
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white border border-green-200 rounded-2xl shadow-md p-6">
          <p className="text-gray-500">Total Sales</p>
          <h2 className="text-3xl font-bold text-[#123f1f]">
            ₹ {summary.total_sales || 0}
          </h2>
        </div>

        <div className="bg-white border border-green-200 rounded-2xl shadow-md p-6">
          <p className="text-gray-500">Total Quantity</p>
          <h2 className="text-3xl font-bold text-[#123f1f]">
            {summary.total_quantity || 0}
          </h2>
        </div>

        <div className="bg-white border border-green-200 rounded-2xl shadow-md p-6">
          <p className="text-gray-500">Total Products</p>
          <h2 className="text-3xl font-bold text-[#123f1f]">
            {summary.total_products || 0}
          </h2>
        </div>

        <div className="bg-white border border-green-200 rounded-2xl shadow-md p-6">
          <p className="text-gray-500">Forecast Accuracy</p>
          <h2 className="text-3xl font-bold text-[#123f1f]">
            {summary.forecast_accuracy || "0%"}
          </h2>
        </div>
      </div>

      <div className="bg-white border border-green-200 rounded-2xl shadow-md p-8 mb-8">
        <h2 className="text-2xl font-bold text-[#123f1f] mb-5">
          Download Analytics Summary
        </h2>

        <button
          onClick={() => downloadFile("/reports/export-excel", "forecast_report.xlsx")}
          className="bg-[#8ee000] text-[#123f1f] font-bold px-6 py-3 rounded-xl mr-4"
        >
          Export Excel
        </button>

        <button
          onClick={() => downloadFile("/reports/export-pdf", "forecast_report.pdf")}
          className="bg-[#123f1f] text-white font-bold px-6 py-3 rounded-xl"
        >
          Export PDF
        </button>
      </div>

      <div className="bg-white border border-green-200 rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-[#123f1f] mb-6">
          Detailed Forecasting Report View
        </h2>

        <table className="w-full">
          <thead>
            <tr className="border-b border-green-200 text-left">
              <th className="py-3">Product</th>
              <th className="py-3">Forecast Date</th>
              <th className="py-3">Predicted Quantity</th>
            </tr>
          </thead>

          <tbody>
            {preview.length === 0 ? (
              <tr>
                <td colSpan="3" className="text-center py-8 text-gray-500">
                  No forecast report data available
                </td>
              </tr>
            ) : (
              preview.map((item) => (
                <tr key={item.id} className="border-b border-gray-100">
                  <td className="py-4">{item.product_name}</td>
                  <td className="py-4">{item.forecast_date}</td>
                  <td className="py-4">{item.predicted_quantity}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        <div className="flex justify-center gap-4 mt-8">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="bg-white border border-green-300 px-5 py-2 rounded-xl disabled:opacity-50"
          >
            Prev
          </button>

          <div className="px-5 py-2 font-bold text-[#123f1f]">
            Page {page} of {totalPages}
          </div>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="bg-white border border-green-300 px-5 py-2 rounded-xl disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Reports;