import React from "react";
import ReactDOM from "react-dom/client";
// import EmployeesPage from "./pages/EmployeesPage";
// import StudentManagementPage from "./pages/StudentManagementPage";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* <StudentManagementPage /> */}
    <App></App>
  </React.StrictMode>
);
