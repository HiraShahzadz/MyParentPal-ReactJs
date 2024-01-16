import { Routes, Route, Navigate } from "react-router-dom";
import { ParentDashboard, Auth } from "@/parent/layouts";

function ParentApp() {
  return (
    <Routes>
      <Route path="/parentDashboard/parent/*" element={<ParentDashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
  );
}

export default ParentApp;
