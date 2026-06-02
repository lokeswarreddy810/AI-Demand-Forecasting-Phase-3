import { useEffect, useState } from "react";
import {
  getAlertSettings,
  updateAlertSettings,
  sendEmailNotification,
  createForecastFailureAlert,
  createReportCompletionAlert,
} from "../services/notificationService";

function AlertSettings() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [forecastAlerts, setForecastAlerts] = useState(true);
  const [reportAlerts, setReportAlerts] = useState(true);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const loadSettings = async () => {
    try {
      const data = await getAlertSettings();

      setEmailAlerts(Boolean(data.email_notifications));
      setForecastAlerts(Boolean(data.forecast_failure_alerts));
      setReportAlerts(Boolean(data.report_completion_alerts));
    } catch (error) {
      console.log("Settings Error:", error);
      setMessage("Failed to load alert settings");
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const saveSettings = async () => {
    try {
      setLoading(true);

      const result = await updateAlertSettings(
        emailAlerts,
        forecastAlerts,
        reportAlerts
      );

      setMessage(result.message || "Settings updated successfully");
    } catch (error) {
      console.log("Save Settings Error:", error);
      setMessage("Failed to update settings");
    } finally {
      setLoading(false);
    }
  };

  const testEmail = async () => {
    if (!email.trim()) {
      setMessage("Enter email first");
      return;
    }

    try {
      setLoading(true);

      const result = await sendEmailNotification(
        email,
        "AI Forecasting Test Alert",
        "This is a test email notification from AI Demand Forecasting system."
      );

      setMessage(result.message || "Email notification tested successfully");
    } catch (error) {
      console.log("Email Test Error:", error);
      setMessage("Failed to send test email");
    } finally {
      setLoading(false);
    }
  };

  const testForecastFailure = async () => {
    try {
      setLoading(true);
      const result = await createForecastFailureAlert(
        "Demo forecast failure alert"
      );
      setMessage(result.message || "Forecast failure alert created");
    } catch (error) {
      console.log("Forecast Alert Error:", error);
      setMessage("Failed to create forecast failure alert");
    } finally {
      setLoading(false);
    }
  };

  const testReportCompletion = async () => {
    try {
      setLoading(true);
      const result = await createReportCompletionAlert("Demo Forecast Report");
      setMessage(result.message || "Report completion alert created");
    } catch (error) {
      console.log("Report Alert Error:", error);
      setMessage("Failed to create report completion alert");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-[#123f1f] dark:text-white">
          Alert Settings
        </h1>
        <p className="text-gray-500 dark:text-gray-300 mt-2">
          Manage email alerts, forecast failure alerts, and report completion
          notifications.
        </p>
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-md border border-green-200">
        <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-6">
          Notification Preferences
        </h2>

        <div className="space-y-5">
          <label className="flex justify-between items-center border border-green-100 p-4 rounded-xl">
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              Email Notifications
            </span>
            <input
              type="checkbox"
              checked={emailAlerts}
              onChange={() => setEmailAlerts(!emailAlerts)}
              className="w-5 h-5 accent-[#9dff00]"
            />
          </label>

          <label className="flex justify-between items-center border border-green-100 p-4 rounded-xl">
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              Forecast Failure Alerts
            </span>
            <input
              type="checkbox"
              checked={forecastAlerts}
              onChange={() => setForecastAlerts(!forecastAlerts)}
              className="w-5 h-5 accent-[#9dff00]"
            />
          </label>

          <label className="flex justify-between items-center border border-green-100 p-4 rounded-xl">
            <span className="font-semibold text-gray-700 dark:text-gray-200">
              Report Completion Alerts
            </span>
            <input
              type="checkbox"
              checked={reportAlerts}
              onChange={() => setReportAlerts(!reportAlerts)}
              className="w-5 h-5 accent-[#9dff00]"
            />
          </label>

          <button
            onClick={saveSettings}
            disabled={loading}
            className="bg-[#9dff00] hover:bg-[#8ee600] text-[#032b11] px-6 py-3 rounded-xl font-bold disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-md border border-green-200">
        <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-6">
          Test Notifications
        </h2>

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email for test notification"
          className="border border-green-200 rounded-xl px-4 py-3 text-black w-full mb-5 outline-none focus:ring-2 focus:ring-[#9dff00]"
        />

        <div className="flex flex-wrap gap-4">
          <button
            onClick={testEmail}
            disabled={loading}
            className="bg-[#123f1f] hover:bg-[#0b2d15] text-white px-6 py-3 rounded-xl disabled:opacity-60"
          >
            Test Email
          </button>

          <button
            onClick={testForecastFailure}
            disabled={loading}
            className="bg-[#9dff00] hover:bg-[#8ee600] text-[#032b11] px-6 py-3 rounded-xl font-bold disabled:opacity-60"
          >
            Test Forecast Failure
          </button>

          <button
            onClick={testReportCompletion}
            disabled={loading}
            className="bg-[#9dff00] hover:bg-[#8ee600] text-[#032b11] px-6 py-3 rounded-xl font-bold disabled:opacity-60"
          >
            Test Report Completion
          </button>
        </div>

        {message && (
          <div className="mt-6 bg-[#f2ffe6] dark:bg-[#123f1f] text-[#123f1f] dark:text-white px-5 py-4 rounded-xl font-semibold">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default AlertSettings;