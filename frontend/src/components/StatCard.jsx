function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-green-200">
      <p className="text-sm text-gray-500">{title}</p>
      <h2 className="text-3xl font-bold mt-3 text-[#39a000]">
        {value}
      </h2>
    </div>
  );
}

export default StatCard;