import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Navbar } from "@/widgets/layout";
import routes from "@/routes";
import ParentApp from "./parent/ParentApp";
import { ParentDashboard } from "@/parent/layouts";
import { ChildDashboard } from "@/child/layouts";
import { Dashboard } from "@/admin/layouts";
import { MaterialTailwindControllerProvider as ParentProvider } from "@/parent/context";
import { MaterialTailwindControllerProvider as ChildProvider } from "@/child/context";
import { MaterialTailwindControllerProvider as AdminProvider } from "@/admin/context";

function App() {
  const location = useLocation();
  const isDashboardRoute =
    location.pathname.startsWith("/parentDashboard/parent") ||
    location.pathname.startsWith("/childDashboard") ||
    location.pathname.startsWith("/dashboard");

  return (
    <>
      {!isDashboardRoute && (
        <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
          <Navbar routes={routes} />
        </div>
      )}
      <Routes>
        {routes.map(
          ({ path, element }, key) =>
            element && <Route key={key} exact path={path} element={element} />
        )}
        <Route path="*" element={<Navigate to="/home" replace />} />
        <Route
          path="/parentDashboard/parent/*"
          element={
            <ParentProvider>
              <ParentDashboard />
            </ParentProvider>
          }
        />
        <Route
          path="/childDashboard/*"
          element={
            <ChildProvider>
              <ChildDashboard />
            </ChildProvider>
          }
        />
        <Route
          path="/dashboard/*"
          element={
            <AdminProvider>
              <Dashboard />
            </AdminProvider>
          }
        />
      </Routes>
    </>
  );
}

export default App;
