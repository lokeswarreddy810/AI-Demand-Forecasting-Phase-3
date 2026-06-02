function KPICard({ title, value }) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-2xl shadow-md border border-green-200">
      <p className="text-gray-500 dark:text-gray-300">{title}</p>

      <h2 className="text-3xl font-bold text-[#123f1f] dark:text-white mt-3">
        {value}
      </h2>
    </div>
  );
}

export default KPICard;