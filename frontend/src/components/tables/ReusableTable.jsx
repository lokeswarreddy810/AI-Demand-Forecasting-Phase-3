function ReusableTable({
  headers = [],
  rows = [],
  emptyMessage = "No data available",
}) {
  return (
    <div className="overflow-x-auto max-h-[450px] overflow-y-auto rounded-xl border border-green-200">
      <table className="w-full min-w-[900px]">
        <thead className="sticky top-0 bg-white dark:bg-[#1e1e1e] z-10">
          <tr className="border-b border-green-200 text-left">
            {headers.map((head) => (
              <th key={head} className="py-3 px-3">
                {head}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={headers.length}
                className="text-center py-8 text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            rows.map((row, index) => (
              <tr key={index} className="border-b border-gray-100">
                {row.map((cell, i) => (
                  <td key={i} className="py-4 px-3">
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ReusableTable;