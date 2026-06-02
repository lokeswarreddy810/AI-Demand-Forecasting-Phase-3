import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axiosConfig";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      alert("Registration successful");
      navigate("/");
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.detail || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-[#111111] text-[#123f1f] dark:text-white">
      <div className="hidden lg:flex w-1/2 flex-col justify-center px-20 bg-[#f5fff0] dark:bg-[#0b0b0b]">
        <h1 className="text-6xl font-bold mb-6 text-[#123f1f] dark:text-[#9dff00]">
          AI Forecast
        </h1>

        <p className="text-xl text-gray-700 dark:text-gray-300 mb-10">
          Create your account and unlock powerful AI-driven business forecasting.
        </p>

        <div className="space-y-6">
          <div className="bg-white dark:bg-[#1e1e1e] border border-green-300 dark:border-gray-700 p-4 rounded-xl text-gray-800 dark:text-gray-200">
            📈 Intelligent Analytics Platform
          </div>

          <div className="bg-white dark:bg-[#1e1e1e] border border-green-300 dark:border-gray-700 p-4 rounded-xl text-gray-800 dark:text-gray-200">
            🤖 Machine Learning Forecasting
          </div>

          <div className="bg-white dark:bg-[#1e1e1e] border border-green-300 dark:border-gray-700 p-4 rounded-xl text-gray-800 dark:text-gray-200">
            🛡 Secure & Scalable Architecture
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex justify-center items-center px-6">
        <form
          onSubmit={registerUser}
          className="bg-white dark:bg-[#1e1e1e] border border-green-300 dark:border-gray-700 p-10 rounded-3xl shadow-2xl w-full max-w-md"
        >
          <h2 className="text-3xl font-bold mb-2 text-[#123f1f] dark:text-white">
            Create Account
          </h2>

          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Start using AI forecasting today
          </p>

          <input
            className="w-full bg-white dark:bg-[#2a2a2a] text-black dark:text-white border border-green-300 dark:border-gray-700 p-3 rounded-xl mb-5 outline-none"
            placeholder="Enter Full Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

          <input
            className="w-full bg-white dark:bg-[#2a2a2a] text-black dark:text-white border border-green-300 dark:border-gray-700 p-3 rounded-xl mb-5 outline-none"
            placeholder="Enter Email"
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            className="w-full bg-white dark:bg-[#2a2a2a] text-black dark:text-white border border-green-300 dark:border-gray-700 p-3 rounded-xl mb-6 outline-none"
            type="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button
            type="submit"
            className="w-full bg-[#9dff00] hover:bg-[#8ee600] text-[#032b11] p-3 rounded-xl font-bold transition-all"
          >
            Register
          </button>

          <p className="text-center mt-6 text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-[#123f1f] dark:text-[#9dff00] font-bold hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;