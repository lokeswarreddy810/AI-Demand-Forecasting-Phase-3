import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function ForecastChart({ data }) {

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-green-200">

      <h2 className="text-2xl font-bold mb-6 text-[#123f1f]">
        AI Forecast Prediction
      </h2>

      {data.length === 0 ? (

        <div className="h-[350px] flex items-center justify-center text-gray-500">
          No forecast data available
        </div>

      ) : (

        <>
          <ResponsiveContainer width="100%" height={420}>

            <LineChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 40,
                bottom: 20,
              }}
            >

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis
                dataKey="forecast_date"
                tick={{ fontSize: 14 }}
              />

              <YAxis
                tick={{ fontSize: 14 }}
                width={90}
              />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="predicted_quantity"
                stroke="#39a000"
                strokeWidth={4}
                dot={{ r: 5 }}
              />

            </LineChart>

          </ResponsiveContainer>

          <div className="mt-6 text-lg font-semibold text-[#123f1f]">

            Accuracy:
            {" "}
            {data[0]?.accuracy || 0}%

          </div>

          <div className="mt-3 text-lg font-semibold text-[#123f1f]">

            Model Used:
            {" "}
            {data[0]?.model_used || "N/A"}

          </div>

        </>

      )}

    </div>
  );
}

export default ForecastChart;