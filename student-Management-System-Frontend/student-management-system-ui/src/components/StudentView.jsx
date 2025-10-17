import React from "react";
import { useEffect } from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from "react-router-dom";


export default function StudentView({ student, onClose }) {
  if (!student) return null;

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleContentClick = (e) => e.stopPropagation();

  return (
    <>
      <div
        className="modal fade show"
        style={{ display: "block", backgroundColor: "rgba(31, 30, 30, 0.5)" }}
        onClick={onClose}
      >
        <div
          className="modal-dialog modal-xl modal-dialog-centered"
          onClick={handleContentClick}
          style={{ borderRadius: '10px', padding: '30px'}}
        >
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Student View</h4>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <nav aria-label="breadcrumb" style={{ marginBottom: "-10px", marginTop: '-20px', marginLeft:'16px', fontSize: '13px', fontWeight: '600' }}>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/home" style={{ textDecoration: "none", color: 'black' }}>Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/student" style={{ textDecoration: "none", color: 'black' }}>Student</Link>
                </li>
                <li className="breadcrumb-item active text-primary" aria-current="page">
                  Student View
                </li>
              </ol>
            </nav>

            <div className="modal-body">
              <form>
                <div className="row g-3">
                  <div className="col-md-4">
                    <label htmlFor="inputId" className="form-label">Id</label>
                    <input type="text" className="form-control" value={student.id} readOnly />
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="inputName" className="form-label">Full Name</label>
                    <input type="text" className="form-control" value={student.fullName} readOnly />
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="inputRoll" className="form-label">Roll No</label>
                    <input type="text" className="form-control" value={student.rollNo} readOnly />
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="inputMobile" className="form-label">Mobile</label>
                    <input type="text" className="form-control" value={student.mobile} readOnly />
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="inputGender" className="form-label">Gender</label>
                    <input type="text" className="form-control" value={student.gender} readOnly />
                  </div>

                  <div className="col-md-4" >
                    <label htmlFor="inputdob" className="form-label">Date of Birth</label>
                    <input type="text" className="form-control" value={student.dateOfBirth} readOnly />
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="inputfather" className="form-label">Father Name</label>
                    <input type="text" className="form-control" value={student.fatherName} readOnly />
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="inputmother" className="form-label">Mother Name</label>
                    <input type="text" className="form-control" value={student.motherName} readOnly />
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="inputemail" className="form-label">Email</label>
                    <input type="text" className="form-control" value={student.email} readOnly />
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="inputpassword" className="form-label">Password</label>
                    <input type="password" className="form-control" value={student.password} readOnly />
                  </div>

                  <div className="col-md-2">
                    <label htmlFor="inputbranch" className="form-label">Branch</label>
                    <input type="text" className="form-control" value={student.branch.code} readOnly />
                  </div>

                  <div className="col-md-2">
                    <label htmlFor="inputsemester" className="form-label">Current Semester</label>
                    <input type="text" className="form-control" value={student.currentSemester} readOnly />
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="inputrole" className="form-label">Role</label>
                    <input type="text" className="form-control" value={student.role.roleName} readOnly />
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="inputrole" className="form-label">Percentage</label>
                    <input type="text" className="form-control" value={student.percentage} readOnly />
                  </div>

                  <div className="col-md-2">
                    <label htmlFor="inputrole" className="form-label">Created Date</label>
                    <input type="text" className="form-control" value={student.createdDate} readOnly />
                  </div>

                  <div className="col-md-2">
                    <label htmlFor="inputrole" className="form-label">Updated Date</label>
                    <input type="text" className="form-control" value={student.updatedDate} readOnly />
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="inputstatus" className="form-label">Status</label>
                    {student.status === 'ACTIVE'
                      ? <input type="text" className="form-control" value={student.status} readOnly style={{ color: '#0f962eff'}} />
                      : <input type="text" className="form-control" value={student.status} readOnly style={{ color: '#f0281eff'}} />
          }
                    
                    {/*  <input type="text" className="form-control" value={student.status} readOnly /> */}
                  </div>


                  <b style={{ marginTop: "30px" }}>Address Details</b>
                  <hr />

                  <div className="col-md-6">
                    <label htmlFor="inputaddline" className="form-label">Address Line</label>
                    <input type="text" className="form-control" value={student.address?.addressLine || ' '} readOnly />
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="inputcity" className="form-label">City</label>
                    <input type="text" className="form-control" value={student.address?.city || ' '} readOnly />
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="inputdist" className="form-label">District</label>
                    <input type="text" className="form-control" value={student.address?.district || ' '} readOnly />
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="inputstate" className="form-label">State</label>
                    <input type="text" className="form-control" value={student.address?.state || ' '} readOnly />
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="inputzip" className="form-label">Postal Code</label>
                    <input type="text" className="form-control" value={student.address?.postalCode || ' '} readOnly />
                  </div>

                  <div className="col-md-4">
                    <label htmlFor="inputcountry" className="form-label">Country</label>
                    <input type="text" className="form-control" value={student.address?.country || ' '} readOnly />
                  </div>

                  <div className="" style={{ marginTop: "30px", justifyContent: "center", display: "flex" }}>
                    <button className="btn btn-secondary" onClick={onClose}>Close</button>
                  </div>
                  
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>

  );
}
