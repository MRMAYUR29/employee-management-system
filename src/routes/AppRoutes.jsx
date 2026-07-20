import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";
import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import { lazy } from "react";
const Dashboard = lazy(
  () => import("../pages/Dashboard/Dashboard")
);

const Employees = lazy(
  () => import("../pages/Employees/Employees")
);

const Profile = lazy(
  () => import("../pages/Profile/Profile")
);

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="employees" element={<Employees />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
