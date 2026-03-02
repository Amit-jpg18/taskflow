import db from "../database/db.js";

export const getAllRoles = async () => {
  const [results] = await db.query(
    "SELECT id, department, name FROM roles ORDER BY department, name"
  );
  return results;
};
export const createDepartment = async (department, role) => {
  const roleName = role || "General"; 
  const [result] = await db.query(
    "INSERT INTO roles (department, name) VALUES (?, ?)",
    [department, roleName]
  );
  return result.insertId;
};