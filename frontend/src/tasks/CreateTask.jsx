import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Added Toastify
import "react-toastify/dist/ReactToastify.css";

const CreateTask = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      assignedTo: "",
      assignedEmail: "",
      priority: "Medium",
      dueDate: "",
      status: "To Do",
    },
  });

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false); // Added Loading state

  // Fetch employee list
  useEffect(() => {
    axios
      .get("http://localhost:5000/employee/getallEmployee")
      .then((resp) => setEmployees(resp.data.employee || []))
      .catch((e) => console.log("Fetch Error:", e));
  }, []);

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.full_name.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectEmployee = (emp) => {
    setValue("assignedTo", emp.id);
    setValue("assignedEmail", emp.email);
    setSearch(emp.full_name); 
    setShowDropdown(false);
  };

  const onSubmit = (data) => {
    setLoading(true);
    axios
      .post("http://localhost:5000/create/task", data,  {
    withCredentials: true, 
  })
      .then(() => {
        // Professional Toast Notification
        toast.success("🚀 Task created and assigned successfully!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
          style: { backgroundColor: "#002366", color: "#FFD700" }
        });
        reset();
        setSearch("");
      })
      .catch((err) => {
        console.log("Error saving task:", err);
        toast.error("❌ Failed to create task. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  const inputStyle = {
    borderRadius: "10px",
    fontSize: "0.95rem",
    border: "1px solid #dee2e6",
    padding: "10px 15px",
  };

  const labelStyle = {
    fontWeight: "bold",
    color: "#002366",
    fontSize: "0.85rem",
    textTransform: "uppercase",
    marginBottom: "5px",
  };

  return (
    <div
      className="container-fluid min-vh-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "#f0f2f5", padding: "40px 0" }}
    >
      {/* Toast Container needs to be present in the component */}
      <ToastContainer />

      <div
        className="card shadow-lg border-0"
        style={{ borderRadius: "20px", maxWidth: "600px", width: "100%", overflow: "hidden" }}
      >
        <div className="p-4 text-center" style={{ backgroundColor: "#002366", color: "#FFD700" }}>
          <h3 className="fw-bold mb-1" style={{ letterSpacing: "1px" }}>CREATE NEW TASK</h3>
          <p className="mb-0 small" style={{ color: "rgba(255,255,255,0.8)" }}>Assign responsibilities to your team</p>
        </div>

        <div className="card-body p-4 p-md-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            
            <div className="mb-3">
              <label style={labelStyle}>Task Title *</label>
              <input
                type="text"
                {...register("title", { required: "Title is required" })}
                placeholder="What needs to be done?"
                className={`form-control ${errors.title ? "is-invalid" : ""}`}
                style={inputStyle}
              />
              {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
            </div>

            <div className="mb-3">
              <label style={labelStyle}>Description</label>
              <textarea
                {...register("description")}
                placeholder="Provide details about the task..."
                className="form-control"
                style={{ ...inputStyle, height: "100px" }}
              />
            </div>

            {/* Search Dropdown */}
            <div className="mb-3 position-relative">
              <label style={labelStyle}>Assign To Employee *</label>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={search}
                autoComplete="off"
                onChange={(e) => {
                  setSearch(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                className={`form-control ${errors.assignedTo ? "is-invalid" : ""}`}
                style={inputStyle}
              />
              <input type="hidden" {...register("assignedTo", { required: "Please select an employee" })} />
              <input type="hidden" {...register("assignedEmail")} />

              {showDropdown && search.length > 0 && (
                <div
                  className="shadow border position-absolute w-100 bg-white"
                  style={{ zIndex: 1000, borderRadius: "10px", maxHeight: "200px", overflowY: "auto", marginTop: "5px" }}
                >
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((emp) => (
                      <div
                        key={emp.id}
                        onClick={() => handleSelectEmployee(emp)}
                        className="p-3 border-bottom"
                        style={{ cursor: "pointer", transition: "0.2s" }}
                        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#f8f9fa")}
                        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "white")}
                      >
                        <div className="fw-bold small" style={{ color: "#002366" }}>{emp.full_name}</div>
                        <div className="text-muted" style={{ fontSize: "0.75rem" }}>{emp.email}</div>
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-muted small">No employees found</div>
                  )}
                </div>
              )}
              {errors.assignedTo && <div className="text-danger small mt-1">{errors.assignedTo.message}</div>}
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label style={labelStyle}>Priority</label>
                <select {...register("priority")} className="form-select" style={inputStyle}>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label style={labelStyle}>Due Date *</label>
                <input
                  type="date"
                  {...register("dueDate", { required: "Due Date is required" })}
                  className={`form-control ${errors.dueDate ? "is-invalid" : ""}`}
                  style={inputStyle}
                />
                {errors.dueDate && <div className="invalid-feedback">{errors.dueDate.message}</div>}
              </div>
            </div>

            <div className="d-grid pt-3">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-lg shadow"
                style={{
                  backgroundColor: "#002366",
                  color: "#FFD700",
                  fontWeight: "bold",
                  borderRadius: "12px",
                  padding: "12px",
                }}
              >
                {loading ? "SAVING..." : "SAVE TASK"}
              </button>
            </div>
          </form>
        </div>

        <div className="py-3 text-center bg-light border-top">
          <Link to="/manager/dashboard" className="text-decoration-none small fw-bold" style={{ color: "#002366" }}>
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateTask; 