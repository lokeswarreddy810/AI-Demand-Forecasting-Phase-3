import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import API from "../api/axiosConfig";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    try {
      const formData = new URLSearchParams();

      formData.append("username", email);
      formData.append("password", password);

      const response = await API.post(
        "/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
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
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5fff0]">
      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-md border border-green-200">
        <h1 className="text-4xl font-bold text-[#123f1f] text-center mb-8">
          Login
        </h1>

        {error && (
          <div className="bg-red-100 text-red-700 border border-red-300 rounded-xl p-3 mb-5">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-green-300 rounded-xl px-4 py-3 mb-5 text-black bg-white"
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-green-300 rounded-xl px-4 py-3 mb-6 text-black bg-white"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#7ed900] text-[#123f1f] font-bold py-3 rounded-xl"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="text-green-700 font-bold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;