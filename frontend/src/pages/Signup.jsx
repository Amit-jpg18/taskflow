import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { managerSignup } from "../api/action/managerSignupActions";
import { clearManagerSignupState } from "../api/reducer/ managerSignupReducer";
import "bootstrap/dist/css/bootstrap.min.css";

function Signup() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const { loading, message, error } = useSelector(
    (state) => state.managerSignup
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const onSubmit = (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key === "profilePicture") {
        if (data[key][0]) formData.append(key, data[key][0]);
      } else {
        formData.append(key, data[key]);
      }
    });

    dispatch(managerSignup(formData));
  };

  // Reset after success
  useEffect(() => {
    if (message) {
      reset();
      setPreview(null);
      setTimeout(() => {
        dispatch(clearManagerSignupState());
      }, 3000);
    }
  }, [message, dispatch, reset]);


  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
        {/* Navy Header Section */}
        <div style={styles.header}>
          <div style={styles.logoBadge}>CP</div>
          <h4 className="fw-bold mb-1" style={{ letterSpacing: "1px" }}>CREATE ACCOUNT</h4>
          <p className="mb-0 small" style={{ color: "rgba(255,255,255,0.7)" }}>Join the Management Portal</p>
        </div>

        <div style={{ padding: "25px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Profile Image */}
            <div className="text-center mb-4">
              <label style={styles.avatarLabel}>
                {preview ? (
                  <img src={preview} alt="preview" style={styles.avatarPreview} />
                ) : (
                  <div style={styles.avatarPlaceholder}>
                    <span style={{ fontSize: "24px" }}>+</span>
                    <small>PHOTO</small>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  {...register("profilePicture")}
                  onChange={(e) => {
                    register("profilePicture").onChange(e);
                    handleImageChange(e);
                  }}
                />
              </label>
            </div>

            <div className="row">
              <div className="col-6 mb-3">
                <label className="form-label small fw-bold text-uppercase" style={{color: "#002366"}}>Full Name</label>
                <input className="form-control" style={styles.input} placeholder="John Doe" {...register("name", { required: "Required" })} />
                {errors.name && <small className="text-danger">{errors.name.message}</small>}
              </div>
              <div className="col-6 mb-3">
                <label className="form-label small fw-bold text-uppercase" style={{color: "#002366"}}>Team Name</label>
                <input className="form-control" style={styles.input} placeholder="Alpha Squad" {...register("teamName", { required: "Required" })} />
                {errors.teamName && <small className="text-danger">{errors.teamName.message}</small>}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold text-uppercase" style={{color: "#002366"}}>Email Address</label>
              <input className="form-control" style={styles.input} placeholder="manager@company.com" {...register("email", { required: "Email is required" })} />
              {errors.email && <small className="text-danger">{errors.email.message}</small>}
            </div>

            <div className="mb-3">
              <label className="form-label small fw-bold text-uppercase" style={{color: "#002366"}}>Phone Number</label>
              <input className="form-control" style={styles.input} placeholder="+91 0000000000" {...register("phoneNumber", { required: "Phone is required" })} />
              {errors.phoneNumber && <small className="text-danger">{errors.phoneNumber.message}</small>}
            </div>

            <div className="mb-4">
              <label className="form-label small fw-bold text-uppercase" style={{color: "#002366"}}>Password</label>
              <div className="position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  style={{...styles.input, paddingRight: "40px"}}
                  placeholder="••••••••"
                  {...register("password", { required: "Password is required", minLength: {value: 6, message: "Min 6 chars"} })}
                />
                <span onClick={() => setShowPassword(!showPassword)} style={styles.passwordToggle}>
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>
              {errors.password && <small className="text-danger">{errors.password.message}</small>}
            </div>

            {message && (
              <div className={`alert ${error ? "alert-danger" : "alert-success"} py-2 text-center small mb-3`}>
                {message}
              </div>
            )}

            <button disabled={loading} className="btn w-100 shadow" style={styles.submitBtn}>
              {loading ? "Creating Account..." : "COMPLETE SIGNUP"}
            </button>
          </form>
        </div>

        {/* Home Footer inside Card */}
        <div style={styles.footer}>
          <Link to="/" style={styles.homeLink}>
            🏠 <span>BACK TO HOME</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #f0f2f5 0%, #c9d6ff 100%)",
    padding: "20px"
  },
  card: {
    maxWidth: "480px",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: "25px",
    overflow: "hidden",
    boxShadow: "0 15px 35px rgba(0,0,0,0.1)",
  },
  header: {
    backgroundColor: "#002366",
    color: "#FFD700",
    padding: "30px",
    textAlign: "center"
  },
  logoBadge: {
    backgroundColor: "#FFD700",
    color: "#002366",
    display: "inline-block",
    padding: "5px 15px",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "1.4rem",
    marginBottom: "10px"
  },
  avatarLabel: {
    cursor: "pointer",
    display: "inline-block"
  },
  avatarPreview: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid #FFD700",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
  },
  avatarPlaceholder: {
    width: "90px",
    height: "90px",
    borderRadius: "50%",
    backgroundColor: "#f8f9fa",
    border: "2px dashed #002366",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "#002366",
    opacity: 0.7
  },
  input: {
    padding: "10px 15px",
    borderRadius: "10px",
    border: "1px solid #dee2e6",
    fontSize: "14px"
  },
  passwordToggle: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    zIndex: 10
  },
  submitBtn: {
    backgroundColor: "#002366",
    color: "#FFD700",
    padding: "12px",
    borderRadius: "12px",
    fontWeight: "bold",
    fontSize: "15px",
    border: "none"
  },
  footer: {
    backgroundColor: "#f8f9fa",
    padding: "15px",
    textAlign: "center",
    borderTop: "1px solid #eee"
  },
  homeLink: {
    textDecoration: "none",
    color: "#002366",
    fontWeight: "600",
    fontSize: "0.9rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px"
  }
};

export default Signup;