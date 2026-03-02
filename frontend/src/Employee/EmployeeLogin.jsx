import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await axios.post("http://localhost:5000/employee/login", data);
      Cookies.set("Employeetoken", response.data.token, { expires: 1 });
      
      setMessage({ type: "success", text: "✅ Login Successful!" });

      setTimeout(() => {
        navigate("/employee/dashboard"); 
      }, 1000);
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Invalid Email or Password";
      setMessage({ type: "danger", text: errorMsg });
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    borderRadius: "10px",
    padding: "12px",
    border: "1px solid #dee2e6",
    fontSize: "0.95rem"
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center" 
         style={{ background: "linear-gradient(135deg, #f0f2f5 0%, #c9d6ff 100%)", padding: "20px" }}>
      
      <div className="card border-0 shadow-lg" style={{ width: "100%", maxWidth: "420px", borderRadius: "25px", overflow: "hidden" }}>
        
        {/* Navy Header Section */}
        <div className="p-4 text-center" style={{ backgroundColor: "#002366", color: "#FFD700" }}>
          <div className="mb-2 d-inline-block shadow-sm" style={{ backgroundColor: "#FFD700", color: "#002366", padding: "5px 15px", borderRadius: "8px", fontWeight: "bold", fontSize: "1.3rem" }}>
            CP
          </div>
          <h4 className="fw-bold mb-1" style={{ letterSpacing: "1px" }}>Employee LOGIN</h4>
          <p className="mb-0 small" style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem" }}>Secure Access to Portal</p>
        </div>

        <div className="card-body p-4 p-md-5 bg-white">
          <form onSubmit={handleSubmit(onSubmit)}>
            
            <div className="mb-3">
              <label className="form-label small fw-bold text-uppercase" style={{ color: "#002366" }}>Email Address</label>
              <input
                type="email"
                style={inputStyle}
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="name@company.com"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
            </div>

            <div className="mb-4">
              <label className="form-label small fw-bold text-uppercase" style={{ color: "#002366" }}>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  style={{ ...inputStyle, paddingRight: "45px" }}
                  className={`form-control ${errors.password ? "is-invalid" : ""}`}
                  placeholder="••••••••"
                  {...register("password", { required: "Password is required" })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#6c757d" }}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {message.text && (
              <div className={`alert alert-${message.type} py-2 text-center small mb-4`} style={{ borderRadius: "10px" }}>
                {message.text}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-lg w-100 shadow-sm"
              disabled={loading}
              style={{ backgroundColor: "#002366", color: "#FFD700", fontWeight: "bold", borderRadius: "12px", padding: "12px" }}
            >
              {loading ? <span className="spinner-border spinner-border-sm me-2"></span> : "SIGN IN"}
            </button>
          </form>
        </div>

        {/* Updated Footer with Home Link */}
        <div className="card-footer border-0 py-3 text-center" style={{ backgroundColor: "#f8f9fa" }}>
          <Link to="/" className="text-decoration-none d-flex align-items-center justify-content-center" style={{ color: "#002366", fontSize: "0.9rem", fontWeight: "600" }}>
            <span style={{ marginRight: "8px" }}>🏠</span>
            <span>BACK TO HOME</span>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Login;