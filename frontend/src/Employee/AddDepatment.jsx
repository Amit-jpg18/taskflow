import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  fetchDepartmentsRoles,
  addDepartment,
} from "../api/action/departmentActions";
import { clearMessage } from "../api/reducer/departmentSlice";

function AddDepartment() {
  const dispatch = useDispatch();

  // ✅ Correct selector (message added, success removed)
  const { departmentsData, loading, error, message } = useSelector(
    (state) => state.department
  );

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const selectedDepartment = watch("department");

  useEffect(() => {
    dispatch(fetchDepartmentsRoles());
  }, [dispatch]);

  const onSubmit = async (data) => {
    await dispatch(
      addDepartment({
        department: data.department,
        role: data.role || undefined,
      })
    );
    reset();

    setTimeout(() => {
      dispatch(clearMessage());
    }, 3000);
  };

  const roles = selectedDepartment
    ? departmentsData?.[selectedDepartment] || []
    : [];

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center" 
         style={{ backgroundColor: "#f4f7f9", paddingTop: "50px", paddingBottom: "50px" }}>
      
      <div className="row justify-content-center w-100">
        <div className="col-md-5 col-lg-4">
          
          {/* Main Card */}
          <div className="card border-0 shadow-lg" style={{ borderRadius: "15px", overflow: "hidden" }}>
            
            {/* Stylish Header */}
            <div className="p-4 text-center" style={{ backgroundColor: "#002366", color: "#FFD700" }}>
              <div className="mb-2">
                <i className="bi bi-building-add" style={{ fontSize: "2rem" }}></i>
              </div>
              <h4 className="fw-bold mb-0" style={{ letterSpacing: "1px" }}>ADD DEPARTMENT</h4>
              <small style={{ color: "rgba(255,255,255,0.7)" }}>Manage your company structure</small>
            </div>

            <div className="card-body p-4">
              <form onSubmit={handleSubmit(onSubmit)}>

                {/* Department Field */}
                <div className="mb-4">
                  <label className="form-label small fw-bold text-uppercase" style={{ color: "#002366" }}>
                    Department Name
                  </label>
                  <input
                    className={`form-control form-control-lg ${errors.department ? 'is-invalid' : ''}`}
                    style={{ fontSize: "0.95rem", borderRadius: "10px", border: "1px solid #dee2e6" }}
                    placeholder="e.g. Engineering"
                    list="departments-list"
                    {...register("department", { required: "Department name is required" })}
                  />
                  <datalist id="departments-list">
                    {Object.keys(departmentsData).map((dep, idx) => (
                      <option key={idx} value={dep} />
                    ))}
                  </datalist>
                  {errors.department && <div className="invalid-feedback">{errors.department.message}</div>}
                </div>

                {/* Role Field */}
                <div className="mb-4">
                  <label className="form-label small fw-bold text-uppercase" style={{ color: "#002366" }}>
                    Role / Designation <span className="text-muted" style={{ fontSize: "0.7rem" }}>(Optional)</span>
                  </label>
                  <input
                    className="form-control form-control-lg"
                    style={{ fontSize: "0.95rem", borderRadius: "10px", border: "1px solid #dee2e6" }}
                    placeholder="e.g. Senior Developer"
                    list="roles-list"
                    {...register("role")}
                    disabled={!selectedDepartment}
                  />
                  <datalist id="roles-list">
                    {roles.map((role, idx) => (
                      <option key={idx} value={role.name || role} />
                    ))}
                  </datalist>
                </div>

                {/* Success/Error Message */}
                {message && (
                  <div className={`alert py-2 text-center small mb-4 ${message.includes("success") ? "alert-success border-success" : "alert-danger border-danger"}`}
                       style={{ borderRadius: "10px" }}>
                    {message}
                  </div>
                )}

                {/* Submit Button */}
                <div className="d-grid mt-2">
                  <button 
                    type="submit" 
                    className="btn btn-lg shadow-sm" 
                    disabled={loading}
                    style={{ 
                      backgroundColor: "#002366", 
                      color: "#FFD700", 
                      fontWeight: "bold",
                      borderRadius: "10px",
                      transition: "0.3s"
                    }}
                  >
                    {loading ? (
                      <span className="spinner-border spinner-border-sm me-2"></span>
                    ) : (
                      "Save Department"
                    )}
                  </button>
                </div>

              </form>
            </div>

            {/* Footer decoration */}
            <div className="py-3 text-center bg-light border-top">
              <Link to="/manager/dashboard" className="text-decoration-none small fw-bold" style={{ color: "#002366" }}>
                ← Back to Dashboard
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default AddDepartment;