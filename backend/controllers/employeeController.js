import { registerEmployee ,fetchAllEmployees,fetchAlltaskbygmail, 
  updateEmployeeByIdModel,findByIdAndUpdate ,updateEmployeeById,fetchEmployeeById,deleteemployeebyid,getEmployeesByManagerId} from "../models/Employee.js";

export const handleRegister = async (req, res) => {
  const { full_name, email, phone, department, role, password } = req.body;
   
           const managerid = req.user.id; 
  if (!full_name || !email || !department || !password) {
    return res.status(400).json({
      error: "Full Name, Email, Department and Password are required"
    });
  }

  await registerEmployee({
    fullName: full_name,   // ✅ yahin se model ko correct value
    email,
    phoneNumber: phone,
    department,
    role,
    password,
    managerid
  });

  res.status(201).json({ message: "Employee registered successfully" });
};


export const getAllEmployees= async (req, res) => {
  try {
    const employees = await fetchAllEmployees();
    res.json({ employee: employees });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch employees" });
  }
};

 export const fetchManagerEmployees = async (req, res) => {
  try {
    const managerid = req.user.id; 
    const employees = await getEmployeesByManagerId(managerid);

    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const getAllTask= async (req, res) => {
  try {
     
    const tasks = await fetchAlltaskbygmail(req.user.email);
    res.json({ task: tasks });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch employees" });
  }
};

export const getEmployeeDetails = async (req, res) => {
  const employeeId = req.user.id;

  if (!employeeId) {
    return res.status(400).json({ error: "Employee ID is required" });
  }

  try {
    const employee = await fetchEmployeeById(employeeId);

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json({ employee });
  } catch (error) {
    console.error("Error in controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateEmployeeProfile = async (req, res) => {
  const employeeId = req.user?.id;
  if (!employeeId) return res.status(400).json({ error: "Employee ID is required" });

  const { full_name, email, phone, password } = req.body;

  if (!full_name && !email && !phone && !password) {
    return res.status(400).json({ error: "No fields provided to update" });
  }

  try {
    const updatedEmployee = await updateEmployeeByIdModel(employeeId, {
      full_name,
      email,
      phone,
      password,
    });
    res.json({ employee: updatedEmployee });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const taskUpdateByEmployee = async (req, res) => {
  const { taskId } = req.params;
  const { status } = req.body;

  if (!taskId) return res.status(400).json({ error: "Task ID is required" });
  if (!status) return res.status(400).json({ error: "Status is required" });

  try {
    const task = await findByIdAndUpdate({taskId,status})

    if (!task) return res.status(404).json({ error: "Task not found" });

    res.json({ message: "Task status updated successfully", task });
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};


export const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "Employee ID is required" });
  }

  try {
    const result = await deleteemployeebyid(id)

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error("Error deleting employee:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { full_name, email, phone, department, role } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Employee ID is required" });
  }

  try {
    const result = await updateEmployeeById(id, {
      full_name,
      email,
      phone,
      department,
      role,
    });

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json({
      message: "Employee updated successfully",
      employee: { id, full_name, email, phone, department, role },
    });
  } catch (err) {
    console.error("Error updating employee:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
