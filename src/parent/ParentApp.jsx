import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/parent/layouts";

function ParentApp() {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
  );
}

export default ParentApp;
