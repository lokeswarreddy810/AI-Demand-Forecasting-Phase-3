import { useEffect, useState } from "react";
import {
  createSchedule,
  getSchedules,
  runScheduleNow,
  toggleSchedule,
} from "../services/automationService";

function Automation() {
  const [jobs, setJobs] = useState([]);
  const [jobName, setJobName] = useState("");
  const [intervalType, setIntervalType] = useState("daily");
  const [intervalValue, setIntervalValue] = useState(1);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const loadJobs = async () => {
    try {
      setLoading(true);
      const data = await getSchedules();
      setJobs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log("Automation Error:", error);
      setMessage("Failed to load automation jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleCreate = async () => {
    if (!jobName.trim()) {
      setMessage("Please enter schedule name");
      return;
    }

    try {
      setLoading(true);

      await createSchedule(
        jobName,
        intervalType,
        Number(intervalValue)
      );

      setMessage("Automation schedule created successfully");
      setJobName("");
      setIntervalValue(1);

      loadJobs();
    } catch (error) {
      console.log(error);
      setMessage("Failed to create schedule");
    } finally {
      setLoading(false);
    }
  };

  const handleRunNow = async (id) => {
    try {
      setLoading(true);
      await runScheduleNow(id);

      setMessage("Schedule executed successfully");

      loadJobs();
    } catch (error) {
      console.log(error);
      setMessage("Failed to run schedule");
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (id) => {
    try {
      setLoading(true);

      await toggleSchedule(id);

      setMessage("Schedule status updated successfully");

      loadJobs();
    } catch (error) {
      console.log(error);
      setMessage("Failed to update schedule");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-[#123f1f] dark:text-white mb-3">
        Smart Automation
      </h1>

      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Create automated forecasting schedules and run recurring forecast jobs.
      </p>

      <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-md border border-green-300 dark:border-gray-700 mb-10">
        <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-6">
          Create Forecast Schedule
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            placeholder="Schedule Name"
            value={jobName}
            onChange={(e) => setJobName(e.target.value)}
            className="bg-white dark:bg-[#2a2a2a] text-black dark:text-white border border-green-300 rounded-xl px-4 py-3 outline-none"
          />

          <select
            value={intervalType}
            onChange={(e) => setIntervalType(e.target.value)}
            className="bg-white dark:bg-[#2a2a2a] text-black dark:text-white border border-green-300 rounded-xl px-4 py-3 outline-none"
          >
            <option value="hourly">Hourly</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>

          <input
            type="number"
            min="1"
            value={intervalValue}
            onChange={(e) => setIntervalValue(e.target.value)}
            className="bg-white dark:bg-[#2a2a2a] text-black dark:text-white border border-green-300 rounded-xl px-4 py-3 outline-none"
          />

          <button
            onClick={handleCreate}
            disabled={loading}
            className="bg-[#9dff00] hover:bg-[#8ee600] text-[#032b11] font-bold rounded-xl disabled:opacity-60"
          >
            {loading ? "Processing..." : "Create Schedule"}
          </button>
        </div>

        {message && (
          <p className="mt-5 text-gray-800 dark:text-gray-200 font-medium">
            {message}
          </p>
        )}
      </div>

      <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-md border border-green-300 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-6">
          Automation Jobs
        </h2>

        <div className="overflow-x-auto max-h-[500px] overflow-y-auto rounded-xl border border-green-300 dark:border-gray-700">
          <table className="w-full min-w-[1000px]">
            <thead className="sticky top-0 bg-white dark:bg-[#1e1e1e] z-10">
              <tr className="border-b border-green-300 dark:border-gray-700 text-left">
                <th className="py-4 px-4 text-gray-900 dark:text-white">
                  Schedule Name
                </th>

                <th className="py-4 px-4 text-gray-900 dark:text-white">
                  Interval Type
                </th>

                <th className="py-4 px-4 text-gray-900 dark:text-white">
                  Interval Value
                </th>

                <th className="py-4 px-4 text-gray-900 dark:text-white">
                  Status
                </th>

                <th className="py-4 px-4 text-gray-900 dark:text-white">
                  Last Run
                </th>

                <th className="py-4 px-4 text-gray-900 dark:text-white">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {jobs.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-8 text-gray-500 dark:text-gray-300"
                  >
                    No automation jobs available
                  </td>
                </tr>
              ) : (
                jobs.map((job) => (
                  <tr
                    key={job.id}
                    className="border-b border-gray-100 dark:border-gray-700"
                  >
                    <td className="py-4 px-4 text-gray-800 dark:text-gray-200 font-semibold">
                      {job.job_name}
                    </td>

                    <td className="py-4 px-4 text-gray-800 dark:text-gray-200 capitalize">
                      {job.interval_type}
                    </td>

                    <td className="py-4 px-4 text-gray-800 dark:text-gray-200">
                      {job.interval_value}
                    </td>

                    <td className="py-4 px-4">
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-bold ${
                          job.is_active
                            ? "bg-[#9dff00] text-[#032b11]"
                            : "bg-gray-500 text-white"
                        }`}
                      >
                        {job.is_active ? "Active" : "Disabled"}
                      </span>
                    </td>

                    <td className="py-4 px-4 text-gray-800 dark:text-gray-200">
                      {job.last_run
                        ? new Date(job.last_run).toLocaleString()
                        : "Not Run"}
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleRunNow(job.id)}
                          disabled={loading}
                          className="bg-[#9dff00] hover:bg-[#8ee600] text-[#032b11] px-4 py-2 rounded-lg font-bold disabled:opacity-60"
                        >
                          Run
                        </button>

                        <button
                          onClick={() => handleToggle(job.id)}
                          disabled={loading}
                          className="bg-[#123f1f] hover:bg-[#0d3018] text-white px-4 py-2 rounded-lg font-bold disabled:opacity-60"
                        >
                          {job.is_active ? "Disable" : "Enable"}
                        </button>
                      </div>
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

export default Automation;