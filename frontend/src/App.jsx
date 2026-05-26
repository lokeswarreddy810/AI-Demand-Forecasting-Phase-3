import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Forecast from "./pages/Forecast";
import Datasets from "./pages/Datasets";
import Reports from "./pages/Reports";
import Monitoring from "./pages/Monitoring";
import AdminDashboard from "./pages/AdminDashboard";
import AIOptimization from "./pages/AIOptimization";

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
      <Route path="/upload" element={<ProtectedRoute><Layout><Upload /></Layout></ProtectedRoute>} />
      <Route path="/forecast" element={<ProtectedRoute><Layout><Forecast /></Layout></ProtectedRoute>} />
      <Route path="/datasets" element={<ProtectedRoute><Layout><Datasets /></Layout></ProtectedRoute>} />
      <Route path="/reports" element={<ProtectedRoute><Layout><Reports /></Layout></ProtectedRoute>} />
      <Route path="/monitoring" element={<ProtectedRoute><Layout><Monitoring /></Layout></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute><Layout><AdminDashboard /></Layout></ProtectedRoute>} />
      <Route path="/ai-optimization" element={<ProtectedRoute><Layout><AIOptimization /></Layout></ProtectedRoute>} />
    </Routes>
  );
}

export default App;