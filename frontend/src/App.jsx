import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Datasets from "./pages/Datasets";
import Upload from "./pages/Upload";
import Forecast from "./pages/Forecast";
import Reports from "./pages/Reports";
import Monitoring from "./pages/Monitoring";
import AdminDashboard from "./pages/AdminDashboard";
import AIOptimization from "./pages/AIOptimization";

import Automation from "./pages/Automation";
import Integrations from "./pages/Integrations";
import AIRecommendations from "./pages/AIRecommendations";
import ForecastComparison from "./pages/ForecastComparison";
import Alerts from "./pages/Alerts";
import AlertSettings from "./pages/AlertSettings";
import DashboardSettings from "./pages/DashboardSettings";
import UserManagement from "./pages/UserManagement";
import Profile from "./pages/Profile";
import PasswordReset from "./pages/PasswordReset";
import WebhookManagement from "./pages/WebhookManagement";
import KPIWidgets from "./pages/KPIWidgets";

import Layout from "./layouts/Layout";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
      <Route path="/datasets" element={<ProtectedRoute><Layout><Datasets /></Layout></ProtectedRoute>} />
      <Route path="/upload" element={<ProtectedRoute><Layout><Upload /></Layout></ProtectedRoute>} />
      <Route path="/forecast" element={<ProtectedRoute><Layout><Forecast /></Layout></ProtectedRoute>} />
      <Route path="/reports" element={<ProtectedRoute><Layout><Reports /></Layout></ProtectedRoute>} />
      <Route path="/monitoring" element={<ProtectedRoute><Layout><Monitoring /></Layout></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute><Layout><AdminDashboard /></Layout></ProtectedRoute>} />
      <Route path="/ai-optimization" element={<ProtectedRoute><Layout><AIOptimization /></Layout></ProtectedRoute>} />

      <Route path="/automation" element={<ProtectedRoute><Layout><Automation /></Layout></ProtectedRoute>} />
      <Route path="/integrations" element={<ProtectedRoute><Layout><Integrations /></Layout></ProtectedRoute>} />
      <Route path="/ai-recommendations" element={<ProtectedRoute><Layout><AIRecommendations /></Layout></ProtectedRoute>} />
      <Route path="/forecast-comparison" element={<ProtectedRoute><Layout><ForecastComparison /></Layout></ProtectedRoute>} />
      <Route path="/alerts" element={<ProtectedRoute><Layout><Alerts /></Layout></ProtectedRoute>} />
      <Route path="/alert-settings" element={<ProtectedRoute><Layout><AlertSettings /></Layout></ProtectedRoute>} />
      <Route path="/dashboard-settings" element={<ProtectedRoute><Layout><DashboardSettings /></Layout></ProtectedRoute>} />
      <Route path="/user-management" element={<ProtectedRoute><Layout><UserManagement /></Layout></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>} />
      <Route path="/password-reset" element={<ProtectedRoute><Layout><PasswordReset /></Layout></ProtectedRoute>} />
      <Route path="/webhooks" element={<ProtectedRoute><Layout><WebhookManagement /></Layout></ProtectedRoute>} />
      <Route path="/kpi-widgets" element={<ProtectedRoute><Layout><KPIWidgets /></Layout></ProtectedRoute>} />
    </Routes>
  );
}

export default App;