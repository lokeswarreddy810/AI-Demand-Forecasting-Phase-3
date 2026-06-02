import { Search } from "lucide-react";
import { useState } from "react";

function GlobalSearch() {
  const [query, setQuery] = useState("");

  return (
    <div className="relative w-full max-w-xl">

      <Search
        size={18}
        className="absolute left-4 top-4 text-gray-500"
      />

      <input
        type="text"
        placeholder="Search products, forecasts, reports..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full pl-12 pr-4 py-3 rounded-xl border border-green-300 focus:outline-none focus:ring-2 focus:ring-[#9dff00]"
      />

    </div>
  );
}

export default GlobalSearch;