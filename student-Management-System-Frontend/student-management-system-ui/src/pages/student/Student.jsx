import { useEffect, useState } from "react";
import axios from "axios";
import "./Student.css";
import { Navigate } from "react-router-dom";
import StudentView from "../../components/StudentView";
import { Link } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AddStudent from "../../components/AddStudent";
import StudentEdit from "../../components/StudentEdit";

function Student() {
  const token = localStorage.getItem("authToken");
  const email = localStorage.getItem("userEmail");
  let role = localStorage.getItem("userRole");
  role = role.substring(5); // Remove "ROLE_" prefix
  const fullName = localStorage.getItem("userFullName");

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  const [totalStudents, setTotalStudents] = useState(0);
  const [activeStudents, setActiveStudents] = useState(0);
  const [inactiveStudents, setInactiveStudents] = useState(0);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showEditStudentModal, setShowEditStudentModal] = useState(false);

  const [successMessage, setSuccessMessage] = useState("");

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" />;
  }


  const handleView = (student) => {
    setSelectedStudent(student);
    setShowModal(true);

  }

  const handleAdd = () => {
    setShowAddStudentModal(true);
    handleRefresh();
  }

  const handleEdit = (student) => {
    setSelectedStudent(student);
    setShowEditStudentModal(true);
  }

  const handleDelete =(id) => {
    deleteStudent(id);
  }

  const handleRefresh = () => {
    getStudents();
    getTotalStudentsCount();
    getActiveStudentsCount();
    getInactiveStudentsCount();

  }
  
  useEffect(() => {
    getStudents();
    getTotalStudentsCount();
    getActiveStudentsCount();
    getInactiveStudentsCount();
  }, []);


  // Get all students
  async function getStudents() {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/student/getStudents",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStudents(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  }

  async function getTotalStudentsCount() {
    try {
      const response = await axios.get("http://localhost:8081/api/student/studentCount",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTotalStudents(response.data);
      console.log('Total Students: ',response.data)
    } catch (error) {
      console.error("Error fetching total students:", error);
    }
  }

  async function getActiveStudentsCount() {
    try {
      const response = await axios.get("http://localhost:8081/api/student/activeStudentsCount",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setActiveStudents(response.data);
      console.log('Active students: ',response.data)
    } catch (error) {
      console.error("Error fetching active students:", error);
    }
  }

  async function getInactiveStudentsCount() {
    try {
      const response = await axios.get("http://localhost:8081/api/student/inActiveStudentsCount",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setInactiveStudents(response.data);
      console.log('Inactive students: ',response.data)
    } catch (error) {
      console.error("Error fetching inactive students:", error);
    }
  }

  async function deleteStudent(id) {
    try {
      const response = await axios.delete(`http://localhost:8081/api/student/deleteStudent/${id}`,{
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Student deleted:", response.data);
      setSuccessMessage('✅ Student deleted successfully!');
      setTimeout(() => {
        setSuccessMessage('');
        
      }, 2000);
      handleRefresh();
    } catch (error) {
      console.error("Error in deleting student:", error);
    }
  }

  // Search students by RollNo, Name, Email, code
  async function searchStudents() {
    if (!search) return getStudents(); // if search empty, fetch all

    try {
      const encodedSearch = encodeURIComponent(search);
      const response = await axios.get(
        `http://localhost:8081/api/student/search/${encodedSearch}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setStudents(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error in searching students:", error);
    }
  }

  async function getStudentById(id) {
    try {
      const encodedSearch = encodeURIComponent(id);
      const response = await axios.get(`http://localhost:8081/api/student/getStudentById/${encodedSearch}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      console.log("Student Details by ID:", response.data);
    }
    catch (error) {
      console.log("Error in fetching student by ID:", error);
    }
  }

  async function getActiveStudents() {
    try {
      const response = await axios.get(`http://localhost:8081/api/student/activeStudents`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    setStudents(response.data);
    console.log(response.data)
    } catch(error) {
      console.error('Error while fetching Active students ', error)
    }
  }

  async function getinActiveStudents() {
    try {
      const response = await axios.get(`http://localhost:8081/api/student/inActiveStudents`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    setStudents(response.data);
    console.log(response.data)
    } catch(error) {
      console.error('Error while fetching Inactive students ', error)
    }
  }


  let cardStyle = {
    maxHeight:'100px',
    maxWidth:'400px',
  }

  let cardBodyStyle = {
    fontSize:'25px',
    fontWeight:'700',
    padding:'2px'
  }

  return (
    <>
      <div className="container">
        <h3 style={{fontWeight:'700'}}>Student Profiles</h3>
        <nav aria-label="breadcrumb" style={{ marginBottom: "-10px",marginTop:'-10px', fontSize:'13px', fontWeight:'600' }}>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/home" style={{ textDecoration: "none", color:'black' }}>Home</Link>
            </li>
            <li className="breadcrumb-item active text-primary" aria-current="page">
              Student
            </li>
          </ol>
        </nav>

        <div className="d-flex align-items-center mb-3">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search by Name,RollNo,Email or Branch"
            style={{ maxWidth: '300px' }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") searchStudents();
            }}
          />

          <button
            className="btn btn-outline-success"
            type="button"
            style={{ maxWidth: '100px', maxHeight: '40px' }}
            onClick={searchStudents}
          >
            Search
          </button>


          {role=="STUDENT"?
          (<>
          <div >
            <img src="refresh-1.png" alt="refresh" style={{width:'37px',height:'37px',marginLeft:'681px',marginRight:'20px', marginTop:'2px',cursor:'pointer'}} onClick={handleRefresh}/>
          </div>

          </>):
          (<>
          <div >
            <img src="refresh-1.png" alt="refresh" style={{width:'37px',height:'37px',marginLeft:'512px',marginRight:'20px', marginTop:'2px',cursor:'pointer'}} onClick={handleRefresh}/>
          </div>

          </>)}

          

          <div className="dropdown" style={{}}>
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              All Students
            </button>
            <ul class="dropdown-menu">
              <li><button className="dropdown-item" onClick={getActiveStudents}>Active</button></li>
              <li><button className="dropdown-item" onClick={getinActiveStudents}>Inactive</button></li>
            </ul>
          </div>
          
          {role == 'ADMIN' && (<>
            <button
              onClick={() => setShowAddStudentModal(true)}
              className="btn btn-primary"
              style={{ maxWidth: '350px', maxHeight: '40px', marginLeft: '20px' }}>
              <img className="small" src="add.png" alt="add" style={{ marginRight: '5px' }} />
              Add Student
            </button>
          </>)}

        </div>

        <div className="row row-cols-1 row-cols-md-3 g-0" style={{marginLeft:'-14px',marginRight:'-10px'}}>
          <div className="col">
            <div className="card" style={cardStyle}>
              <div className="d-flex">
                <div>
                <img className="student-count" src="total.png" alt="inactive" />
              </div>
              <div className="card-inner">
                <i className="student-heading">Total Students</i>
                <h2 className="count">{totalStudents}</h2>
              </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card" style={cardStyle}>
              <div className="d-flex">
                <div>
                <img className="student-count" src="active.png" alt="inactive" />
              </div>
              <div className="card-inner">
                <i className="student-heading">Active Students</i> <br />
                <h2 className="count">{activeStudents}</h2>
              </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card" style={cardStyle}>
              <div className="d-flex">
                <div>
                <img className="student-count" src="inactive.png" alt="inactive" />
              </div>
              <div className="card-inner">
                <i className="student-heading">Inactive Students</i> <br />
                <h2 className="count">{inactiveStudents}</h2>
              </div>
              </div>
            </div>
          </div>
        </div>

        {students.length === 0 ? (
          <>
            <div className="text-center">
              <img src="no-data.gif" alt="no-data" style={{ height: '100px', width: '100px' }} />
              <p>Oops! No students found.</p>
            </div>
          </>
        ) : (
          <>
            <table className="table table-striped table-hover">
              <thead>
                <tr className="table-header">
                  <th>Id</th>
                  <th>RollNo</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Date of Birth</th>
                  <th>Branch Code</th>
                  <th>Current Semester</th>
                  <th>Percentage</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="table-data">
                {Array.isArray(students) && students.map((student) => (
                  <tr key={student.id}>
                    <th>{student.id}</th>
                    <td>{student.rollNo}</td>
                    <td>{student.fullName}</td>
                    <td>{student.email}</td>
                    <td>{student.mobile}</td>
                    <td>{student.dateOfBirth}</td>
                    <td>{student.branch?.code || "N/A"}</td>
                    <td>{student.currentSemester}</td>
                    <td>{student.percentage}</td>
                    {
                      student.status==='ACTIVE'? <td style={{ color: '#0f962eff'}}>{student.status}</td> : <td style={{ color: '#6c6060ff'}}>{student.status}</td>  
                    }                   
                    <td>
                      <img className='view' src="view.png" alt="view" onClick={() => handleView(student)} />

                      {role == 'ADMIN' && (<>
                        <img className="view" src="delete.png" alt="delete" style={{ marginLeft: '8px' }} onClick={()=>handleDelete(student.id)}/>
                        <img className='view' src="edit.png" alt="edit" style={{ marginLeft: '8px' }} onClick={()=>{handleEdit(student)}}/>
                      </>)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>

      {showModal && (
        <StudentView
          onClose={() => setSelectedStudent(null)}
          student={selectedStudent}
      />
      )}

      
      {
        showAddStudentModal && (  
        <AddStudent
          onClose={() => setShowAddStudentModal(false)}
          getStudents={getStudents}
          handleRefresh = {handleRefresh}
        />
      )}

      {
        showEditStudentModal && (
          <StudentEdit
            student={selectedStudent}
            onClose={() => {setShowEditStudentModal(false)
                            setSelectedStudent(null);
            }}
            getStudents={getStudents} 
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
  );
}

export default Student;
