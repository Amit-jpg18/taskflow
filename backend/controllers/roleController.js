import { getAllRoles ,createDepartment} from "../models/Role.js";

export const fetchDepartmentsRoles = async (req, res) => {
  try {
    const results = await getAllRoles();
    const deptRoles = {};
    results.forEach(r => {
      if (!deptRoles[r.department]) deptRoles[r.department] = [];
      deptRoles[r.department].push({ id: r.id, name: r.name });
    });

    res.json(deptRoles);
  } catch (err) {
    console.error("Error fetching roles:", err);
    res.status(500).json({ error: err.message });
  }
};

// Add a new department
export const addDepartment = async (req, res) => {
  try {
    const { department, role } = req.body;

    if (!department) return res.status(400).json({ error: "Department is required" });

    const departmentId = await createDepartment(department, role);

    res.status(201).json({ message: "Department added successfully", departmentId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
