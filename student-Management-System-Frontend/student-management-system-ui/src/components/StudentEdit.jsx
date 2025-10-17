import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from "react-router-dom";
export default function StudentEdit({ student, onClose, getStudents }) {
    const [fullName, setFullName] = useState(student.fullName);
    const [mobile, setMobile] = useState(student.mobile);
    const [gender, setGender] = useState(student.gender);
    const [dob, setDob] = useState(student.dateOfBirth);
    const [email, setEmail] = useState(student.email);
    const [password, setPassword] = useState(student.password);
    const [fatherName, setFatherName] = useState(student?.fatherName || '');
    const [motherName, setMotherName] = useState(student?.motherName || '');
    const [rollNo, setRollNo] = useState(student.rollNo);
    const [roleId, setRoleId] = useState(student.role.id);
    const [branchId, setBranchId] = useState(student.branch.id);
    const [status, setStatus] = useState(student.status);
    const [currentSemester, setCurrentSemester] = useState(student.currentSemester);
    const [percentage, setPercentage] = useState(student.percentage);
    const [addressLine, setAddressLine] = useState(student?.address?.addressLine || '');
    const [city, setCity] = useState(student?.address?.city || '');
    const [district, setDistrict] = useState(student?.address?.district || '');
    const [state, setState] = useState(student?.address?.state || '');
    const [country, setCountry] = useState(student?.address?.country || '') ;
    const [postalCode, setPostalCode] = useState(student?.address?.postalCode || '');

    const [errors, setErrors] = useState({});

    const [successMessage, setSuccessMessage] = useState("");
    const token = localStorage.getItem('authToken');
    console.log(student.id)


    const validate = () => {
        const newErrors = {};

        if (!fullName)
            newErrors.fullName = "Student name is required";
        else if (fullName.length < 3)
            newErrors.fullName = "Student name should be at least 3 characters";

        if (!mobile)
            newErrors.mobile = "Mobile number is required";
        else if (!/^[6-9]\d{9}$/.test(mobile))
            newErrors.mobile = "Enter a valid 10-digit mobile number";

        if (!gender)
            newErrors.gender = "Please select gender";

        if (!dob)
            newErrors.dob = "Date of birth is required";

        if (!email)
            newErrors.email = "Email is required";
        else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
            newErrors.email = "Invalid email format";

        if (!password)
            newErrors.password = "Password is required";
        else if (password.length < 6)
            newErrors.password = "Password must be at least 6 characters long";

        if (!fatherName)
            newErrors.fatherName = "Father name is required";
        else if (fatherName.length < 3)
            newErrors.fatherName = "Father name should be at least 3 characters";

        if (!motherName)
            newErrors.motherName = "Mother name is required";
        else if (motherName.length < 3)
            newErrors.motherName = "Mother name should be at least 3 characters";

        if (!rollNo)
            newErrors.rollNo = "Roll number is required";
        else if (rollNo.length < 2)
            newErrors.rollNo = "Roll number must have at least 2 characters";

        if (!branchId || branchId === 0)
            newErrors.branchId = "Please select a branch";

        if (!currentSemester || currentSemester === 0)
            newErrors.currentSemester = "Please select current semester";

        if (percentage === undefined || percentage === "")
            newErrors.percentage = "Percentage is required";
        else if (percentage < 0 || percentage > 100)
            newErrors.percentage = "Percentage must be between 0 and 100";

        if (!addressLine)
            newErrors.addressLine = "Address line is required";

        if (!city)
            newErrors.city = "City is required";

        if (!district)
            newErrors.district = "District is required";

        if (!state)
            newErrors.state = "State is required";

        if (!postalCode)
            newErrors.postalCode = "Postal code is required";
        else if (!/^\d{6}$/.test(postalCode))
            newErrors.postalCode = "Enter a valid 6-digit postal code";

        if (!country)
            newErrors.country = "Country is required";

        if (!status)
            newErrors.status = "Please select status";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        await updateStudent();

    }

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    const handleContentClick = (e) => e.stopPropagation();

    async function updateStudent() {
        try {
            const encodedSearch = encodeURIComponent(student.id);
            const response = await axios.put(`http://localhost:8081/api/student/updateStudent/${encodedSearch}`, {
                fullName: fullName,
                mobile: mobile,
                gender: gender,
                dateOfBirth: dob,
                email: email,
                password: password,
                fatherName: fatherName,
                motherName: motherName,
                rollNo: rollNo,
                role: { id: roleId },
                branch: { id: branchId },
                status: status,
                currentSemester: currentSemester,
                percentage: parseFloat(percentage),
                address: {
                    addressLine: addressLine,
                    city: city,
                    district: district,
                    state: state,
                    country: country,
                    postalCode: postalCode
                }
            },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            console.log("Student updated successfully: ", response.data);
            setSuccessMessage('✅ Student updated successfully!');
            setTimeout(() => {
                setSuccessMessage('');
                onClose();
            }, 1000);
            getStudents(); // Refresh the student list after update
        } catch (error) {
            console.error("Error updating student: ", error);
        }
    }
    return (
        <>
            <div
                className="modal fade show"
                style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
                onClick={onClose}
            >
                <div
                    className="modal-dialog modal-xl modal-dialog-centered"
                    onClick={handleContentClick}
                    style={{ borderRadius: '10px', padding: '30px' }}

                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Update Student</h4>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <nav aria-label="breadcrumb" style={{ marginBottom: "-10px", marginTop: '-20px', marginLeft: '16px', fontSize: '13px', fontWeight: '600' }}>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to="/home" style={{ textDecoration: "none", color: 'black' }}>Home</Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link to="/student" style={{ textDecoration: "none", color: 'black' }}>Student</Link>
                                </li>
                                <li className="breadcrumb-item active text-primary" aria-current="page">
                                    Student Update
                                </li>
                            </ol>
                        </nav>
                        <div>
                            <div className="modal-body">
                                <form>
                                    <div className="row g-3 ">
                                        <div className="col-md-6">
                                            <label htmlFor="inputname" className="form-label">Full Name</label>
                                            <input type="text" className="form-control" id="inputname" value={fullName} required onChange={(e) => { setFullName(e.target.value) }} />
                                            {errors.fullName && (<small className="text-danger">{errors.fullName}</small>)}

                                        </div>


                                        <div className="col-md-6">
                                            <label htmlFor="inputmobile" className="form-label">Mobile Number</label>
                                            <input type="text" className="form-control" id="inputmobile" value={mobile} required onChange={(e) => { setMobile(e.target.value) }} />
                                            {errors.mobile && (<small className='text-danger'>{errors.mobile}</small>)}
                                          
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="inputgender" className="form-label">Gender</label>
                                            <select id="inputgender" className="form-select" value={gender} required onChange={(e) => { setGender(e.target.value) }}>
                                                <option value="" selected>Select Gender</option>
                                                <option value="Male" >Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Others">Others</option>
                                            </select>
                                            {errors.gender && (<small className='text-danger'>{errors.gender}</small>)}
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="inputdob" className="form-label">Date of Birth</label>
                                            <input type="date" className="form-control" id="inputdob" value={dob} required onChange={(e) => { setDob(e.target.value) }} />
                                            {errors.dob && (<small className='text-danger'>{errors.dob}</small>)}
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="inputemail" className="form-label">Email</label>
                                            <input type="email" className="form-control" id="inputemail" value={email} required onChange={(e) => { setEmail(e.target.value) }} />
                                            {errors.email && (<small className='text-danger'>{errors.email}</small>)}
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="inputpassword" className="form-label">Password</label>
                                            <input type="password" className="form-control" id="inputpassword" value={password} required onChange={(e) => { setPassword(e.target.value) }} />
                                            {errors.password && (<small className='text-danger'>{errors.password}</small>)}
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="inputfather" className="form-label">Father Name</label>
                                            <input type="text" className="form-control" id="inputfather" value={fatherName} onChange={(e) => { setFatherName(e.target.value) }} />
                                            {errors.fatherName && (<small className='text-danger'>{errors.fatherName}</small>)}
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="inputmother" className="form-label">Mother Name</label>
                                            <input type="text" className="form-control" id="inputmother" value={motherName} onChange={(e) => { setMotherName(e.target.value) }} />
                                            {errors.motherName && (<small className='text-danger'>{errors.motherName}</small>)}
                                        </div>

                                        <div className="col-md-4">
                                            <label htmlFor="inputroll" className="form-label">Roll No</label>
                                            <input type="text" className="form-control" id="inputroll" value={rollNo} required onChange={(e) => { setRollNo(e.target.value) }} />
                                            {errors.rollNo && (<small className='text-danger'>{errors.rollNo}</small>)}
                                        </div>

                                        <div className="col-md-4">
                                            <label htmlFor="inputrole" className="form-label">Role Id</label>
                                            <select id="inputrole" className="form-select" required value={roleId} onChange={(e) => { setRoleId(e.target.value) }}>
                                                <option value="" selected>Select Role</option>
                                                <option value={2} >Student</option>
                                            </select>
                                            {errors.roleId && (<small className='text-danger'>{errors.roleId}</small>)}
                                        </div>

                                        <div className="col-md-4">
                                            <label htmlFor="inputbranch" className="form-label">Branch Id</label>
                                            <select id="inputbranch" className="form-select" value={branchId} required onChange={(e) => { setBranchId(e.target.value) }} >
                                                <option value="" selected>Select Branch</option>
                                                <option value={1}>ECE</option>
                                                <option value={2}>CSE</option>
                                                <option value={3}>EEE</option>
                                                <option value={4}>CE</option>
                                                <option value={5}>ME</option>
                                                <option value={6}>AE</option>
                                                <option value={7}>BT</option>
                                                <option value={8}>IT</option>
                                                <option value={9}>BME</option>
                                                <option value={10}>CHE</option>
                                            </select>
                                            {errors.branchId && (<small className='text-danger'>{errors.branchId}</small>)}
                                        </div>

                                        <div className="col-md-4">
                                            <label htmlFor="inputsemester" className="form-label">Current Semester</label>
                                            <select id="inputsemester" className="form-select" value={currentSemester} required onChange={(e) => { setCurrentSemester(e.target.value) }}>
                                                <option value="" selected>Select Semester</option>
                                                <option value={1} >1</option>
                                                <option value={2} >2</option>
                                                <option value={3} >3</option>
                                                <option value={4} >4</option>
                                                <option value={5} >5</option>
                                                <option value={6} >6</option>
                                                <option value={7} >7</option>
                                                <option value={8} >8</option>
                                            </select>
                                            {errors.currentSemester && (<small className='text-danger'>{errors.currentSemester}</small>)}
                                        </div>

                                        <div className="col-md-4">
                                            <label htmlFor="inputpercentage" className="form-label">Percentage</label>
                                            <input type="number" className="form-control" id='inputpercentage' value={percentage} required onChange={(e)=>{ setPercentage(e.target.value)
                                                console.log(e.target.value)
                                             }}/>
                                             {errors.percentage && (<small className='text-danger'>{errors.percentage}</small>)}
                                        </div>

                                        <div className="col-md-4">
                                            <label htmlFor="inputstatus" className='form-label'>Status</label>
                                            <select id="inputstatus" className="form-select" value={status} required onChange={(e) => { setStatus(e.target.value) }}>
                                                <option value="" selected>Select Status</option>
                                                <option value="ACTIVE">Active</option>
                                                <option value="INACTIVE">Inactive</option>
                                            </select>
                                            {errors.status && (<small className='text-danger'>{errors.status}</small>)}
                                        </div>
                                        <b style={{ marginTop: '30px' }}>Address Details</b>
                                        <div className="col-12">
                                            <label htmlFor="inputaddress" className="form-label">Address Line</label>
                                            <input type="text" className="form-control" id="inputaddress" value={addressLine} required onChange={(e) => { setAddressLine(e.target.value) }} />
                                            {errors.addressLine && (<small className='text-danger'>{errors.addressLine}</small>)}
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="inputcity" className="form-label">City</label>
                                            <input type="text" className="form-control" id="inputcity" value={city} required onChange={(e) => { setCity(e.target.value) }} />
                                            {errors.city && (<small className='text-danger'>{errors.city}</small>)}
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="inputdistrict" className="form-label">District</label>
                                            <input type="text" className="form-control" id="inputdistrict" value={district} required onChange={(e) => { setDistrict(e.target.value) }} />
                                            {errors.district && (<small className='text-danger'>{errors.district}</small>)}
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="inputstate" className="form-label">State</label>
                                            <input type="text" className="form-control" id="inputstate" value={state} required onChange={(e) => { setState(e.target.value) }} />
                                            {errors.state && (<small className='text-danger'>{errors.state}</small>)}
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="inputzip" className="form-label">Postal Code</label>
                                            <input type="text" className="form-control" id="inputzip" value={postalCode} required onChange={(e) => { setPostalCode(e.target.value) }} />
                                            {errors.postalCode && (<small className='text-danger'>{errors.postalCode}</small>)}
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="inputcountry" className="form-label">Country</label>
                                            <input type="text" className="form-control" id="inputcountry" value={country} required onChange={(e) => { setCountry(e.target.value) }} />
                                            {errors.country && (<small className='text-danger'>{errors.country}</small>)}
                                        </div>
                                        <div className='submit'>
                                            <button className="btn btn-danger" type='button' onClick={onClose} style={{ height: "40px", width: "130px", marginTop: "20px" }}>
                                                <img className='reset-submit' src="cancel.png" alt="cancel" />
                                                Cancel</button>
                    
                                            <button className="btn btn-success" type="button" style={{ height: "40px", width: "130px", marginTop: "20px" }} onClick={handleSubmit} >
                                                <img className='reset-submit' src="update.png" alt="update"
                                                    />
                                                 Update</button>
                                        </div>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>




                </div>

            </div>
            {successMessage && (
                <div
                    className="alert alert-success text-center"
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