import { useState } from "react";
import API from "../api/axiosConfig";

function WebhookManagement() {
  const [payload, setPayload] = useState(`{
  "event": "forecast_generated",
  "product_name": "Laptop",
  "predicted_quantity": 150
}`);

  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendWebhook = async () => {
    try {
      setLoading(true);

      const parsed = JSON.parse(payload);

      const res = await API.post(
        "/integrations/webhook",
        parsed
      );

      setResponse(
        res.data.message ||
        "Webhook sent successfully"
      );
    } catch (error) {
      setResponse(
        error.response?.data?.detail ||
        "Invalid JSON or webhook failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const resetPayload = () => {
    setPayload(`{
  "event": "forecast_generated",
  "product_name": "Laptop",
  "predicted_quantity": 150
}`);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#123f1f] dark:text-white">
          Webhook Management
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Test and manage webhook payloads for external integrations.
        </p>
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-md border border-green-300 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-6">
          Webhook Payload
        </h2>

        <div className="mb-5 bg-[#f5fff0] dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 rounded-xl p-4">
          <p className="text-gray-700 dark:text-gray-300">
            Example Payload:
          </p>

          <code className="block mt-2 text-sm text-[#123f1f] dark:text-green-300">
            forecast_generated, product_name,
            predicted_quantity
          </code>
        </div>

        <textarea
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
          className="
            w-full
            h-72
            p-4
            rounded-xl
            border
            border-green-300
            dark:border-gray-700
            bg-white
            dark:bg-[#2a2a2a]
            text-black
            dark:text-white
            font-mono
            outline-none
          "
        />

        <div className="flex flex-wrap gap-4 mt-6">
          <button
            onClick={sendWebhook}
            disabled={loading}
            className="
              bg-[#9dff00]
              hover:bg-[#8ee600]
              text-[#032b11]
              px-6
              py-3
              rounded-xl
              font-bold
              disabled:opacity-60
            "
          >
            {loading
              ? "Sending..."
              : "Send Webhook"}
          </button>

          <button
            onClick={resetPayload}
            className="
              bg-[#06451d]
              hover:bg-[#0b5e28]
              text-white
              px-6
              py-3
              rounded-xl
              font-bold
            "
          >
            Reset Payload
          </button>
        </div>

        {response && (
          <div className="mt-6 bg-[#f5fff0] dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 rounded-xl p-5">
            <h3 className="font-bold text-[#123f1f] dark:text-white mb-2">
              Webhook Response
            </h3>

            <p className="text-gray-700 dark:text-gray-300">
              {response}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default WebhookManagement;