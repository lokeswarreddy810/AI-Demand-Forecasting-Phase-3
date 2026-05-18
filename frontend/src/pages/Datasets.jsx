import { useEffect, useState } from "react";
import API from "../api/axiosConfig";

function Datasets() {
  const [datasets, setDatasets] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [product, setProduct] = useState("");
  const [category, setCategory] = useState("");
  const [region, setRegion] = useState("");

  const limit = 5;

  useEffect(() => {
    loadDatasets();
  }, [page]);

  const loadDatasets = async () => {
    const response = await API.get(
      `/dataset/?page=${page}&limit=${limit}&product=${product}&category=${category}&region=${region}`
    );

    setDatasets(response.data.data || []);
    setTotalPages(response.data.total_pages || 1);
  };

  const applyFilter = () => {
    setPage(1);
    loadDatasets();
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-[#123f1f] mb-8">
        Datasets
      </h1>

      <div className="bg-white p-6 rounded-2xl shadow-md border border-green-200 mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input
          placeholder="Search product"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          className="border border-green-300 rounded-xl px-4 py-3"
        />

        <input
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-green-300 rounded-xl px-4 py-3"
        />

        <input
          placeholder="Region"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="border border-green-300 rounded-xl px-4 py-3"
        />

        <button
          onClick={applyFilter}
          className="bg-[#7ed900] text-[#123f1f] font-bold rounded-xl"
        >
          Filter
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-green-200 p-6">
        <table className="w-full">
          <thead>
            <tr className="border-b border-green-200 text-left">
              <th className="py-3">Product</th>
              <th className="py-3">Category</th>
              <th className="py-3">Region</th>
              <th className="py-3">Quantity</th>
              <th className="py-3">Sales</th>
            </tr>
          </thead>

          <tbody>
            {datasets.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-500">
                  No dataset records found
                </td>
              </tr>
            ) : (
              datasets.map((item) => (
                <tr key={item.id} className="border-b border-gray-100">
                  <td className="py-4">{item.product_name}</td>
                  <td className="py-4">{item.category}</td>
                  <td className="py-4">{item.region || "N/A"}</td>
                  <td className="py-4">{item.quantity_sold}</td>
                  <td className="py-4">₹ {item.sales_amount}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

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
  );
}

export default Datasets;