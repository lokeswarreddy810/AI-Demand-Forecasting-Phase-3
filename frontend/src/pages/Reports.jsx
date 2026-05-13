import API from "../api/axiosConfig";

function Reports() {
  const downloadExcel = async () => {
    const response = await API.get("/reports/export-excel", {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", "forecast_report.xlsx");
    document.body.appendChild(link);
    link.click();
  };

  const downloadPDF = async () => {
    const response = await API.get("/reports/export-pdf", {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", "forecast_report.pdf");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-[#123f1f]">
        Reports
      </h1>

      <div className="bg-white rounded-2xl shadow-md p-8 max-w-xl border border-green-200">
        <h2 className="text-xl font-bold mb-5 text-[#123f1f]">
          Download Forecasting Reports
        </h2>

        <button
          onClick={downloadExcel}
          className="bg-[#8ee000] text-[#123f1f] font-bold px-6 py-3 rounded-xl mr-4 hover:bg-[#7ed900]"
        >
          Export Excel
        </button>

        <button
          onClick={downloadPDF}
          className="bg-[#123f1f] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#1f5f32]"
        >
          Export PDF
        </button>
      </div>
    </>
  );
}

export default Reports;