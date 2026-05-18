import {
  LayoutDashboard,
  Upload,
  BarChart3,
  FileText,
  Database,
  ShieldCheck
} from "lucide-react";

import { Link } from "react-router-dom";

function Sidebar() {

  return (

    <div className="w-72 min-h-screen bg-white border-r border-green-200 shadow-md">

      {/* Logo */}
      <div className="p-8 border-b border-green-200">

        <h1 className="text-2xl font-bold text-[#123f1f]">
          AI Forecast
        </h1>

        <p className="text-sm text-gray-500 mt-2">
          Analytics Platform
        </p>

      </div>

      {/* Navigation */}
      <div className="p-5 flex flex-col gap-3">

        <Link
          to="/dashboard"
          className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#f3ffe2] text-[#123f1f] font-semibold transition"
        >
          <LayoutDashboard size={22} />
          Dashboard
        </Link>

        <Link
          to="/upload"
          className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#f3ffe2] text-[#123f1f] font-semibold transition"
        >
          <Upload size={22} />
          Upload Dataset
        </Link>

        <Link
          to="/forecast"
          className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#f3ffe2] text-[#123f1f] font-semibold transition"
        >
          <BarChart3 size={22} />
          Forecast
        </Link>

        <Link
          to="/datasets"
          className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#f3ffe2] text-[#123f1f] font-semibold transition"
        >
          <Database size={22} />
          Datasets
        </Link>

        <Link
          to="/reports"
          className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#f3ffe2] text-[#123f1f] font-semibold transition"
        >
          <FileText size={22} />
          Reports
        </Link>

        <Link
          to="/admin"
          className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#f3ffe2] text-[#123f1f] font-semibold transition"
        >
          <ShieldCheck size={22} />
          Admin
        </Link>

      </div>

    </div>

  );
}

export default Sidebar;