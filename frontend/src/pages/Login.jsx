import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axiosConfig";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      const formData = new URLSearchParams();

      formData.append("username", email);
      formData.append("password", password);

      const response = await API.post(
        "/auth/login",
        formData,
        {
          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },
        }
      );

      localStorage.setItem(
        "token",
        response.data.access_token
      );

      localStorage.setItem(
        "role",
        response.data.role || "Viewer"
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user || {})
      );

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Login failed. Please check email and password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-[#111111]">
      {/* Left Section */}
      <div className="hidden lg:flex w-1/2 flex-col justify-center px-20 bg-[#f5fff0] dark:bg-[#0b0b0b]">
        <h1 className="text-6xl font-bold mb-6 text-[#123f1f] dark:text-[#9dff00]">
          AI Forecast
        </h1>

        <p className="text-xl text-gray-700 dark:text-gray-300 mb-10">
          Advanced AI Demand Forecasting Platform for
          predictive analytics and intelligent business
          decisions.
        </p>

        <div className="space-y-6">
          <div className="bg-white dark:bg-[#1e1e1e] border border-green-300 dark:border-gray-700 p-4 rounded-xl text-gray-800 dark:text-gray-200">
            📈 Real-Time Analytics Dashboard
          </div>

          <div className="bg-white dark:bg-[#1e1e1e] border border-green-300 dark:border-gray-700 p-4 rounded-xl text-gray-800 dark:text-gray-200">
            🤖 AI Forecasting & Recommendations
          </div>

          <div className="bg-white dark:bg-[#1e1e1e] border border-green-300 dark:border-gray-700 p-4 rounded-xl text-gray-800 dark:text-gray-200">
            🔒 Secure Enterprise Platform
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 flex justify-center items-center px-6">
        <div className="bg-white dark:bg-[#1e1e1e] rounded-3xl shadow-2xl p-10 w-full max-w-md border border-green-300 dark:border-gray-700">
          <h1 className="text-4xl font-bold text-[#123f1f] dark:text-white text-center mb-3">
            Login
          </h1>

          <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
            Sign in to access your forecasting dashboard
          </p>

          {error && (
            <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-700 rounded-xl p-3 mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="
                w-full
                bg-white
                dark:bg-[#2a2a2a]
                text-black
                dark:text-white
                border
                border-green-300
                dark:border-gray-700
                rounded-xl
                px-4
                py-3
                mb-5
                outline-none
              "
              required
            />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="
                w-full
                bg-white
                dark:bg-[#2a2a2a]
                text-black
                dark:text-white
                border
                border-green-300
                dark:border-gray-700
                rounded-xl
                px-4
                py-3
                mb-6
                outline-none
              "
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-[#9dff00]
                hover:bg-[#8ee600]
                text-[#032b11]
                font-bold
                py-3
                rounded-xl
                transition-all
                disabled:opacity-60
              "
            >
              {loading ? "Signing In..." : "Login"}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-600 dark:text-gray-300">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#123f1f] dark:text-[#9dff00] font-bold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;