import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios";
import BranchView from "../../components/BranchView";
import AddBranch from "../../components/AddBranch";
import BranchEdit from "../../components/BranchEdit";
export default function Branch() {
    const token = localStorage.getItem('authToken')
    let role = localStorage.getItem('userRole');
    role = role.substring(5);

    const [branches, setBranches] = useState([]);
    const [search, setSearch] = useState('');

    const [selectedBranch, setSelectedBranch] = useState({});
    const [showBranchViewModal, setShowBranchViewModal] = useState(false);;
    const [showBranchAddModal,setShowBranchAddModal] = useState(false);
    const [showBranchEditModal,setShowBranchEditModal] = useState(false);

    const [totalBranchesCount, setTotalBranchesCount] = useState(0);
    const [activeBranchesCount, setActiveBranchesCount] = useState(0);
    const [inActiveBranchesCount, setInactiveBranchesCount] = useState(0);
    
    const [successMessage, setSuccessMessage] = useState('')

    const handleView=(branch)=> {
        setSelectedBranch(branch);
        setShowBranchViewModal(true);
    }

    const handleEdit = (branch)=> {
        setSelectedBranch(branch);
        console.log(selectedBranch)
        setShowBranchEditModal(true);
    }

    const handleDelete = (id) => {
      deleteBranch(id);
    }

    const handleRefresh = () => {
      getBranches();
      getTotalBranchesCount();
      getActiveBranchesCount();
      getInactiveBranchesCount();
    }

    useEffect(()=> {
        getBranches();
        getTotalBranchesCount();
        getActiveBranchesCount();
        getInactiveBranchesCount();
    },[])

    const branchApi = axios.create({
        baseURL:"http://localhost:8081/api/branch",
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    async function getBranches() {
        try {
            const response = await branchApi.get('/getBranch');
            setBranches(response.data);
            console.log(response.data);

        } catch(error) {
            console.error('Error fetching branches list: ',error)
        }
    }

    async function searchBranch() {
        if (!search) return getBranches();
        try {
            const response = await branchApi.get(`/search/${search}`)
            setBranches(response.data);
            console.log(response.data);
        } catch(error) {
            console.error("Error in searching branch: ", error)
        }
    }

    async function deleteBranch(id) {
      try {
        const response = await branchApi.delete(`deleteBranch/${id}`);
        console.log('Branch deleted successfully: ', response.data)
        setSuccessMessage('✅ Branch deleted successfully!');
        setTimeout(() => {
          setSuccessMessage('');
        }, 1200)
        handleRefresh();
      } catch(error) {
        console.log('Error while deleting branch:',error);
      }
    }

    async function getactiveBranches() {
        try {
            const response = await branchApi.get(`/activeBranches`)
            setBranches(response.data);
            console.log(response.data);
        } catch(error) {
            console.error("Error while fetching active branches: ", error)
        }
    }

    async function getinActiveBranches() {
        try {
            const response = await branchApi.get(`/inActiveBranches`)
            setBranches(response.data);
            console.log(response.data);
        } catch(error) {
            console.error("Error while fetching active branches: ", error)
        }
    }

    async function getTotalBranchesCount() {
    try {
      const response = await axios.get("http://localhost:8081/api/branch/branchCount",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTotalBranchesCount(response.data);
      console.log('Total branches: ',response.data)
    } catch (error) {
      console.error("Error fetching total branches:", error);
    }
  }

  async function getActiveBranchesCount() {
    try {
      const response = await axios.get("http://localhost:8081/api/branch/activeBranchesCount",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setActiveBranchesCount(response.data);
      console.log('Active branches:  ',response.data)
    } catch (error) {
      console.error("Error fetching active branches:", error);
    }
  }

  async function getInactiveBranchesCount() {
    try {
      const response = await axios.get("http://localhost:8081/api/branch/inActiveBranchesCount",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setInactiveBranchesCount(response.data);
      console.log('Inactive branches: ',response.data)
    } catch (error) {
      console.error("Error while fetching inactive branches:", error);
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
                <h3 style={{ fontWeight: '700' }}>Branch Profiles</h3>
                <nav aria-label="breadcrumb" style={{ marginBottom: "-10px", marginTop: '-10px', fontSize: '13px', fontWeight: '600' }}>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/home" style={{ textDecoration: "none", color: 'black' }}>Home</Link>
                        </li>

                        <li className="breadcrumb-item active text-primary" aria-current="page">
                            Branch
                        </li>
                    </ol>
                </nav>
                <div className="d-flex align-items-center mb-3">
                    <input 
                        type="search" 
                        className="form-control me-2"
                        placeholder="Search Branches..."
                        style={{ maxWidth: '300px' }}
                        onChange={(e)=>setSearch(e.target.value)}
                        onKeyDown={(e)=> {
                            if (e.key==='Enter') {
                                searchBranch();
                            }
                        }}
                    />
                    <button 
                        className="btn btn-outline-success"
                        type="button"
                        style={{maxWidth:'100px', maxHeight:'40px'}}
                        onClick={searchBranch}
                        
                    >
                        Search
                    </button>

                    {role=="STUDENT"?
          (<>
          <div >
            <img src="refresh-1.png" alt="refresh" style={{width:'37px',height:'37px',marginLeft:'669px',marginRight:'20px', marginTop:'2px',cursor:'pointer'}} onClick={handleRefresh}/>
          </div>

          </>):
          (<>
          <div >
            <img src="refresh-1.png" alt="refresh" style={{width:'37px',height:'37px',marginLeft:'513px',marginRight:'20px', marginTop:'2px',cursor:'pointer'}} onClick={handleRefresh}/>
          </div>

          </>)}
                    <div className="dropdown">
                        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            All Branches
                        </button>
                        <ul className="dropdown-menu">
                            <li><button className="dropdown-item" onClick={getactiveBranches}>Active</button></li>
                            <li><button className="dropdown-item" onClick={getinActiveBranches}>Inactive</button></li>

                        </ul>

                    </div>

                    {role=='ADMIN' && (
                        <>
                        <button
                            className="btn btn-primary"
                            onClick={()=>setShowBranchAddModal(true)}
                            style={{maxWidth:'350px',maxHeight:'40px', marginLeft:'20px'}}
                        >
                            <img className="small" src="add.png" alt="add" style={{marginRight:'5px'}} />
                            Add Branch
                        </button>
                        </>
                    )}

                </div>
                

                <div className="row row-cols-1 row-cols-md-3 g-0" style={{marginLeft:'-14px',marginRight:'-10px'}}>
          <div className="col">
            <div className="card" style={cardStyle}>
              <div className="d-flex">
                <div>
                <img className="student-count" src="branch-total.png" alt="inactive" />
              </div>
              <div className="card-inner">
                <i className="student-heading">Total Branches</i>
                <h2 className="count">{totalBranchesCount}</h2>
              </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card" style={cardStyle}>
              <div className="d-flex">
                <div>
                <img className="student-count" src="branch-active.png" alt="inactive" />
              </div>
              <div className="card-inner">
                <i className="student-heading">Active Branches</i> <br />
                <h2 className="count">{activeBranchesCount}</h2>
              </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card" style={cardStyle}>
              <div className="d-flex">
                <div>
                <img className="student-count" src="branch-inactive.png" alt="inactive" />
              </div>
              <div className="card-inner">
                <i className="student-heading">Inactive Branches</i> <br />
                <h2 className="count">{inActiveBranchesCount}</h2>
              </div>
              </div>
            </div>
          </div>
        </div>

                {branches.length===0?(
                    <>
                        <div className="text-center">
                            <img src="no-data.gif" alt="no-data" style={{ height: '100px', width: '100px' }} />
                            <p>Oops! No branches found.</p>
                        </div>
                    </>

                ):(
                    <>
                        <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Branch Code</th>
                                <th>Hod Name</th>
                                <th>Contact Email</th>
                                <th>Total Semesters</th>
                                <th>Location</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(branches) && branches.map((branch) => (
                                <tr key={branch.id}>
                                    <th>{branch.id}</th>
                                    <td>{branch.name}</td>
                                    <td>{branch.code}</td>
                                    <td>{branch.hodName}</td>
                                    <td>{branch.contactEmail}</td>
                                    <td>{branch.totalSemesters}</td>
                                    <td>{branch.location}</td>
                                    {
                                        branch.status === 'ACTIVE' ? <td style={{ color: '#0f962eff' }}>{branch.status}</td> : <td style={{ color: '#6c6060ff' }}>{branch.status}</td> 
                                    }
                                    
                            
                                    <td>
                                        <img className="view" src="view.png" alt="view" onClick={()=>{handleView(branch)}}/>
                                        {role == 'ADMIN' && (
                                            <>
                                            <img className="view" src="delete.png" alt="delete" style={{ marginLeft: '8px' }} onClick={()=>{handleDelete(branch.id)}} />
                                            <img className="view" src="edit.png" alt="edit" style={{ marginLeft: '8px' }} onClick={()=>{handleEdit(branch)}}/>
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

            {showBranchViewModal && (
                <BranchView
                    branch={selectedBranch}
                    onClose={()=>setShowBranchViewModal(false)}
                >
                </BranchView>
            )}

            {showBranchAddModal && (
              <AddBranch
                getBranches={getBranches}
                onClose={()=>setShowBranchAddModal(false)}
                handleRefresh={handleRefresh}
              >

              </AddBranch>
            )}

            {showBranchEditModal && (
              <BranchEdit
                branch={selectedBranch}
                onClose={()=>setShowBranchEditModal(false)}
                getBranches={getBranches}
              >

              </BranchEdit>
            )}



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