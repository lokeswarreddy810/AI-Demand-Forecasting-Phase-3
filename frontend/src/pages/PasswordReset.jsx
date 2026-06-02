import { useState } from "react";
import {
  forgotPassword,
  resetPassword,
} from "../services/authService";

function PasswordReset() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleForgot = async () => {
    try {
      const res = await forgotPassword(email);

      setMessage(
        res.message ||
          "Reset token generated successfully"
      );
    } catch (error) {
      setMessage("Failed to generate reset token");
    }
  };

  const handleReset = async () => {
    try {
      const res = await resetPassword(
        email,
        newPassword
      );

      setMessage(
        res.message ||
          "Password reset successfully"
      );
    } catch (error) {
      setMessage("Failed to reset password");
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#123f1f] dark:text-white">
          Password Reset
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Generate reset token and securely update your account password.
        </p>
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-md border border-green-300 dark:border-gray-700 max-w-2xl">
        <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-6">
          Reset Account Password
        </h2>

        <div className="space-y-5">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email Address"
            className="w-full bg-white dark:bg-[#2a2a2a] text-black dark:text-white border border-green-300 dark:border-gray-700 rounded-xl px-4 py-3 outline-none"
          />

          <button
            onClick={handleForgot}
            className="w-full bg-[#9dff00] hover:bg-[#8ee600] text-[#032b11] px-6 py-3 rounded-xl font-bold transition-all"
          >
            Generate Reset Token
          </button>

          <input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter New Password"
            type="password"
            className="w-full bg-white dark:bg-[#2a2a2a] text-black dark:text-white border border-green-300 dark:border-gray-700 rounded-xl px-4 py-3 outline-none"
          />

          <button
            onClick={handleReset}
            className="w-full bg-[#06451d] hover:bg-[#0b5e28] text-white px-6 py-3 rounded-xl font-bold transition-all"
          >
            Reset Password
          </button>

          {message && (
            <div className="bg-[#f5fff0] dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 text-[#123f1f] dark:text-white px-5 py-4 rounded-xl mt-4">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PasswordReset;