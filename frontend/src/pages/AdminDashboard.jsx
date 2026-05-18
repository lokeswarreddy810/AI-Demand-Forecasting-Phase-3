import { useEffect, useState } from "react";

import API from "../api/axiosConfig";

function Admin() {

  const [analytics, setAnalytics] = useState({});

  const [users, setUsers] = useState([]);

  const [datasets, setDatasets] = useState([]);

  const [activities, setActivities] = useState([]);

  const [reports, setReports] = useState([]);

  useEffect(() => {

    loadAdminData();

  }, []);

  const loadAdminData = async () => {

    try {

      const analyticsRes = await API.get(
        "/admin/analytics"
      );

      const usersRes = await API.get(
        "/admin/users"
      );

      const datasetRes = await API.get(
        "/admin/datasets"
      );

      const activitiesRes = await API.get(
        "/admin/forecast-activities"
      );

      const reportsRes = await API.get(
        "/admin/reports"
      );

      setAnalytics(analyticsRes.data);

      setUsers(usersRes.data);

      setDatasets(datasetRes.data);

      setActivities(activitiesRes.data);

      setReports(reportsRes.data);

    } catch (error) {

      console.log(
        "Admin Error:",
        error.response?.data
      );
    }
  };

  const disableUser = async (id) => {

    await API.put(`/admin/user/${id}/disable`);

    loadAdminData();
  };

  const enableUser = async (id) => {

    await API.put(`/admin/user/${id}/enable`);

    loadAdminData();
  };

  const deleteDataset = async (id) => {

    await API.delete(`/admin/dataset/${id}`);

    loadAdminData();
  };

  return (

    <div>

      <div className="mb-10">

        <h1 className="text-4xl font-bold text-[#123f1f]">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Advanced AI Demand Forecasting Administration
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mb-10">

        <div className="bg-white rounded-2xl shadow-md p-6 border border-green-200">
          <p className="text-gray-500">Total Users</p>
          <h2 className="text-4xl font-bold text-[#123f1f] mt-2">
            {analytics.total_users || 0}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 border border-green-200">
          <p className="text-gray-500">Datasets</p>
          <h2 className="text-4xl font-bold text-[#123f1f] mt-2">
            {analytics.total_datasets || 0}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 border border-green-200">
          <p className="text-gray-500">Forecasts</p>
          <h2 className="text-4xl font-bold text-[#123f1f] mt-2">
            {analytics.total_forecasts || 0}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 border border-green-200">
          <p className="text-gray-500">Reports</p>
          <h2 className="text-4xl font-bold text-[#123f1f] mt-2">
            {analytics.total_reports || 0}
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 border border-green-200">
          <p className="text-gray-500">Activities</p>
          <h2 className="text-4xl font-bold text-[#123f1f] mt-2">
            {analytics.total_forecast_activities || 0}
          </h2>
        </div>

      </div>

      <div className="bg-white rounded-2xl shadow-md p-8 border border-green-200 mb-10">

        <h2 className="text-3xl font-bold text-[#123f1f] mb-6">
          Manage Users
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b border-green-200 text-left">

              <th className="py-3">ID</th>

              <th className="py-3">Email</th>

              <th className="py-3">Role</th>

              <th className="py-3">Actions</th>

            </tr>

          </thead>

          <tbody>

            {users.map((user) => (

              <tr
                key={user.id}
                className="border-b border-gray-100"
              >

                <td className="py-4">
                  {user.id}
                </td>

                <td className="py-4">
                  {user.email}
                </td>

                <td className="py-4 capitalize">
                  {user.role}
                </td>

                <td className="py-4 flex gap-3">

                  <button
                    onClick={() => enableUser(user.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg"
                  >
                    Enable
                  </button>

                  <button
                    onClick={() => disableUser(user.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Disable
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="bg-white rounded-2xl shadow-md p-8 border border-green-200 mb-10">

        <h2 className="text-3xl font-bold text-[#123f1f] mb-6">
          Manage Datasets
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b border-green-200 text-left">

              <th className="py-3">ID</th>

              <th className="py-3">Product</th>

              <th className="py-3">Region</th>

              <th className="py-3">Sales</th>

              <th className="py-3">Action</th>

            </tr>

          </thead>

          <tbody>

            {datasets.map((item) => (

              <tr
                key={item.id}
                className="border-b border-gray-100"
              >

                <td className="py-4">
                  {item.id}
                </td>

                <td className="py-4">
                  {item.product_name}
                </td>

                <td className="py-4">
                  {item.region}
                </td>

                <td className="py-4">
                  ₹ {item.sales_amount}
                </td>

                <td className="py-4">

                  <button
                    onClick={() => deleteDataset(item.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="bg-white rounded-2xl shadow-md p-8 border border-green-200 mb-10">

        <h2 className="text-3xl font-bold text-[#123f1f] mb-6">
          Forecast Activities
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b border-green-200 text-left">

              <th className="py-3">Product</th>

              <th className="py-3">Model</th>

              <th className="py-3">Accuracy</th>

              <th className="py-3">Date</th>

            </tr>

          </thead>

          <tbody>

            {activities.map((item, index) => (

              <tr
                key={index}
                className="border-b border-gray-100"
              >

                <td className="py-4">
                  {item.product_name}
                </td>

                <td className="py-4">
                  {item.model_used}
                </td>

                <td className="py-4">
                  {item.accuracy}%
                </td>

                <td className="py-4">
                  {item.forecast_date}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="bg-white rounded-2xl shadow-md p-8 border border-green-200">

        <h2 className="text-3xl font-bold text-[#123f1f] mb-6">
          Uploaded Reports
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b border-green-200 text-left">

              <th className="py-3">ID</th>

              <th className="py-3">Report Name</th>

              <th className="py-3">Created At</th>

            </tr>

          </thead>

          <tbody>

            {reports.map((item) => (

              <tr
                key={item.id}
                className="border-b border-gray-100"
              >

                <td className="py-4">
                  {item.id}
                </td>

                <td className="py-4">
                  {item.report_name}
                </td>

                <td className="py-4">
                  {item.created_at}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Admin;