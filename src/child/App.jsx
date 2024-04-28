import { Routes, Route, Navigate } from "react-router-dom";
import { ChildDashboard, Auth } from "@/child/layouts";

function App() {
  return (
    <Routes>
      <Route path="/childDashboard/*" element={<ChildDashboard />} />
      <Route path="/auth/*" element={<Auth />} />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
      
    </Routes>
  );
}

export default App;
