import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axiosConfig";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const formData = new URLSearchParams();
      formData.append("username", form.email);
      formData.append("password", form.password);

      const response = await API.post("/auth/login", formData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      localStorage.setItem("token", response.data.access_token);
      navigate("/dashboard");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-white via-[#f4fff0] to-[#caff9b]">
      <div className="w-1/2 flex flex-col justify-center px-20">
        <h1 className="text-6xl font-bold mb-6 text-[#123f1f]">AI Forecast</h1>
        <p className="text-lg mb-10 text-gray-700">
          Intelligent demand forecasting and analytics platform powered by machine learning.
        </p>
      </div>

      <div className="w-1/2 flex justify-center items-center">
        <form
          onSubmit={loginUser}
          className="bg-white border border-green-200 p-10 rounded-3xl shadow-2xl w-96"
        >
          <h2 className="text-3xl font-bold mb-2 text-[#123f1f]">
            Welcome Back
          </h2>

          <input
            className="w-full border border-green-300 p-3 rounded-xl mb-5"
            placeholder="Enter email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            className="w-full border border-green-300 p-3 rounded-xl mb-6"
            type="password"
            placeholder="Enter password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button className="w-full bg-[#8ee000] text-[#123f1f] p-3 rounded-xl font-bold">
            Login
          </button>

          <p className="text-center mt-6 text-gray-500">
            Don’t have an account?{" "}
            <Link to="/register" className="text-[#39a000] font-bold">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;