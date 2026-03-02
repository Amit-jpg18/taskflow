import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees, deleteEmployee, updateEmployee } from "../api/action/employeeActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmployeeModal from "./EmployeeModel";

const EmployeeList= () => {
  const dispatch = useDispatch();
  const { employees, loading, message, error } = useSelector((state) => state.employee);

  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  useEffect(() => {
    if (message) toast.success(message);
    if (error) toast.error(error);
  }, [message, error]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteEmployee(id));
    }
  };

  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setFormData(employee);
    setShowModal(true);
  };

  const handleUpdate = () => {
    dispatch(updateEmployee({ id: selectedEmployee.id, data: formData }));
    setShowModal(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container my-5">
      <ToastContainer />
      <h2 className="mb-4" style={{ color: "#002366" }}>Employee List</h2>

      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <div className="row">
          {employees.map((e) => (
            <div key={e.id} className="col-md-4 mb-4">
              <div className="card shadow-sm p-3">
                <p><strong>Name:</strong> {e.full_name}</p>
                <p><strong>Email:</strong> {e.email}</p>
                <p><strong>Phone:</strong> {e.phone}</p>
                <p><strong>Department:</strong> {e.department}</p>
                <p><strong>Role:</strong> {e.role}</p>
                <div className="d-flex gap-2 mt-2">
                  <button className="btn btn-warning btn-sm flex-grow-1" onClick={() => handleEditClick(e)}>Edit</button>
                  <button className="btn btn-danger btn-sm flex-grow-1" onClick={() => handleDelete(e.id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <EmployeeModal
        show={showModal}
        onClose={() => setShowModal(false)}
        formData={formData}
        setFormData={setFormData}
        onSave={handleUpdate}
      />
    </div>
  );
};

export default EmployeeList;
