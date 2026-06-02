import {
  LayoutDashboard,
  Upload,
  LineChart,
  Database,
  FileText,
  Brain,
  ShieldCheck,
  Activity,
  LogOut,
  Bell,
  Users,
  User,
  Workflow,
  Link,
  BarChart3,
  PanelsTopLeft,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Upload Dataset",
      path: "/upload",
      icon: <Upload size={20} />,
    },
    {
      name: "Forecast",
      path: "/forecast",
      icon: <LineChart size={20} />,
    },
    {
      name: "Datasets",
      path: "/datasets",
      icon: <Database size={20} />,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: <FileText size={20} />,
    },
    {
      name: "AI Optimization",
      path: "/ai-optimization",
      icon: <Brain size={20} />,
    },
    {
      name: "Admin",
      path: "/admin",
      icon: <ShieldCheck size={20} />,
    },
    {
      name: "Monitoring",
      path: "/monitoring",
      icon: <Activity size={20} />,
    },

    {
      name: "Automation",
      path: "/automation",
      icon: <Workflow size={20} />,
    },
    {
      name: "Integrations",
      path: "/integrations",
      icon: <Link size={20} />,
    },
    {
      name: "AI Recommendations",
      path: "/ai-recommendations",
      icon: <Brain size={20} />,
    },
    {
      name: "Forecast Comparison",
      path: "/forecast-comparison",
      icon: <BarChart3 size={20} />,
    },
    {
      name: "Alerts",
      path: "/alerts",
      icon: <Bell size={20} />,
    },
    {
      name: "Dashboard Settings",
      path: "/dashboard-settings",
      icon: <PanelsTopLeft size={20} />,
    },
    {
      name: "User Management",
      path: "/user-management",
      icon: <Users size={20} />,
    },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-72 bg-[#032b11] text-white flex flex-col justify-between shadow-xl">

      <div>

        <div className="h-20 flex items-center px-8 border-b border-green-900">
          <h1 className="text-4xl font-bold text-[#9dff00]">
            AI Forecast
          </h1>
        </div>

        <div className="mt-8 px-4 overflow-y-auto h-[calc(100vh-180px)]">

          <div className="flex flex-col gap-3">

            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 font-medium
                  ${
                    isActive
                      ? "bg-[#9dff00] text-[#032b11] shadow-lg"
                      : "hover:bg-[#0d4420] text-white"
                  }`
                }
              >
                {item.icon}

                <span className="text-lg">
                  {item.name}
                </span>
              </NavLink>
            ))}

          </div>

        </div>

      </div>

      <div className="p-4 border-t border-green-900">

        <button
          onClick={logout}
          className="w-full bg-[#9dff00] hover:bg-[#b7ff39] text-[#032b11] font-bold py-4 rounded-2xl flex items-center justify-center gap-3 transition-all duration-200"
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>

    </div>
  );
}

export default Sidebar;