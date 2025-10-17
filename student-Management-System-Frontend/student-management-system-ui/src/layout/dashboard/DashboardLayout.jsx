import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="app-container">
      <Navbar className="navbar" />
      <div className="main-content">
        <Sidebar className="sidebar" />
        <div className="page-content">
          {/* This is where child routes render */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}
