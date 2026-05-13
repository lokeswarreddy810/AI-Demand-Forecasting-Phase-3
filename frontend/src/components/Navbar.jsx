import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="h-20 bg-white border-b border-green-200 flex items-center justify-between px-8 shadow-sm">
      <h2 className="text-2xl font-bold text-[#123f1f]">
        Advanced AI Demand Forecasting
      </h2>

      <button
        onClick={logout}
        className="bg-[#7ed900] text-[#123f1f] font-bold px-5 py-2 rounded-xl hover:bg-[#6ac400]"
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;