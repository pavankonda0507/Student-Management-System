import { useEffect } from "react";
import { Link } from "react-router-dom";
export default function BranchView({ branch, onClose }) {

    if (!branch) return null;

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);

    }, [onClose])
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
                    style={{ borderRadius: '10px', padding: '30px', maxHeight:'50' }}
                >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Branch View</h4>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <nav aria-label="breadcrumb" style={{ marginBottom: "-10px", marginTop: '-20px', marginLeft: '16px', fontSize: '13px', fontWeight: '600' }}>
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to="/home" style={{ textDecoration: "none", color: 'black' }}>Home</Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link to="/branch" style={{ textDecoration: "none", color: 'black' }}>Branch</Link>
                                </li>
                                <li className="breadcrumb-item active text-primary" aria-current="page">
                                    Branch View
                                </li>
                            </ol>
                        </nav>

                        <div className="modal-body">
                            <form>
                                <div className="row g-3">
                                    <div className="col-md-4">
                                        <label htmlFor="inputId" className="form-label">Id</label>
                                        <input type="text" className="form-control" value={branch.id} readOnly />
                                    </div>

                                    <div className="col-md-4">
                                        <label htmlFor="inputName" className="form-label">Name</label>
                                        <input type="text" className="form-control" value={branch.name} readOnly />
                                    </div>

                                    <div className="col-md-4">
                                        <label htmlFor="inputemail" className="form-label">Branch Code</label>
                                        <input type="text" className="form-control" value={branch.code} readOnly />
                                    </div>

                                    <div className="col-md-4">
                                        <label htmlFor="inputMobile" className="form-label">Hod Name</label>
                                        <input type="text" className="form-control" value={branch.hodName} readOnly />
                                    </div>

                                    <div className="col-md-4">
                                        <label htmlFor="inputGender" className="form-label">Contact Email</label>
                                        <input type="text" className="form-control" value={branch.contactEmail} readOnly />
                                    </div>

                                    <div className="col-md-4">
                                        <label htmlFor="inputpassword" className="form-label">Total Semesters</label>
                                        <input type="number" className="form-control" value={branch.totalSemesters} readOnly />
                                    </div>

                                    <div className="col-md-4">
                                        <label htmlFor="inputrole" className="form-label">Location</label>
                                        <input type="text" className="form-control" value={branch.location} readOnly />
                                    </div>

                                    <div className="col-md-4">
                                        <label htmlFor="inputstatus" className="form-label">Status</label>
                                        {branch.status === 'ACTIVE'
                                            ? <input type="text" className="form-control" value={branch.status} readOnly style={{ color: '#0f962eff' }} />
                                            : <input type="text" className="form-control" value={branch.status} readOnly style={{ color: '#f0281eff' }} />
                                        }   
                                    </div>

                                    <div className="" style={{ marginTop: "30px", justifyContent: "center", display: "flex"}}>
                                        <button className="btn btn-secondary" onClick={onClose}>Close</button>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}