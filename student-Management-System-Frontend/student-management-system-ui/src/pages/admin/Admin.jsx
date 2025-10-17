import { useState, useEffect } from "react";
import axios from "axios";
import './Admin.css';
import AdminView from '../../components/AdminView'
import AddAdmin from "../../components/AddAdmin";
import AdminEdit from "../../components/AdminEdit";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from "react-router-dom";

export default function Admin() {
    let role = localStorage.getItem("userRole");
    role = role.substring(5); // Remove "ROLE_" prefix
   
    const token = localStorage.getItem("authToken");
    const fullName = localStorage.getItem("userFullName");

    const [admins, setAdmins] = useState([]);
    const [search, setSearch] = useState('');

    const [totalAdminsCount, setTotalAdminsCount] = useState(0);
    const [acticeAdminsCount, setActiveAdminsCount] = useState(0);
    const [inActiceAdminsCount, setInActiveAdminsCount] = useState(0);


    const [selectedAdmin, setSelectedAdmin] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showAddAdminModal, setShowAddAdminModal] = useState(false);
    const [showEditAdminModal, setShowEditStudentModal] = useState(false);

    const [successMessage, setSuccessMessage] = useState("");


    const handleView = (admin) => {
        setSelectedAdmin(admin);
        setShowViewModal(true);
    }

    const handleEdit = (admin) => {
        setSelectedAdmin(admin);
        console.log(selectedAdmin)
        setShowEditStudentModal(true);
    }

    const handleDelete = (id) => {
        deleteAdmin(id);
    }

    const handleRefresh = () => {
        getAdmins();
        getTotalAdminsCount();
        getActiveAdminsCount();
        getInActiveAdminsCount();

    }


    useEffect(() => {
        getAdmins();
        getTotalAdminsCount();
        getActiveAdminsCount();
        getInActiveAdminsCount()
    }, [])

    const adminApi = axios.create({
        baseURL: "http://localhost:8081/api/admin",
        headers: {
            Authorization: `Bearer ${token}`
        },
    });

    async function getAdmins() {
        try {
            const response = await adminApi.get('/getallAdmins');
            setAdmins(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching admins:', error);
        }
    }

    async function getActiveAdmins() {
        try {
            const response = await adminApi.get('/activeAdmins');
            setAdmins(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching active admins:', error);
        }
    }

    async function getinActiveAdmins() {
        try {
            const response = await adminApi.get('/inActiveAdmins');
            setAdmins(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching Inactive admins:', error);
        }
    }

    async function searchAdmins() {
        if (!search) return getAdmins();
        try {
            const response = await adminApi.get(`/search/${search}`);
            setAdmins(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error in searching admins:', error);
        }
    }

    async function deleteAdmin(id) {
        try {
            const response = await adminApi.delete(`/deleteAdmin/${id}`);
            console.log('Admin deleted successfully: ', response.data)
            setSuccessMessage('✅ Admin deleted successfully!');
            setTimeout(() => {
                setSuccessMessage('');
            }, 1200)
            handleRefresh();
        } catch (error) {
            console.log('Error while deleting admin: ', error);
        }

    }

    async function getTotalAdminsCount() {
        try {
            const response = await adminApi.get(`/adminCount`)
            setTotalAdminsCount(response.data);
            console.log('Total admins: ',response.data)
        } catch (error) {
            console.log('Error in getting total admins: ',response.data);
        }
    }

    async function getActiveAdminsCount() {
        try {
            const response = await adminApi.get(`/activeAdminsCount`)
            setActiveAdminsCount(response.data);
            console.log('Active admins: ',response.data)
        } catch (error) {
            console.log('Error in getting active admins: ',response.data);
        }
    }

    async function getInActiveAdminsCount() {
        try {
            const response = await adminApi.get(`/inActiveAdminsCount`)
            setInActiveAdminsCount(response.data);
            console.log('Inactive admins: ',response.data)
        } catch (error) {
            console.log('Error in getting Inactive admins: ',response.data);
        }
    }

    let cardStyle = {
        maxHeight: '100px',
        maxWidth: '400px',
    }

    let cardBodyStyle = {
        fontSize: '25px',
        fontWeight: '700',
        padding: '2px'
    }


    return (
        <>
            <div className="container">
                <h3 style={{ fontWeight: '700' }}>Admin Profiles</h3>
                <nav aria-label="breadcrumb" style={{ marginBottom: "-10px", marginTop: '-10px', fontSize: '13px', fontWeight: '600' }}>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/home" style={{ textDecoration: "none", color: 'black' }}>Home</Link>
                        </li>

                        <li className="breadcrumb-item active text-primary" aria-current="page">
                            Admin
                        </li>
                    </ol>
                </nav>
                {/* <br /> */}
                <div className="d-flex align-items-center mb-3">
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search by Name, Email or Mobile"
                        style={{ maxWidth: '300px' }}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") searchAdmins();
                        }}
                    />

                    <button
                        className="btn btn-outline-success"
                        type="button"
                        style={{ maxWidth: '100px', maxHeight: '40px' }}
                        onClick={searchAdmins}
                    >
                        Search
                    </button>

                    {role == "STUDENT" ?
                        (<>
                            <div >
                                <img src="refresh-1.png" alt="refresh" style={{ width: '37px', height: '37px', marginLeft: '681px', marginRight: '20px', marginTop: '2px', cursor: 'pointer' }} onClick={handleRefresh} />
                            </div>

                        </>) :
                        (<>
                            <div >
                                <img src="refresh-1.png" alt="refresh" style={{ width: '37px', height: '37px', marginLeft: '525px', marginRight: '20px', marginTop: '2px', cursor: 'pointer' }} onClick={handleRefresh} />
                            </div>

                        </>)}
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            All Admins
                        </button>
                        <ul className="dropdown-menu">
                            <li><button className="dropdown-item" onClick={getActiveAdmins}>Active</button></li>
                            <li><button className="dropdown-item" onClick={getinActiveAdmins}>Inactive</button></li>
                        </ul>
                    </div>


                    {role == 'ADMIN' && (<>
                        <button
                            className="btn btn-primary"
                            onClick={() => setShowAddAdminModal(true)}
                            style={{ maxWidth: '350px', maxHeight: '40px', marginLeft: '20px' }}
                        >
                            <img className="small" src="add.png" alt="add" style={{ marginRight: '5px' }} />
                            Add Admin

                        </button>
                    </>)}
                </div>

                <div className="row row-cols-1 row-cols-md-3 g-0" style={{ marginLeft: '-14px', marginRight: '-10px' }}>
                    <div className="col">
                        <div className="card" style={cardStyle}>
                            <div className="d-flex">
                                <div>
                                    <img className="student-count" src="admin-total.png" alt="inactive" />
                                </div>
                                <div className="card-inner">
                                    <i className="student-heading">Total Admins</i>
                                    <h2 className="count">{totalAdminsCount}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card" style={cardStyle}>
                            <div className="d-flex">
                                <div>
                                    <img className="student-count" src="admin-active.png" alt="inactive" />
                                </div>
                                <div className="card-inner">
                                    <i className="student-heading">Active Admins</i> <br />
                                    <h2 className="count">{acticeAdminsCount}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card" style={cardStyle}>
                            <div className="d-flex">
                                <div>
                                    <img className="student-count" src="admin-inactive.png" alt="inactive" />
                                </div>
                                <div className="card-inner">
                                    <i className="student-heading">Inactive Admins</i> <br />
                                    <h2 className="count">{inActiceAdminsCount}</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {admins.length === 0 ? (
                    <>
                        <div className="text-center">
                            <img src="no-data.gif" alt="no-data" style={{ height: '100px', width: '100px' }} />
                            <p>Oops! No admins found.</p>
                        </div>
                    </>
                ) : (
                    <>
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Mobile</th>
                                    <th>Gender</th>
                                    <th>Created Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(admins) && admins.map((admin) => (
                                    <tr key={admin.id} >
                                        <th>{admin.id}</th>
                                        <td>{admin.fullName}</td>
                                        <td>{admin.email}</td>
                                        <td>{admin.mobile}</td>
                                        <td>{admin.gender}</td>
                                        <td>{admin.createdDate}</td>
                                        {/* <td>{admin.status}</td> */}
                                        {
                                            admin.status === 'ACTIVE' ? <td style={{ color: '#0f962eff' }}>{admin.status}</td> : <td style={{ color: '#6c6060ff' }}>{admin.status}</td>
                                        }


                                        <td>
                                            <img className="view" src="view.png" alt="view" onClick={() => { handleView(admin) }} />
                                            {role == 'ADMIN' && (
                                                <>
                                                    <img className="view" src="delete.png" alt="delete" style={{ marginLeft: '8px' }} onClick={() => handleDelete(admin.id)} />
                                                    <img className="view" src="edit.png" alt="edit" style={{ marginLeft: '8px' }} onClick={() => { handleEdit(admin) }} />
                                                </>
                                            )}
                                        </td>
                                    </tr>

                                ))}
                            </tbody>
                        </table>
                    </>
                )}
            </div>

            {showViewModal && (
                <AdminView
                    admin={selectedAdmin}
                    onClose={() => setShowViewModal(false)}
                />
            )}
            {showAddAdminModal && (
                <AddAdmin
                    onClose={() => setShowAddAdminModal(false)}
                    getAdmins={getAdmins}
                    handleRefresh = {handleRefresh}
                />

            )}

            {
                showEditAdminModal && (
                    <AdminEdit
                        admin={selectedAdmin}
                        onClose={() => setShowEditStudentModal(false)}
                        getAdmins={getAdmins}
                    />
                )
            }

            {successMessage && (
                <div
                    className="alert alert-danger text-center"
                    role="alert"
                    style={{
                        position: "fixed",
                        top: "30px",
                        // bottom: "10px",
                        left: "85%",
                        transform: "translateX(-50%)",
                        zIndex: 9999, // ensures it's above the modal
                        width: "auto",
                        minWidth: "300px",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
                    }}
                >
                    {successMessage}
                </div>
            )}

        </>
    )
}