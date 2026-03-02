import db from "../database/db.js"
import bcrypt from "bcryptjs";
export const registerManager = async ({ name, email, teamName, phoneNumber, password, profilePicture }) => {
  try {
    const sql = `
      INSERT INTO Managers (name, email, teamname, phonenumber, password, profilePicture)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(sql, [name, email, teamName, phoneNumber, password, profilePicture || null]);
    return result.insertId;
  } catch (error) {
    console.error("Error registering manager:", error);
    throw error;
  }
};

export const loginManager = async (email) => {
  const [rows] = await db.query(
    "SELECT * FROM Managers WHERE email = ?",
    [email]
  );
  return rows[0] || null;
};


export const getManagerDetailsById = async (managerId) => {
  try {
    const sql = `
      SELECT 
        id,
        name,
        email,
        teamName,
        phoneNumber,
        profilePicture
      FROM Managers
      WHERE  id = ?
    `;

    const [rows] = await db.query(sql, [managerId]);
    return rows[0];
  } catch (error) {
    console.error("Model error (getManagerDetailsById):", error);
    throw error;
  }
};



export const updateManager = async (managerId, data) => {
  const fields = [];
  const values = [];

  Object.keys(data).forEach(key => {
    fields.push(`${key} = ?`);
    values.push(data[key]);
  });

  values.push(managerId);

  const sql = `UPDATE Managers SET ${fields.join(", ")} WHERE id = ?`;
  await db.execute(sql, values);
};

