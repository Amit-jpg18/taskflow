import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateProfile } from "../api/action/employeeActions";
import { ToastContainer, toast } from "react-toastify";

function EmployeeUpdate() {
  const dispatch = useDispatch();
  const { profile, loading, message, error } = useSelector(
    (state) => state.employee
  );

  const { control, handleSubmit, reset, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  // 🔹 Fetch profile from Redux
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  // 🔹 Reset form when profile comes
  useEffect(() => {
    if (profile) {
      reset({
        full_name: profile.full_name,
        email: profile.email,
        phone: profile.phone,
        password: "",
      });
    }
  }, [profile, reset]);

  // 🔹 Toast handling
  useEffect(() => {
    if (message) toast.success(message);
    if (error) toast.error(error);
  }, [message, error]);

  const onSubmit = (data) => {
    const updateData = { ...data };

    if (!updateData.password?.trim()) {
      delete updateData.password;
    }

    dispatch(updateProfile(updateData));
  };

  if (loading && !profile)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border" style={{ color: "#002366" }}></div>
      </div>
    );

  return (
    <div style={styles.container}>
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div style={styles.card}>
        {/* Header - Using Manager Theme */}
        <div style={styles.header}>
          <div style={styles.logoBadge}>EP</div>
          <h4 className="fw-bold mb-1" style={{ letterSpacing: "1px" }}>UPDATE PROFILE</h4>
          <p className="mb-0 small" style={{ color: "rgba(255,255,255,0.7)" }}>Personal Information</p>
        </div>

        <div style={{ padding: "30px" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            
            {/* Full Name */}
            <div className="mb-3 text-start">
              <label className="form-label small fw-bold text-uppercase" style={{color: "#002366"}}>Full Name</label>
              <Controller
                name="full_name"
                control={control}
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <input {...field} className={`form-control ${errors.full_name ? 'is-invalid' : ''}`} style={styles.input} />
                )}
              />
              {errors.full_name && <small className="text-danger">{errors.full_name.message}</small>}
            </div>

            {/* Email Address */}
            <div className="mb-3 text-start">
              <label className="form-label small fw-bold text-uppercase" style={{color: "#002366"}}>Email Address</label>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email" },
                }}
                render={({ field }) => (
                  <input type="email" {...field} className={`form-control ${errors.email ? 'is-invalid' : ''}`} style={styles.input} />
                )}
              />
              {errors.email && <small className="text-danger">{errors.email.message}</small>}
            </div>

            {/* Phone Number */}
            <div className="mb-3 text-start">
              <label className="form-label small fw-bold text-uppercase" style={{color: "#002366"}}>Phone Number</label>
              <Controller
                name="phone"
                control={control}
                rules={{ required: "Phone is required" }}
                render={({ field }) => (
                  <input {...field} className={`form-control ${errors.phone ? 'is-invalid' : ''}`} style={styles.input} />
                )}
              />
              {errors.phone && <small className="text-danger">{errors.phone.message}</small>}
            </div>

            {/* Password with Toggle */}
            <div className="mb-4 text-start">
              <label className="form-label small fw-bold text-uppercase" style={{color: "#002366"}}>New Password</label>
              <div className="position-relative">
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      className="form-control"
                      style={{...styles.input, paddingRight: "40px"}}
                      placeholder="••••••••"
                    />
                  )}
                />
                <span onClick={() => setShowPassword(!showPassword)} style={styles.passwordToggle}>
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>
              <small className="text-muted" style={{ fontSize: "11px" }}>Leave empty to keep current password</small>
            </div>

            <button type="submit" disabled={loading} className="btn w-100 shadow mt-2" style={styles.submitBtn}>
              {loading ? (
                <span className="spinner-border spinner-border-sm me-2"></span>
              ) : "UPDATE PROFILE"}
            </button>
          </form>
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
    textAlign: "center"
  },
  header: {
    backgroundColor: "#002366", // Navy Blue
    color: "#FFD700", // Gold
    padding: "30px",
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
    border: "none",
    transition: "0.3s"
  }
};

export default EmployeeUpdate;