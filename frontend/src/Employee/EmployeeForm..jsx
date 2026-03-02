import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee } from "../api/action/employeeActions";
import { clearEmployeeMessage } from "../api/reducer/employeeSlice";
import { fetchDepartmentsRoles } from "../api/action/departmentActions";

const EmployeeForm = () => {
  const dispatch = useDispatch();

  const { departmentsData } = useSelector((state) => state.department);
  const { loading, success, error } = useSelector((state) => state.employee);

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const selectedDept = watch("department");

  useEffect(() => {
    dispatch(fetchDepartmentsRoles());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      reset();
      setTimeout(() => {
        dispatch(clearEmployeeMessage());
      }, 3000);
    }
  }, [success, dispatch, reset]);

  const onSubmit = (data) => {
    const payload = {
      full_name: data.name,
      email: data.email,
      phone: data.phone,
      department: data.department,
      role: data.role_name,
      password: data.password,
    };

    dispatch(addEmployee(payload));
  };
  const inputStyle = {
    borderRadius: "10px",
    fontSize: "0.95rem",
    border: "1px solid #dee2e6",
    padding: "10px 15px"
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center" 
         style={{ backgroundColor: "#f0f2f5", paddingTop: "40px", paddingBottom: "40px" }}>
      
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-md-10 col-lg-6 col-xl-5">
          <div className="card border-0 shadow-lg" style={{ borderRadius: "20px", overflow: "hidden" }}>
            
            <div className="p-4 text-center" style={{ backgroundColor: "#002366", color: "#FFD700" }}>
              <h3 className="fw-bold mb-1" style={{ letterSpacing: "1px" }}>REGISTRATION</h3>
              <p className="mb-0 small" style={{ color: "rgba(255,255,255,0.8)" }}>Create a new employee account</p>
            </div>

            <div className="card-body p-4 p-md-5">
              <form onSubmit={handleSubmit(onSubmit)}>

                {/* Full Name */}
                <div className="mb-3">
                  <label className="form-label fw-bold small text-uppercase" style={{ color: "#002366" }}>Full Name</label>
                  <input
                    {...register("name", { required: "Name is required" })}
                    type="text"
                    style={inputStyle}
                    className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                    placeholder="John Doe"
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                </div>

                {/* Email & Phone Row */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold small text-uppercase" style={{ color: "#002366" }}>Work Email</label>
                    <input
                      {...register("email", { required: "Email is required" })}
                      type="email"
                      style={inputStyle}
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      placeholder="john@company.com"
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold small text-uppercase" style={{ color: "#002366" }}>Phone Number</label>
                    <input
                      {...register("phone", { required: "Phone is required" })}
                      type="tel"
                      style={inputStyle}
                      className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                      placeholder="+91 0000000000"
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
                  </div>
                </div>

                {/* Password with Toggle */}
                <div className="mb-3">
                  <label className="form-label fw-bold small text-uppercase" style={{ color: "#002366" }}>Temporary Password</label>
                  <div style={{ position: "relative" }}>
                    <input
                      {...register("password", { required: "Password is required", minLength: 6 })}
                      type={showPassword ? "text" : "password"} // Dynamic type
                      style={{ ...inputStyle, paddingRight: "45px" }} 
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      placeholder="Min. 6 characters"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: "absolute",
                        right: "10px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "1.2rem",
                        zIndex: 10
                      }}
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                  {errors.password && <div className="invalid-feedback d-block">{errors.password.message}</div>}
                </div>

                {/* Department & Role Row */}
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold small text-uppercase" style={{ color: "#002366" }}>Department</label>
                    <select
                      {...register("department", { required: "Required" })}
                      style={inputStyle}
                      className={`form-select ${errors.department ? 'is-invalid' : ''}`}
                    >
                      <option value="">Select Dept</option>
                    {Object.keys(departmentsData).map((dept) => (
  <option key={dept} value={dept}>{dept}</option>
))}
                    </select>
                  </div>

                  <div className="col-md-6 mb-4">
                    <label className="form-label fw-bold small text-uppercase" style={{ color: "#002366" }}>Position</label>
                    <select
                      {...register("role_name", { required: "Required" })}
                      disabled={!selectedDept}
                      style={inputStyle}
                      className={`form-select ${errors.role_id ? 'is-invalid' : 'is-valid'}`}
                    >
                      <option value="">Choose Role</option>
                {selectedDept &&
  departmentsData[selectedDept]?.map((role) => (
    <option key={role.id} value={role.name}>
      {role.name}
    </option>
))}
                    </select>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="d-grid pt-2">
                  <button 
                    type="submit" 
                    disabled={loading}
                    className="btn btn-lg shadow"
                    style={{ 
                      backgroundColor: "#002366", 
                      color: "#FFD700", 
                      fontWeight: "bold",
                      borderRadius: "12px",
                      padding: "12px"
                    }}
                  >
                    {loading ? "Registering..." : "COMPLETE REGISTRATION"}
                  </button>
                </div>
              </form>
            </div>

            <div className="py-3 text-center bg-light border-top">
               <Link to="/manager/dashboard" className="text-decoration-none small fw-bold" style={{ color: "#002366" }}>
                ← Return to Dashboard
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;