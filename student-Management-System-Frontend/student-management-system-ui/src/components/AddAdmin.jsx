
import { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from "react-router-dom";
export default function AddAdmin({ getAdmins, onClose, handleRefresh }) {
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [roleId, setRoleId] = useState(1);
    const [status, setStatus] = useState("");
    const [addressLine, setAddressLine] = useState("");
    const [city, setCity] = useState("");
    const [district, setDistrict] = useState("");
    const [state, setState] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const [errors, setErrors] = useState({});

    
    console.log(name + ' ' + mobile + ' ' + gender + ' ' + ' ' + email + ' ' + password + ' ' + ' ' + roleId + ' ' + status + ' ' + addressLine + ' ' + city + ' ' + district + ' ' + state + ' ' + postalCode + ' ' + country);
    const handleReset = () => {
        setName("");
        setMobile("");
        setGender("");
        setEmail("");
        setPassword("");
        setRoleId(1);
        setStatus("");
        setAddressLine("");
        setCity("");
        setDistrict("");
        setState("");
        setPostalCode("");
        setCountry("");
    }


    const validate = () => {
    const newErrors = {};

    if (!name)
        newErrors.name = "Name is required";
    else if (name.length < 3)
        newErrors.name = "Name should be at least 3 characters long";

    if (!mobile)
        newErrors.mobile = "Mobile number is required";
    else if (!/^[6-9]\d{9}$/.test(mobile))
        newErrors.mobile = "Enter a valid 10-digit mobile number";

    if (!gender)
        newErrors.gender = "Please select gender";

    if (!email)
        newErrors.email = "Email is required";
    else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email))
        newErrors.email = "Invalid email format";

    if (!password)
        newErrors.password = "Password is required";
    else if (password.length < 6)
        newErrors.password = "Password must be at least 6 characters long";

    if (!roleId)
        newErrors.roleId = "Role is required";

    if (!status)
        newErrors.status = "Please select status";

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;
        await addAdmin();

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

    async function addAdmin() {
        try {
            const response = await axios.post(`http://localhost:8081/api/admin/add`, {
                fullName: name,
                gender: gender,
                email: email,
                password: password,
                mobile: mobile,
                role: { id: roleId },
                status: status,
                address: {
                    addressLine: addressLine,
                    city: city,
                    district: district,
                    state: state,
                    postalCode: postalCode,
                    country: country
                }


            },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            console.log('Admin added successfully: ', response.data);
            setSuccessMessage('✅ Admin added successfully!');
            handleRefresh();
            setTimeout(() => {
                onClose();
            }, 1000)
            handleReset();
        }
        catch (error) {
            console.log('Error while adding admin: ', error)
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
                            <h4 className="modal-title">Add Admin</h4>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <nav aria-label="breadcrumb" style={{ marginBottom: "-10px", marginTop: '-20px', marginLeft: '16px', fontSize: '13px', fontWeight: '600' }}>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to="/home" style={{ textDecoration: "none", color: 'black' }}>Home</Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link to="/admin" style={{ textDecoration: "none", color: 'black' }}>Admin</Link>
                                </li>
                                <li className="breadcrumb-item active text-primary" aria-current="page">
                                    Add admin
                                </li>
                            </ol>
                        </nav>
                        <div>
                            <div className="modal-body">
                                <form>
                                    <div className="row g-3 ">
                                        <div className="col-md-6">
                                            <label htmlFor="inputname" className="form-label">Full Name</label>
                                            <input type="text" className="form-control" id="inputname" value={name} required onChange={(e) => { setName(e.target.value) }} />
                                            {errors.name && (<small className="text-danger">{errors.name}</small>)}
                                        </div>


                                        <div className="col-md-6">
                                            <label htmlFor="inputmobile" className="form-label">Mobile Number</label>
                                            <input type="text" className="form-control" id="inputmobile" value={mobile} required onChange={(e) => { setMobile(e.target.value) }} />
                                            {errors.mobile && (<small className="text-danger">{errors.mobile}</small>)}
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="inputgender" className="form-label">Gender</label>
                                            <select id="inputgender" className="form-select" value={gender} required onChange={(e) => { setGender(e.target.value) }}>
                                                <option value="" selected>Select Gender</option>
                                                <option value="Male" >Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Others">Others</option>
                                            </select>
                                            {errors.gender && (<small className="text-danger">{errors.gender}</small>)}
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="inputemail" className="form-label">Email</label>
                                            <input type="email" className="form-control" id="inputemail" value={email} required onChange={(e) => { setEmail(e.target.value) }} />
                                            {errors.email && (<small className="text-danger">{errors.email}</small>)}
                                        </div>

                                        <div className="col-md-6">
                                            <label htmlFor="inputpassword" className="form-label">Password</label>
                                            <input type="password" className="form-control" id="inputpassword" value={password} required onChange={(e) => { setPassword(e.target.value) }} />
                                            {errors.password && (<small className="text-danger">{errors.password}</small>)}
                                        </div>


                                        <div className="col-md-4">
                                            <label htmlFor="inputrole" className="form-label">Role Id</label>
                                            <select id="inputrole" className="form-select" required value={roleId} onChange={(e) => { setRoleId(e.target.value) }}>
                                                <option value="" selected>Select Role</option>
                                                <option value={1} >Admin</option>
                                            </select>
                                            {errors.roleId && (<small className="text-danger">{errors.roleId}</small>)}
                                        </div>

                                        <div className="col-md-4">
                                            <label htmlFor="inputstatus" className='form-label'>Status</label>
                                            <select id="inputstatus" className="form-select" value={status} required onChange={(e) => { setStatus(e.target.value) }}>
                                                <option value="" selected>Select Status</option>
                                                <option value="ACTIVE">Active</option>
                                                <option value="INACTIVE">Inactive</option>
                                            </select>
                                            {errors.status && (<small className="text-danger">{errors.status}</small>)}
                                        </div>
                                        <b style={{ marginTop: '30px' }}>Address Details</b>
                                        <div className="col-12">
                                            <label htmlFor="inputaddress" className="form-label">Address Line</label>
                                            <input type="text" className="form-control" id="inputaddress" value={addressLine} required onChange={(e) => { setAddressLine(e.target.value) }} />
                                            {errors.addressLine && (<small className="text-danger">{errors.addressLine}</small>)}
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="inputcity" className="form-label">City</label>
                                            <input type="text" className="form-control" id="inputcity" value={city} required onChange={(e) => { setCity(e.target.value) }} />
                                            {errors.city && (<small className="text-danger">{errors.city}</small>)}
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="inputdistrict" className="form-label">District</label>
                                            <input type="text" className="form-control" id="inputdistrict" value={district} required onChange={(e) => { setDistrict(e.target.value) }} />
                                            {errors.district && (<small className="text-danger">{errors.district}</small>)}
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="inputstate" className="form-label">State</label>
                                            <input type="text" className="form-control" id="inputstate" value={state} required onChange={(e) => { setState(e.target.value) }} />
                                            {errors.state && (<small className="text-danger">{errors.state}</small>)}
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="inputzip" className="form-label">Postal Code</label>
                                            <input type="text" className="form-control" id="inputzip" value={postalCode} required onChange={(e) => { setPostalCode(e.target.value) }} />
                                            {errors.postalCode && (<small className="text-danger">{errors.postalCode}</small>)}
                                        </div>
                                        <div className="col-md-4">
                                            <label htmlFor="inputcountry" className="form-label">Country</label>
                                            <input type="text" className="form-control" id="inputcountry" value={country} required onChange={(e) => { setCountry(e.target.value) }} />
                                            {errors.country && (<small className="text-danger">{errors.country}</small>)}
                                        </div>
                                        <div className='submit'>
                                            <button className="btn btn-warning" type='button' onClick={handleReset} style={{ height: "40px", width: "130px", marginTop: "20px" }}>
                                                <img className='reset-submit' src="reset.png" alt="reset" />
                                                Reset</button>
                                            <button className="btn btn-success" type="button" style={{ height: "40px", width: "130px", marginTop: "20px" }} onClick={handleSubmit}>
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