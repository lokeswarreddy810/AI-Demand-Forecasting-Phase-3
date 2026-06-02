import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const updateProfile = () => {
    setMessage("Profile updated successfully");
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#123f1f] dark:text-white">
          User Profile
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Manage your account information and security settings.
        </p>
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-md max-w-2xl border border-green-300 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-6">
          Profile Information
        </h2>

        <label className="block mb-3 text-gray-700 dark:text-gray-300 font-medium">
          Full Name
        </label>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Full Name"
          className="w-full bg-white dark:bg-[#2a2a2a] text-black dark:text-white border border-green-300 dark:border-gray-700 rounded-xl px-4 py-3 outline-none mb-6"
        />

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={updateProfile}
            className="bg-[#9dff00] hover:bg-[#8ee600] text-[#032b11] px-6 py-3 rounded-xl font-bold transition-all"
          >
            Update Profile
          </button>

          <button
            onClick={() => navigate("/password-reset")}
            className="bg-[#06451d] hover:bg-[#0b5e28] text-white px-6 py-3 rounded-xl font-bold transition-all"
          >
            Reset Password
          </button>
        </div>

        {message && (
          <div className="mt-6 bg-[#f5fff0] dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 text-[#123f1f] dark:text-white px-5 py-4 rounded-xl">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;