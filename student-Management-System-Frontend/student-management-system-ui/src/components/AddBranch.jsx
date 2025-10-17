import axios from "axios";
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";

export default function AddBranch({getBranches, onClose, handleRefresh}) {
const [name, setName] = useState('');
const [code, setCode] = useState('');
const [totalSemesters, setTotalSemesters] = useState('');
const [hodName, setHodName] = useState('');
const [contactEmail,setContactEmail] = useState('');
const [location, setLocation] = useState(''); 
const [status,setStatus] = useState('');
const [successMessage,setSuccessMessage] = useState('');
const [errors,setErrors] = useState({});
console.log(name+' '+ code+' '+totalSemesters+' '+hodName+' '+contactEmail+' '+location+' '+location+' '+status);
const handleReset=()=> {
    setName('');
    setCode('');
    setTotalSemesters(0);
    setHodName('');
    setContactEmail('');
    setLocation('');
    setStatus('');

}

const validate = () => {
    const newErrors = {};
    if(!name) 
        newErrors.name = "Branch name required";
    else if(name.length<5)
        newErrors.name = "Branch name length should be minimum 5 characters";

    if(!code)
        newErrors.code = "Branch code required";
    else if(code.length<2)
        newErrors.code = "Branch code length should be minimum 2 characters";

    if(!totalSemesters)
        newErrors.totalSemesters = "Please select semester";

    if(!hodName)
        newErrors.hodName = "Hod name required";
    else if(hodName.length<3)
        newErrors.hodName = "Hod name length should be minimum 3 characters";

    if(!contactEmail)
        newErrors.contactEmail = "Contact email required";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(contactEmail))
        newErrors.contactEmail = "Invalid email format";

    if(!location)
        newErrors.location = "Please select location";

    if(!status)
        newErrors.status = "Please select status";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;

}

const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    await addBranch();
    
}

useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
}, [onClose]);

const handleContentClick = (e) => e.stopPropagation();

const token = localStorage.getItem("authToken");


async function addBranch() {
    try {
        const response = await axios.post('http://localhost:8081/api/branch/addBranch',
            {
                name:name,
                code: code,
                totalSemesters: totalSemesters,
                hodName: hodName,
                contactEmail: contactEmail,
                location: location,
                status: status
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        if (response.status === 200 || response.status === 201) {
                console.log("Branch added successfully:", response.data);
                setSuccessMessage("✅ Branch added successfully!");
                setTimeout(() => {
                    onClose();
                }, 2000);
                handleReset();
                handleRefresh();
                
            } else {
                alert("❌ Something went wrong. Please try again.");
            }
    }
    catch(error) {
        console.log('Error while adding branch: ',error);
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
                            <h4 className="modal-title">Add Branch</h4>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <nav aria-label="breadcrumb" style={{ marginBottom: "-10px", marginTop: '-20px', marginLeft: '16px', fontSize: '13px', fontWeight: '600' }}>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to="/home" style={{ textDecoration: "none", color: 'black' }}>Home</Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link to="/admin" style={{ textDecoration: "none", color: 'black' }}>Branch</Link>
                                </li>
                                <li className="breadcrumb-item active text-primary" aria-current="page">
                                    Add Branch
                                </li>
                            </ol>
                        </nav>
                        <div>
                            <div className="modal-body">
                                <form noValidate>
                                    <div className="row g-3 ">
                                        <div className="col-md-6">
                                            <label htmlFor="inputname" className="form-label">Name <sup style={{color:'red'}}>*</sup></label>
                                            <input type="text" className="form-control" id="inputname" value={name} onChange={(e) => { setName(e.target.value) }} />
                                            {errors.name && (<small className="text-danger">{errors.name}</small>)}
                                        </div>


                                        <div className="col-md-3">
                                            <label htmlFor="inputcode" className="form-label">Code <sup style={{color:'red'}}>*</sup></label>
                                            <input type="text" className="form-control" id="inputcode" value={code} onChange={(e) => { setCode(e.target.value) }} />
                                            {errors.code && (<small className="text-danger">{errors.code}</small>)}
                                        </div>

                                        <div className="col-md-3">
                                            <label htmlFor="inputsemester" className="form-label">Total Semesters <sup style={{color:'red'}}>*</sup></label>
                                            <select id="inputsemester" className="form-select" value={totalSemesters} onChange={(e) => { setTotalSemesters(e.target.value) }}>
                                                <option value="">Select total semesters</option>
                                                <option value={1}>1</option>
                                                <option value={2}>2</option>
                                                <option value={3}>3</option>
                                                <option value={4}>4</option>
                                                <option value={5}>5</option>
                                                <option value={6}>6</option>
                                                <option value={7}>7</option>
                                                <option value={8}>8</option>
                                            </select>
                                            {errors.totalSemesters && (<small className="text-danger">{errors.totalSemesters}</small>)}
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="inputhod" className="form-label">Hod Name <sup style={{color:'red'}}>*</sup></label>
                                            <input type="text" className="form-control" id="inputhod" value={hodName} onChange={(e) => { setHodName(e.target.value) }} />
                                            {errors.hodName && (<small className="text-danger">{errors.hodName}</small>)}
                                        </div>


                                        <div className="col-md-6">
                                            <label htmlFor="inputemail" className="form-label">Contact Email <sup style={{color:'red'}}>*</sup></label>
                                            <input type="text" className="form-control" id="inputemail" value={contactEmail} onChange={(e) => { setContactEmail(e.target.value) }} />
                                            {errors.contactEmail && (<small className="text-danger">{errors.contactEmail}</small>)}
                                        </div>

                                        


                                        <div className="col-md-4">
                                            <label htmlFor="inputlocation" className="form-label">Location <sup style={{color:'red'}}>*</sup></label>
                                            <select id="inputlocation" className="form-select" value={location} onChange={(e) => { setLocation(e.target.value) }}>
                                                <option value="">Select Location</option>
                                                <option value="Block A" >Block A</option>
                                                <option value="Block B">Block B</option>
                                                <option value="Block C">Block C</option>
                                                <option value="Block D">Block D</option>
                                                <option value="Block E">Block E</option>
                                                <option value="Block F">Block F</option>
                                                <option value="Block G">Block G</option>
                                            </select>
                                            {errors.location && (<small className="text-danger">{errors.location}</small>)}
                                        </div>

                                        <div className="col-md-4">
                                            <label htmlFor="inputstatus" className='form-label'>Status <sup style={{color:'red'}}>*</sup></label>
                                            <select id="inputstatus" className="form-select" value={status} onChange={(e) => { setStatus(e.target.value) }}>
                                                <option value="">Select Status</option>
                                                <option value="ACTIVE">Active</option>
                                                <option value="INACTIVE">Inactive</option>
                                            </select>
                                            {errors.status && (<small className="text-danger">{errors.status}</small>)}
                                        </div>
                                        
                                        <div className='submit'>
                                            <button className="btn btn-warning" type='button' onClick={handleReset} style={{ height: "40px", width: "130px", marginTop: "20px" }}>
                                                <img className='reset-submit' src="reset.png" alt="reset" />
                                                Reset</button>
                                            <button className="btn btn-success" type="botton" style={{ height: "40px", width: "130px", marginTop: "20px" }} onClick={handleSubmit}>
                                                <img className='reset-submit' src="submit.png" alt="submit" />
                                                Submit</button>
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