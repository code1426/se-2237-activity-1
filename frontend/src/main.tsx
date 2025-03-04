import React from "react";
import ReactDOM from "react-dom/client";
import EmployeesPage from "./pages/EmployeesPage";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <EmployeesPage />
  </React.StrictMode>
);
