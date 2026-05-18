function StatCard({

  title,
  value,
  color

}) {

  return (

    <div
      className={`rounded-2xl p-6 shadow-md border ${color}`}
    >

      <h3 className="text-lg font-semibold text-gray-600">
        {title}
      </h3>

      <p className="text-4xl font-bold mt-4 text-[#123f1f]">
        {value}
      </p>

    </div>

  );
}

export default StatCard;