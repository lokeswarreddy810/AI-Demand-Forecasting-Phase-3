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
   } catch (error) 
   {
  console.log(error.response?.data);
  alert(error.response?.data?.detail || "Registration failed");
   }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-white via-[#f4fff0] to-[#caff9b]">
      <div className="w-1/2 flex flex-col justify-center px-20">
        <h1 className="text-6xl font-bold mb-6 text-[#123f1f]">
          AI Forecast
        </h1>

        <p className="text-lg mb-10 text-gray-700">
          Create your account and unlock powerful AI-driven business forecasting.
        </p>

        <div className="space-y-5 text-lg text-[#123f1f] font-semibold">
          <p>📈 Intelligent analytics platform</p>
          <p>🤖 Machine learning forecasting</p>
          <p>🛡 Secure and scalable architecture</p>
        </div>
      </div>

      <div className="w-1/2 flex justify-center items-center">
        <form
          onSubmit={registerUser}
          className="bg-white border border-green-200 p-10 rounded-3xl shadow-2xl w-96"
        >
          <h2 className="text-3xl font-bold mb-2 text-[#123f1f]">
            Create Account
          </h2>

          <p className="text-gray-500 mb-8">
            Start using AI forecasting today
          </p>

          <input
            className="w-full border border-green-300 p-3 rounded-xl mb-5"
            placeholder="Enter full name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

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
            Register
          </button>

          <p className="text-center mt-6 text-gray-500">
            Already have an account?{" "}
            <Link to="/" className="text-[#39a000] font-bold">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;