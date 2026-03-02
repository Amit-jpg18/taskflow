import React from "react";

const TaskModal = ({ show, onClose, formData, setFormData, onSave }) => {
  if (!show) return null;

  const labelStyle = {
    fontSize: "0.75rem",
    fontWeight: "bold",
    color: "#002366",
    textTransform: "uppercase",
    marginBottom: "2px",
    display: "block"
  };

  const inputStyle = {
    borderRadius: "8px",
    border: "1px solid #dee2e6",
    marginBottom: "15px"
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
        backgroundColor: "rgba(0, 35, 102, 0.7)", // Navy transparent overlay
        zIndex: 1050,
        backdropFilter: "blur(4px)"
      }}
    >
      <div className="card shadow-lg border-0" style={{ borderRadius: "15px", width: "450px", overflow: "hidden" }}>
        {/* Modal Header */}
        <div className="p-3 text-center" style={{ backgroundColor: "#002366", color: "#FFD700" }}>
          <h5 className="mb-0 fw-bold">EDIT TASK DETAILS</h5>
        </div>

        <div className="card-body p-4">
          <label style={labelStyle}>Task Title</label>
          <input
            className="form-control"
            style={inputStyle}
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />

          <label style={labelStyle}>Description</label>
          <textarea
            className="form-control"
            style={{ ...inputStyle, height: "80px" }}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />

          <div className="row">
            <div className="col-6">
              <label style={labelStyle}>Priority</label>
              <select
                className="form-select"
                style={inputStyle}
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
            <div className="col-6">
              <label style={labelStyle}>Status</label>
              <select
                className="form-select"
                style={inputStyle}
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option>To Do</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>
          </div>

          <label style={labelStyle}>Due Date</label>
          <input
            className="form-control"
            style={inputStyle}
            type="date"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          />

          {/* Action Buttons */}
          <div className="d-flex justify-content-end mt-2 gap-2">
            <button className="btn btn-light fw-bold" onClick={onClose} style={{ borderRadius: "8px", color: "#666" }}>
              Cancel
            </button>
            <button 
              className="btn px-4 fw-bold" 
              onClick={onSave}
              style={{ backgroundColor: "#002366", color: "#FFD700", borderRadius: "8px" }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;