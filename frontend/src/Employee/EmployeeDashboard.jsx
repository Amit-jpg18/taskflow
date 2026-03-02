import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchEmployeeTasks,
  updateEmployeeTaskStatus,
  fetchManagerById,
} from "../api/action/employeeTaskActions";
import { ToastContainer, toast } from "react-toastify";

function EmployeeTaskPage() {
  const dispatch = useDispatch();
  const { tasks, managers, loading, updatingId, error } =
    useSelector((state) => state.employeeTasks);

  useEffect(() => {
    dispatch(fetchEmployeeTasks());
  }, [dispatch]);

  useEffect(() => {
    tasks.forEach((task) => {
      if (task.managerId && !managers[task.managerId]) {
        dispatch(fetchManagerById(task.managerId));
      }
    });
  }, [tasks, managers, dispatch]);

  const handleStatusUpdate = async (taskId, status) => {
    const result = await dispatch(
      updateEmployeeTaskStatus({ taskId, status })
    );

    if (updateEmployeeTaskStatus.fulfilled.match(result)) {
      toast.success("Status updated!");
    } else {
      toast.error("Update failed");
    }
  };

  if (loading) return <p>Loading...</p>;
  return (
    <div className="container my-5">
      <ToastContainer theme="colored" />
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold" style={{ color: "#002366", borderLeft: "5px solid #FFD700", paddingLeft: "15px" }}>
          MY ASSIGNED TASKS
        </h2>
        <span className="badge p-2" style={{ backgroundColor: "#002366", color: "#FFD700" }}>
          Total Tasks: {tasks.length}
        </span>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {tasks.length === 0 ? (
        <div className="text-center p-5 shadow-sm bg-white" style={{ borderRadius: "15px" }}>
          <p className="text-muted">No tasks assigned to you yet. Relax! ☕</p>
        </div>
      ) : (
        <div className="row">
          {tasks.map((task) => (
            <div key={task.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm border-0" style={{ borderRadius: "15px", overflow: "hidden" }}>
                <div className="p-3 text-white fw-bold d-flex justify-content-between align-items-center" style={{ backgroundColor: "#002366" }}>
                  <span className="text-truncate" style={{ maxWidth: "70%" }}>{task.title}</span>
                  <small className="badge" style={{ backgroundColor: "#FFD700", color: "#002366" }}>
                    {task.priority || "Normal"}
                  </small>
                </div>

                <div className="card-body d-flex flex-column">
                  <p className="text-muted small mb-3">{task.description}</p>
                  
                  <div className="mt-auto border-top pt-3">
                    <p className="mb-1 small"><strong>👤 Manager:</strong> {managers[task.managerId]?.name || "Loading..."}</p>
                    <p className="mb-1 small text-truncate"><strong>📧 Contact:</strong> {managers[task.managerId]?.email || "-"}</p>
                    <p className="mb-2 small"><strong>📅 Due:</strong> {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "-"}</p>
                    
                    {/* Status Selection Dropdown */}
                    <div className="mb-3">
                      <label className="small fw-bold mb-1">Update Progress:</label>
                      <select 
                        className="form-select form-select-sm"
                        value={task.status || "Pending"}
                        disabled={updatingId === task.id}
                        onChange={(e) => handleStatusUpdate(task.id, e.target.value)}
                        style={{ border: "1px solid #002366" }}
                      >
                        <option value="To do">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                    </div>

                    <div className="d-flex align-items-center justify-content-between">
                      <small className="fw-bold">Status:</small>
                      <span className={`badge ${task.status === "Completed" ? "bg-success" : "bg-warning text-dark"}`}>
                        {task.status || "Pending"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EmployeeTaskPage;