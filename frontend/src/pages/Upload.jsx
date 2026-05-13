import { useState } from "react";
import API from "../api/axiosConfig";

function Upload() {
  const [file, setFile] = useState(null);

  const uploadDataset = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select CSV or Excel file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await API.post("/dataset/upload", formData);
      alert(response.data.message);
    } catch {
      alert("Upload failed");
    }
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-[#123f1f]">
        Dataset Upload
      </h1>

      <div className="bg-white rounded-2xl shadow-md p-8 max-w-xl border border-green-200">
        <form onSubmit={uploadDataset}>
          <h2 className="text-xl font-bold mb-4 text-[#123f1f]">
            Upload Historical Sales Dataset
          </h2>

          <input
            type="file"
            accept=".csv,.xlsx"
            className="block w-full border border-green-300 p-3 rounded-xl mb-6"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button className="bg-[#8ee000] text-[#123f1f] font-bold px-6 py-3 rounded-xl hover:bg-[#7ed900]">
            Upload Dataset
          </button>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-6 max-w-xl mt-6 border border-green-200">
        <h2 className="font-bold mb-2 text-[#123f1f]">Required Columns</h2>
        <p className="text-gray-600">
          date, product_name, category, quantity_sold, sales_amount
        </p>
      </div>
    </>
  );
}

export default Upload;