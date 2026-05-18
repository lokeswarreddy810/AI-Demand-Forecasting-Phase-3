import { useState } from "react";

import { Bell } from "lucide-react";

import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] =
    useState(false);

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");
  };

  return (

    <div className="h-24 bg-white border-b border-green-200 flex items-center justify-between px-8 shadow-sm relative">

      {/* Title */}
      <div>

        <h1 className="text-4xl font-bold text-[#123f1f]">
          Advanced AI Demand Forecasting
        </h1>

      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6 relative">

        {/* Notification Bell */}
        <button
          onClick={() =>
            setShowNotifications(
              !showNotifications
            )
          }
          className="relative"
        >

          <Bell
            size={30}
            className="text-[#123f1f]"
          />

        </button>

        {/* Notification Dropdown */}
        {showNotifications && (

          <div className="absolute top-16 right-24 w-80 bg-white border border-green-200 rounded-2xl shadow-xl p-5 z-50">

            <h2 className="text-2xl font-bold text-[#123f1f] mb-4">
              Notifications
            </h2>

            <div className="space-y-3">

              <div className="p-3 rounded-xl bg-[#f7fff0] border border-green-100">

                Forecast generated successfully

              </div>

              <div className="p-3 rounded-xl bg-[#f7fff0] border border-green-100">

                Dataset uploaded successfully

              </div>

            </div>

          </div>

        )}

        {/* Logout */}
        <button
          onClick={logout}
          className="bg-[#7ed900] hover:bg-[#6ac400] text-[#123f1f] font-bold px-6 py-3 rounded-2xl"
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Navbar;