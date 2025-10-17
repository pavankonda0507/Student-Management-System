import { Link, useSearchParams } from "react-router-dom";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import ProfileEditStudent from "../../components/ProfileEditStudent";
import ProfileEditAdmin from "../../components/ProfileEditAdmin";
import axios from "axios";

function Navbar() {
    const navigate = useNavigate();
    const email = localStorage.getItem("userEmail");
    const token = localStorage.getItem("authToken");



    const [student, setStudent] = useState({});
    const [admin, setAdmin] = useState({});
    const [showProfileEditModal, setShowProfileEditModal] = useState(false);

    function capitalizeFirstLetter(str) {
        if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }


    let role = localStorage.getItem("userRole");
    role = role.substring(5);
    role = capitalizeFirstLetter(role);


    const handleProfileEdit = () => {
        setShowProfileEditModal(true);
    }


    useEffect(() => {
        if (role == 'Student')
            getStudentByEmail();
        else if (role == 'Admin')
            getAdminByEmail();
    }, [])

    const logout = () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (confirmLogout) {
            localStorage.clear();
            window.location.href = "/login";
        }
    };

    async function getStudentByEmail() {
        try {
            const response = await axios.get(`http://localhost:8081/api/student/getStudentByEmail/${email}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log(email);
            console.log('Logged in Student: ', response.data);
            setStudent(response.data);
        } catch (error) {
            console.log('Error in getting logged in student', error);
        }

    }

    async function getAdminByEmail() {
        try {
            const response = await axios.get(`http://localhost:8081/api/admin/getAdminByEmail/${email}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log(email);
            console.log('Logged in Admin: ', response.data);
            setAdmin(response.data);
        } catch (error) {
            console.log('Error in getting logged in admin', error);
        }

    }




    return (
        <>
            <div className="navbar">

                <div className="navbar-logo-heading">
                    <Link to="/" className="sidebar-logo-heading">
                        <img className="logo" src="management.png" alt="Logo" />
                        <span className="navbar-heading-text">Student Management System</span>
                    </Link>
                </div>

                {/* <div className="navbar-links">
                <div className="navbar-item" style={{ textAlign: "center", cursor:'pointer' }} onClick={logout}>
                    <img src="profile-user.png" alt="Profile" className="navbar-pic" />
                    Logged in as <br />
                    {role}
                </div>
            </div> */}

                <div className="dropdown text-center">
                    <div
                        className="navbar-item dropdown-toggle"
                        id="profileDropdown"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{ cursor: "pointer" }}
                    >
                        <img src="profile-user.png" alt="Profile" className="navbar-pic" />
                        Logged in as <br />
                        {role}
                    </div>

                    <ul className="dropdown-menu" aria-labelledby="profileDropdown">
                        <li><button className="dropdown-item" onClick={handleProfileEdit}>
                            <img src="user-edit.png" alt="logout" style={{ width: '20px', height: '20px', marginRight: '3px' }} />
                            Edit Profile</button></li>
                        <li><button className="dropdown-item text-danger" onClick={logout}>
                            <img src="logout.png" alt="logout" style={{ width: '20px', height: '20px', marginRight: '3px' }} />
                            Logout</button></li>
                    </ul>
                </div>






            </div>

            {showProfileEditModal && (
                <>
                    {role == 'Student' && (
                        <>
                            <ProfileEditStudent
                                student={student}
                                onClose={() => setShowProfileEditModal(false)}
                                getStudentByEmail = {getStudentByEmail}
                            >
                            </ProfileEditStudent>
                        </>
                    )}

                    {role == 'Admin' && (
                        <>
                            <ProfileEditAdmin
                                admin={admin}
                                onClose={() => setShowProfileEditModal(false)}
                                getAdminByEmail = {getAdminByEmail}
                            >
                            </ProfileEditAdmin>
                        </>
                    )}
                </>
            )}

        </>
    );
}

export default Navbar;
