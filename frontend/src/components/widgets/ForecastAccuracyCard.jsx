import KPICard from "./KPICard";

function ForecastAccuracyCard({ value = "0%" }) {
  return <KPICard title="Forecast Accuracy" value={value} />;
}

export default ForecastAccuracyCard;