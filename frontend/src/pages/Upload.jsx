import { useState } from "react";
import API from "../api/axiosConfig";

function Upload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const response = await API.post("/datasets/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(response.data.message || "Dataset uploaded successfully");

      window.dispatchEvent(new CustomEvent("notification-updated"));
    } catch (error) {
      console.log("Upload Error:", error.response?.data || error.message);

      setMessage(error.response?.data?.detail || "Dataset upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#123f1f] dark:text-white">
          Upload Dataset
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Upload CSV or Excel files for AI demand forecasting.
        </p>
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] p-10 rounded-2xl shadow-md border border-green-300 dark:border-gray-700 max-w-3xl">
        <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-6">
          Dataset Upload
        </h2>

        <div className="mb-8 bg-[#f5fff0] dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 rounded-xl p-5">
          <p className="text-gray-700 dark:text-gray-300 mb-2 font-semibold">
            Required Columns
          </p>

          <p className="text-gray-700 dark:text-gray-300">
            date, product_name, category, region, quantity_sold, sales_amount
          </p>
        </div>

        <div className="border-2 border-dashed border-green-300 dark:border-gray-700 rounded-2xl p-10 text-center bg-[#f5fff0] dark:bg-[#2a2a2a]">
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={(e) => setFile(e.target.files[0])}
            className="mb-6 text-gray-700 dark:text-gray-300 file:bg-[#9dff00] file:text-[#032b11] file:border-0 file:px-5 file:py-3 file:rounded-xl file:font-bold"
          />

          {file && (
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Selected File:{" "}
              <span className="text-[#123f1f] dark:text-white font-bold">
                {file.name}
              </span>
            </p>
          )}

          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-[#9dff00] hover:bg-[#8ee600] text-[#032b11] font-bold px-8 py-4 rounded-2xl transition-all duration-200 disabled:opacity-60"
          >
            {loading ? "Uploading..." : "Upload Dataset"}
          </button>
        </div>

        {message && (
          <div className="mt-8 bg-[#f5fff0] dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 rounded-2xl p-5">
            <p className="text-[#123f1f] dark:text-white font-medium">
              {message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Upload;