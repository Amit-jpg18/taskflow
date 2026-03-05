import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import "bootstrap/dist/css/bootstrap.min.css";
// Toastify Imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const response = await axios.post(" http://localhost:5000/manager/login", data);

      // Save token in cookies
      Cookies.set("token", response.data.token, { expires: 1 });

      const role = response.data.user.role;
      
      if (role === "manager" || role === "employee") {
        // ✅ Success Toast
        toast.success(`Welcome back! Redirecting to ${role} portal...`, {
          position: "top-right",
          autoClose: 1500,
        });

        // Small delay for toast visibility
        setTimeout(() => {
          navigate(role === "manager" ? "/manager/dashboard" : "/employee/dashboard");
        }, 1500);
        
      } else {
        toast.warning("⚠️ Access Denied: Role not recognized.");
      }

    } catch (err) {
      const errorMsg = err.response?.data?.message || "Invalid Email or Password";
      toast.error(errorMsg);
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
      
      {/* Toastify Container */}
      <ToastContainer theme="colored" />

      <div className="card border-0 shadow-lg" style={{ width: "100%", maxWidth: "420px", borderRadius: "25px", overflow: "hidden" }}>
        
        {/* Header - ORIGINAL THEME (Blue & Gold) */}
        <div className="p-4 text-center" style={{ backgroundColor: "#002366", color: "#FFD700" }}>
          <div className="mb-2 d-inline-block shadow-sm" style={{ backgroundColor: "#FFD700", color: "#002366", padding: "5px 15px", borderRadius: "8px", fontWeight: "bold", fontSize: "1.3rem" }}>
            CP
          </div>
          {/* Changed "MANAGER LOGIN" to "PORTAL LOGIN" */}
          <h4 className="fw-bold mb-1" style={{ letterSpacing: "1px" }}>PORTAL LOGIN</h4>
          <p className="mb-0 small" style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.85rem" }}>Secure Access for All Members</p>
        </div>

        {/* Form */}
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

            {/* Submit Button - ORIGINAL THEME */}
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

        {/* Footer */}
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