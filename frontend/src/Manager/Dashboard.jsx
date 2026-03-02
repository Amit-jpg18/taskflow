import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, deleteTask, updateTask } from "../api/action/taskActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TaskModal from "./TaskModel";
const DashboardModal = () => {
  const dispatch = useDispatch();

  // 🔥 Redux State
  const { tasks, loading, error } = useSelector(
    (state) => state.taskState
  );

  // 🔥 Local UI State
  const [showModal, setShowModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "To Do",
    dueDate: "",
  });

  // 🔥 Fetch tasks on load
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // 🔥 Delete Task
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(id));
      toast.success("🗑️ Task deleted successfully!");
    }
  };

  // 🔥 Open Edit Modal
  const handleEditClick = (task) => {
    setSelectedTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate ? task.dueDate.slice(0, 10) : "",
    });
    setShowModal(true);
  };

  // 🔥 Update Task
  const handleUpdate = () => {
    dispatch(updateTask(selectedTask.id, formData));
    toast.success("Task updated successfully!");
    setShowModal(false);
  };

  // 🔥 Loading State
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status"></div>
      </div>
    );
  }

  // 🔥 Error State
  if (error) {
    return (
      <div className="text-center mt-5">
        <h4 className="text-danger">Error: {error}</h4>
      </div>
    );
  }
  return (
    <div className="container my-5">
      <ToastContainer />
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2
          className="fw-bold"
          style={{ color: "#002366", borderLeft: "5px solid #FFD700", paddingLeft: "15px" }}
        >
          TEAM TASK DASHBOARD
        </h2>
        <span className="badge p-2" style={{ backgroundColor: "#002366", color: "#FFD700" }}>
          Total Tasks: {tasks.length}
        </span>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center p-5 shadow-sm bg-white" style={{ borderRadius: "15px" }}>
          <p className="text-muted">No tasks found! Create one to get started.</p>
        </div>
      ) : (
        <div className="row">
          {tasks.map((task) => (
            <div key={task.id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm border-0" style={{ borderRadius: "15px", overflow: "hidden" }}>
                <div
                  className="p-3 text-white fw-bold d-flex justify-content-between align-items-center"
                  style={{
                    backgroundColor:
                      task.priority === "High" ? "#dc3545" : task.priority === "Medium" ? "#002366" : "#28a745",
                  }}
                >
                  <span>{task.title}</span>
                  <small className="badge bg-light text-dark">{task.priority}</small>
                </div>

                <div className="card-body">
                  <p className="text-muted small mb-3" style={{ minHeight: "40px" }}>
                    {task.description}
                  </p>
                  <hr className="my-2" />
                  <p className="mb-1 small">
                    <strong>👤 Assigned:</strong> {task.assignedEmail}
                  </p>
                  <p className="mb-1 small">
                    <strong>📅 Due:</strong> {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                  <p className="mb-3 small">
                    <strong>⚙️ Status:</strong>{" "}
                    <span className={`ms-2 badge ${task.status === "Completed" ? "bg-success" : "bg-warning text-dark"}`}>
                      {task.status}
                    </span>
                  </p>

                  <div className="d-flex gap-2 mt-auto">
                    <button
                      onClick={() => handleEditClick(task)}
                      className="btn btn-sm flex-grow-1"
                      style={{ backgroundColor: "#FFD700", color: "#002366", fontWeight: "bold" }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="btn btn-sm btn-outline-danger"
                      style={{ borderRadius: "8px" }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <TaskModal
        show={showModal}
        onClose={() => setShowModal(false)}
        formData={formData}
        setFormData={setFormData}
        onSave={handleUpdate}
      />
    </div>
  );
};

export default DashboardModal;
