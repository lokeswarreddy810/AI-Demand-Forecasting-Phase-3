function StatCard({
  title,
  value,
  color = "#123f1f"
}) {

  return (

    <div className="bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-md p-6 border border-green-200 dark:border-gray-700">

      <p className="text-gray-500 dark:text-gray-300">
        {title}
      </p>

      <h2
        className="text-4xl font-bold mt-2"
        style={{ color }}
      >
        {value}
      </h2>

    </div>
  );
}

export default StatCard;