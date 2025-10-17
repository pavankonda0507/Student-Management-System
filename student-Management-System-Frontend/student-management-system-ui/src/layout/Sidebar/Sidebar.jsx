import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css"; // You can style it as needed

function Sidebar() {
  return (
    <div className="sidebar">

      <div className="sidebar-links">
        <div className="sidebar-item">
          
          <Link to="/" className="sidebar-link">
          <img src="home.png" alt="Home" className="sidebar-pic" />
          Home</Link>
        </div>

        <div className="sidebar-item">
          
          <Link to={{
            pathname:"/student",
            search:'page=1'
          }} className="sidebar-link">
          <img src="student.png" alt="Student" className="sidebar-pic" />
          Student</Link>
        </div>

        <div className="sidebar-item">
          
          <Link to={{
            pathname:'/admin',
            search:'page=1'
          }} className="sidebar-link">
          <img src="administrator.png" alt="Admin" className="sidebar-pic" />
          Admin</Link>
        </div>

        <div className="sidebar-item">
          
          <Link to={{
            pathname:"/branch",
            search:'page=1'
            }} className="sidebar-link">
          <img src="branch.png" alt="Branch" className="sidebar-pic" />
          Branch</Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
