import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createIntegration,
  getIntegrations,
  toggleIntegration,
  testApiConnection,
} from "../services/integrationService";

function Integrations() {
  const navigate = useNavigate();

  const [integrations, setIntegrations] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("ERP");
  const [apiUrl, setApiUrl] = useState("");
  const [message, setMessage] = useState("");

  const loadIntegrations = async () => {
    try {
      const data = await getIntegrations();
      setIntegrations(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Integrations Error:", error);
      setMessage("Failed to load integrations");
    }
  };

  useEffect(() => {
    loadIntegrations();
  }, []);

  const handleCreate = async () => {
    if (!name.trim() || !apiUrl.trim()) {
      setMessage("Please enter integration name and API URL");
      return;
    }

    try {
      await createIntegration(name, type, apiUrl);
      setMessage("Integration created successfully");
      setName("");
      setApiUrl("");
      loadIntegrations();
    } catch (error) {
      console.log("Create Integration Error:", error);
      setMessage("Failed to create integration");
    }
  };

  const handleTest = async () => {
    if (!apiUrl.trim()) {
      setMessage("Please enter API URL");
      return;
    }

    try {
      const result = await testApiConnection(apiUrl);
      setMessage(result.message || "API connection tested successfully");
    } catch (error) {
      console.log("Test API Error:", error);
      setMessage("Failed to test API connection");
    }
  };

  const handleToggle = async (id) => {
    try {
      await toggleIntegration(id);
      setMessage("Integration status updated successfully");
      loadIntegrations();
    } catch (error) {
      console.log("Toggle Integration Error:", error);
      setMessage("Failed to update integration status");
    }
  };

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-5">
        <div>
          <h1 className="text-4xl font-bold text-[#123f1f] dark:text-white">
            Enterprise Integrations
          </h1>

          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Manage ERP, inventory, external API, and webhook integrations.
          </p>
        </div>

        <button
          onClick={() => navigate("/webhooks")}
          className="bg-[#9dff00] hover:bg-[#8ee600] text-[#032b11] px-6 py-3 rounded-xl font-bold"
        >
          Webhook Management
        </button>
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-md border border-green-300 dark:border-gray-700 mb-10">
        <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-6">
          Create Integration
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            placeholder="Integration Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white dark:bg-[#2a2a2a] text-black dark:text-white border border-green-300 rounded-xl px-4 py-3 outline-none"
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="bg-white dark:bg-[#2a2a2a] text-black dark:text-white border border-green-300 rounded-xl px-4 py-3 outline-none"
          >
            <option value="ERP">ERP</option>
            <option value="Inventory">Inventory</option>
            <option value="External API">External API</option>
          </select>

          <input
            placeholder="API URL"
            value={apiUrl}
            onChange={(e) => setApiUrl(e.target.value)}
            className="bg-white dark:bg-[#2a2a2a] text-black dark:text-white border border-green-300 rounded-xl px-4 py-3 outline-none"
          />

          <div className="flex gap-3">
            <button
              onClick={handleCreate}
              className="bg-[#9dff00] hover:bg-[#8ee600] text-[#032b11] font-bold px-5 rounded-xl"
            >
              Save
            </button>

            <button
              onClick={handleTest}
              className="bg-[#06451d] hover:bg-[#0b5e28] text-white px-5 rounded-xl font-bold"
            >
              Test
            </button>
          </div>
        </div>

        {message && (
          <div className="mt-5 bg-[#f5fff0] dark:bg-[#2a2a2a] text-[#123f1f] dark:text-white px-5 py-4 rounded-xl border border-green-300 dark:border-gray-700">
            {message}
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-md border border-green-300 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-6">
          Integration Management
        </h2>

        <div className="overflow-x-auto max-h-[450px] overflow-y-auto rounded-xl border border-green-300 dark:border-gray-700">
          <table className="w-full min-w-[1000px]">
            <thead className="sticky top-0 bg-white dark:bg-[#1e1e1e] z-10">
              <tr className="border-b border-green-300 dark:border-gray-700 text-left">
                <th className="py-4 px-4 text-gray-900 dark:text-white">
                  Name
                </th>

                <th className="py-4 px-4 text-gray-900 dark:text-white">
                  Type
                </th>

                <th className="py-4 px-4 text-gray-900 dark:text-white">
                  API URL
                </th>

                <th className="py-4 px-4 text-gray-900 dark:text-white">
                  Status
                </th>

                <th className="py-4 px-4 text-gray-900 dark:text-white">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {integrations.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-8 text-gray-500 dark:text-gray-300"
                  >
                    No integrations available
                  </td>
                </tr>
              ) : (
                integrations.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-100 dark:border-gray-700"
                  >
                    <td className="py-4 px-4 text-gray-800 dark:text-gray-200 font-bold">
                      {item.integration_name}
                    </td>

                    <td className="py-4 px-4 text-gray-800 dark:text-gray-200">
                      {item.integration_type}
                    </td>

                    <td className="py-4 px-4 text-gray-700 dark:text-gray-300">
                      {item.api_url}
                    </td>

                    <td className="py-4 px-4">
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-bold ${
                          item.status === "Active" || item.status === "active"
                            ? "bg-[#9dff00] text-[#032b11]"
                            : "bg-gray-500 text-white"
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleToggle(item.id)}
                        className="bg-[#9dff00] hover:bg-[#8ee600] text-[#032b11] px-4 py-2 rounded-lg font-bold"
                      >
                        Toggle
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Integrations;