import { useState } from "react";
import axios from "axios";
import "./Login.css";
import { useNavigate } from "react-router-dom";
const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Form validation
  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = "Invalid email format";
    }
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");

    if (!validate()) return;

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8081/auth/login", {
        email,
        password,
      });

      
      const { token } = response.data;
      const userRole = response.data.role;
      const userEmail = response.data.email;
      const userFullName = response.data.fullName;
      if (token) {
        //Storing the user information in the local storage
        localStorage.setItem("authToken", token);
        localStorage.setItem("userFullName", userFullName);
        localStorage.setItem("userEmail", userEmail);
        localStorage.setItem("userRole", userRole);
        if (onLoginSuccess) onLoginSuccess();
        navigate('/');
      } else {
        setApiError("Incorrect email or password. Try again.");
      }
    } catch (err) {
      console.error(err);
      setApiError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      {/* Left Side Image */}
      <div className="login-left">
        <img src="login_image2.png" alt="Login Visual" />
      </div>

      {/* Right Side Form */}
      <div className="login-right">
        <div className="login-container">
          <img src="/people.png" alt="people" className="people-png" />
          <h4>Student Management System</h4><br />
          <form onSubmit={handleSubmit} noValidate>
            <div className="input-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className={email ? "filled" : ""}
              />
              <label className={email ? "float" : ""}>Email</label>
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div className="input-group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className={password ? "filled" : ""}
              />
              <label className={password ? "float" : ""}>Password</label>
              {errors.password && <span className="error">{errors.password}</span>}
            </div>
            {apiError && <div className="error text-center">{apiError}</div>}
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
