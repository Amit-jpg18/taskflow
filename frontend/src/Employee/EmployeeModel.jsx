import React, { useEffect, useState } from "react";
import axios from "axios";

const EmployeeModal = ({ show, onClose, formData, setFormData, onSave }) => {
  const [departmentRoles, setDepartmentRoles] = useState({});

  useEffect(() => {
    if (show) {
      axios
        .get("http://localhost:5000/api/departments-roles")
        .then((res) => setDepartmentRoles(res.data))
        .catch((err) => console.error("Error fetching roles:", err));
    }
  }, [show]);

  if (!show) return null;

  const inputStyle = {
    borderRadius: "8px",
    border: "1px solid #dee2e6",
    marginBottom: "15px",
  };

  return (
    <div
      className="modal-backdrop d-flex justify-content-center align-items-center"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 35, 102, 0.7)",
        zIndex: 1050,
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        className="card shadow-lg border-0"
        style={{ borderRadius: "15px", width: "450px" }}
      >
        <div
          className="p-3 text-center"
          style={{ backgroundColor: "#002366", color: "#FFD700" }}
        >
          <h5 className="mb-0 fw-bold">EDIT EMPLOYEE DETAILS</h5>
        </div>

        <div className="card-body p-4">
          {/* Full Name */}
          <label>Full Name</label>
          <input
            className="form-control"
            style={inputStyle}
            value={formData.full_name || ""}
            onChange={(e) =>
              setFormData({ ...formData, full_name: e.target.value })
            }
          />

          {/* Email */}
          <label>Email</label>
          <input
            className="form-control"
            style={inputStyle}
            type="email"
            value={formData.email || ""}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          {/* Phone */}
          <label>Phone</label>
          <input
            className="form-control"
            style={inputStyle}
            value={formData.phone || ""}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
          />

          {/* Department Dropdown */}
          <label>Department</label>
          <select
            className="form-select"
            style={inputStyle}
            value={formData.department || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                department: e.target.value,
                role: "",
              })
            }
          >
            <option value="">Select Department</option>
            {Object.keys(departmentRoles).map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>

          {/* Role Dropdown */}
          <label>Role</label>
          <select
            className="form-select"
            style={inputStyle}
            value={formData.role || ""}
            disabled={!formData.department}
            onChange={(e) =>
              setFormData({ ...formData, role: e.target.value })
            }
          >
            <option value="">Select Role</option>
            {formData.department &&
              departmentRoles[formData.department]?.map((role) => (
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
              ))}
          </select>

          <div className="d-flex justify-content-end gap-2 mt-3">
            <button className="btn btn-light" onClick={onClose}>
              Cancel
            </button>
            <button
              className="btn"
              onClick={onSave}
              style={{ backgroundColor: "#002366", color: "#FFD700" }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeModal;
