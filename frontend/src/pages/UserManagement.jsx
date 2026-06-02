import { useState } from "react";
import API from "../api/axiosConfig";
import PageLoader from "../components/loaders/PageLoader";
import ReusableTable from "../components/tables/ReusableTable";

function UserManagement() {
  const [userId, setUserId] = useState("");
  const [profile, setProfile] = useState(null);
  const [activity, setActivity] = useState("");
  const [activities, setActivities] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const loadProfile = async () => {
    try {
      setLoading(true);

      const res = await API.get(
        `/user-management/profile/${userId}`
      );

      setProfile(res.data);
    } catch (error) {
      setMessage("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async () => {
    try {
      await API.patch(
        `/user-management/account-status/${userId}`
      );

      setMessage("Account status updated");

      loadProfile();
    } catch (error) {
      setMessage("Failed to update status");
    }
  };

  const addActivity = async () => {
    try {
      await API.post(
        `/user-management/activity/${userId}?activity=${activity}`
      );

      setActivity("");
      setMessage("Activity added");

      loadActivities();
    } catch (error) {
      setMessage("Failed to add activity");
    }
  };

  const loadActivities = async () => {
    try {
      const res = await API.get(
        `/user-management/activity/${userId}`
      );

      setActivities(
        Array.isArray(res.data)
          ? res.data
          : []
      );
    } catch (error) {
      setMessage("Failed to load activities");
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  const activityRows = activities.map((item) => [
    item.activity,
    item.created_at
      ? new Date(item.created_at).toLocaleString()
      : "N/A",
  ]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#123f1f] dark:text-white">
          User Management
        </h1>

        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Manage user profiles, account status, and activity tracking.
        </p>
      </div>

      <Section title="Search User">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            value={userId}
            onChange={(e) =>
              setUserId(e.target.value)
            }
            placeholder="Enter User ID"
            className="bg-white dark:bg-[#2a2a2a] text-black dark:text-white border border-green-300 dark:border-gray-700 rounded-xl px-4 py-3 outline-none"
          />

          <button
            onClick={() => {
              loadProfile();
              loadActivities();
            }}
            className="bg-[#9dff00] hover:bg-[#8ee600] text-[#032b11] px-8 py-3 rounded-xl font-bold"
          >
            Search
          </button>
        </div>

        {message && (
          <div className="mt-5 bg-[#f5fff0] dark:bg-[#2a2a2a] border border-green-300 dark:border-gray-700 text-[#123f1f] dark:text-white px-5 py-4 rounded-xl">
            {message}
          </div>
        )}
      </Section>

      {profile && (
        <Section title="Profile Details">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <InfoCard
              title="Name"
              value={profile.name || "N/A"}
            />

            <InfoCard
              title="Email"
              value={profile.email || "N/A"}
            />

            <InfoCard
              title="Role"
              value={profile.role || "N/A"}
            />

            <InfoCard
              title="Status"
              value={
                profile.is_active
                  ? "Active"
                  : "Disabled"
              }
            />
          </div>

          <button
            onClick={toggleStatus}
            className="bg-[#06451d] hover:bg-[#0b5e28] text-white px-6 py-3 rounded-xl font-bold"
          >
            Toggle Account Status
          </button>
        </Section>
      )}

      <Section title="Add User Activity">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            value={activity}
            onChange={(e) =>
              setActivity(e.target.value)
            }
            placeholder="Enter Activity"
            className="bg-white dark:bg-[#2a2a2a] text-black dark:text-white border border-green-300 dark:border-gray-700 rounded-xl px-4 py-3 outline-none"
          />

          <button
            onClick={addActivity}
            className="bg-[#9dff00] hover:bg-[#8ee600] text-[#032b11] px-8 py-3 rounded-xl font-bold"
          >
            Add Activity
          </button>
        </div>
      </Section>

      <Section title="User Activity Tracking">
        <ReusableTable
          headers={[
            "Activity",
            "Created At",
          ]}
          rows={activityRows}
          emptyMessage="No activities available"
        />
      </Section>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="bg-white dark:bg-[#1e1e1e] p-8 rounded-2xl shadow-md border border-green-300 dark:border-gray-700 mb-8">
      <h2 className="text-2xl font-bold text-[#123f1f] dark:text-white mb-6">
        {title}
      </h2>

      {children}
    </div>
  );
}

function InfoCard({ title, value }) {
  return (
    <div className="bg-[#f5fff0] dark:bg-[#2a2a2a] p-5 rounded-xl border border-green-300 dark:border-gray-700">
      <p className="text-gray-600 dark:text-gray-300">
        {title}
      </p>

      <h3 className="text-xl font-bold text-[#123f1f] dark:text-white mt-2">
        {value}
      </h3>
    </div>
  );
}

export default UserManagement;