import './App.css';
import Sidebar from './layout/Sidebar/Sidebar';
import Navbar from './layout/Navbar/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home/Home';
import ErrorPage from './layout/ErrorPage';
import Student from './pages/student/Student';
import Admin from './pages/admin/Admin';
import Branch from './pages/branch/Branch';
import Profile from './pages/profile/Profile';
import Login from './pages/login/Login';
import { useState } from 'react';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  

  // Function passed to Login component
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <>
      {!isLoggedIn ? (
        <Login onLoginSuccess={handleLoginSuccess} isLoggedIn={isLoggedIn} />
      ) : (
        <div className="app-container">
          <Navbar className='navbar' />

          <div className="main-content">
            <Sidebar className='sidebar' />

            <div className="page-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" element={<ErrorPage />} />

                <Route path="/profile" element={<Profile />}></Route>

                <Route path="/home" element={<Home />}></Route>

                <Route path="/student" element={<Student />}></Route>

                <Route path='/admin' element={<Admin></Admin>}></Route>

                <Route path="/branch" element={<Branch />}>
                </Route>
              </Routes>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;




