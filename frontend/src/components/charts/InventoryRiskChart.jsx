function InventoryRiskChart({ data }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-green-200">
      <h2 className="text-2xl font-bold mb-6 text-[#123f1f]">
        Inventory Risk Analysis
      </h2>

      {data.length === 0 ? (
        <div className="h-[350px] flex items-center justify-center text-gray-500">
          No inventory risk data available
        </div>
      ) : (
        <div className="space-y-4 max-h-[350px] overflow-y-auto">
          {data.map((item, index) => (
            <div
              key={index}
              className="border border-green-100 rounded-xl p-4 bg-[#f7fff0]"
            >
              <div className="font-bold text-[#123f1f]">
                {item.product_name}
              </div>

              <div className="text-sm text-gray-600">
                Date: {item.forecast_date}
              </div>

              <div className="text-sm text-gray-600">
                Predicted Quantity: {item.predicted_quantity}
              </div>

              <div className="mt-2 font-semibold text-[#123f1f]">
                Risk: {item.risk_level}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default InventoryRiskChart;