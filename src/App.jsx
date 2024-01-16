import { Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "@/widgets/layout";
import routes from "@/routes";
import ParentApp from "./parent/ParentApp";
import { ParentDashboard } from "@/parent/layouts";
import { ChildDashboard } from "@/child/layouts";

function App() {
  return (
    <>
      <div className="container absolute left-2/4 z-10 mx-auto -translate-x-2/4 p-4">
        <Navbar routes={routes} />
      </div>
      <Routes>
        {routes.map(
          ({ path, element }, key) =>
            element && <Route key={key} exact path={path} element={element} />
        )}
        <Route path="*" element={<Navigate to="/home" replace />} />
        <Route path="/parentDashboard/parent/*" element={<ParentDashboard />} />
        <Route path="/childDashboard/*" element={<ChildDashboard />} />
      </Routes>
    </>
  );
}

export default App;
