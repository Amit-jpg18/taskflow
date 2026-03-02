import db from "../database/db.js";
import bcrypt from "bcryptjs";


export const registerEmployee = async ({ fullName, email, phoneNumber, department, role, password,managerid }) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO employees (full_name, email, phone, department, role, password,managerid)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [fullName, email, phoneNumber, department, role, hashedPassword,managerid]);
    return result.insertId;
  } catch (error) {
    console.error("Error registering employee:", error);
    throw error;
  }
};

export const fetchAllEmployees=async()=>{
    try{     var sql="select *from employees";
        var [result]=await db.query(sql);
        return result;
    }catch(error){
      console.error("Error registering employee:", error);
    throw error;
    }
}

export const loginEmployee = async (email) => {
  const [rows] = await db.query(
    "SELECT * FROM employees WHERE email = ?",
    [email]
  );
  return rows[0] || null;
};




export const fetchAlltaskbygmail=async(gmail)=>{
    try{     var sql="select *from tasks where assignedEmail=?";
        var [result]=await db.query(sql,[gmail]);
        return result;
    }catch(error){
      console.error("Error registering employee:", error);
    throw error;
    }
}

export const fetchEmployeeById = async (employeeId) => {
  try {
    const sql = `
      SELECT id, full_name, email, phone, department, role, created_at
      FROM employees
      WHERE id = ?
      LIMIT 1
    `;
    const [result] = await db.query(sql, [employeeId]);
    return result[0]; // return single employee object
  } catch (error) {
    console.error("Error fetching employee:", error);
    throw error;
  }
};

export const updateEmployeeByIdModel = async (employeeId, data) => {
  let { full_name, email, phone, password } = data;

  if (password) {
    password = await bcrypt.hash(password, 10);
  }

  const sql = `
    UPDATE employees 
    SET full_name = ?, email = ?, phone = ? ${password ? ", password = ?" : ""} 
    WHERE id = ? LIMIT 1
  `;

  const values = password
    ? [full_name, email, phone, password, employeeId]
    : [full_name, email, phone, employeeId];

  await db.query(sql, values);

  // Return updated employee
  return employeeId;
};

                                                               

export const findByIdAndUpdate = async ({ taskId, status }) => {
  const sql = "UPDATE tasks SET status=? WHERE id=?";
  const [result] = await db.query(sql, [status, taskId]);
  return result;
};
export const deleteEmployeebyid= async ({ taskId, status }) => {
  const sql = "UPDATE tasks SET status=? WHERE id=?";
  const [result] = await db.query(sql, [status, taskId]);
  return result;
};
export const getEmployeesByManagerId = async (managerid) => {
  try {
    const sql = `
      SELECT *from employees
      WHERE managerid = ?
    `;

    const [rows] = await db.query(sql, [managerid]);

    return rows;
  } catch (error) {
    console.error("Error fetching employees by managerid:", error);
    throw error;
  }
};

export const deleteemployeebyid=async(id)=>{
   var sql="delete from employees where id=?"         
    const [row]=await db.query(sql,[id]);
    return row;
}

export const updateEmployeeById = async (id, data) => {
  const { full_name, email, phone, department, role } = data;

  const sql = `
    UPDATE employees
    SET full_name = ?, email = ?, phone = ?, department = ?, role = ?
    WHERE id = ?
  `;

  const [result] = await db.query(sql, [
    full_name,
    email,
    phone,
    department,
    role,
    id,
  ]);

  return result;
};
