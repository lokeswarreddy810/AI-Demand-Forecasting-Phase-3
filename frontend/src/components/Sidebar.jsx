import { Link, useLocation } from "react-router-dom";
import { BarChart3, Upload, LineChart, FileText } from "lucide-react";

function Sidebar() {
  const location = useLocation();

  const menu = [
    { path: "/dashboard", name: "Dashboard", icon: <BarChart3 size={18} /> },
    { path: "/upload", name: "Dataset Upload", icon: <Upload size={18} /> },
    { path: "/forecast", name: "Forecast", icon: <LineChart size={18} /> },
    { path: "/reports", name: "Reports", icon: <FileText size={18} /> },
  ];

  return (
    <aside className="w-64 bg-[#123f1f] text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-10 text-[#b7ff5a]">
        AI Forecast
      </h1>

      <nav className="space-y-3">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
              location.pathname === item.path
                ? "bg-[#8ee000] text-[#123f1f] font-bold"
                : "hover:bg-[#1f5f32]"
            }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;