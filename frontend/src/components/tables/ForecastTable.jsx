import ReusableTable from "./ReusableTable";

function ForecastTable({ data = [] }) {
  return (
    <ReusableTable
      headers={[
        "Product",
        "Date",
        "Quantity",
        "Revenue",
        "Accuracy",
        "Model",
        "Recommendation",
      ]}
      rows={data.map((item) => [
        item.product_name,
        item.forecast_date,
        item.predicted_quantity,
        `₹ ${item.predicted_revenue || 0}`,
        `${item.accuracy || 0}%`,
        item.model_used,
        item.inventory_recommendation,
      ])}
      emptyMessage="No forecast data available"
    />
  );
}

export default ForecastTable;