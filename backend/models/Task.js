import db from "../database/db.js"; 

export const createTask = async (taskData, managerid) => {
  try {
    const sql = `
      INSERT INTO tasks 
      (title, description, assignedTo, assignedEmail, managerId, priority, dueDate, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      taskData.title,
      taskData.description,
      taskData.assignedTo,      
      taskData.assignedEmail,    
      managerid,
      taskData.priority || "Medium",  // default if missing
      taskData.dueDate,
      taskData.status || "To Do",     // default if missing
    ];

    const [result] = await db.query(sql, values);
    return result;
  } catch (err) {
    console.error("Error creating task:", err);
    throw err;
  }
};


export const getAllTask=async(managerid)=>{
  try{
      var [result]=await  db.query("select *from tasks where managerId=?",[managerid]);
      return result;
  }catch(e){
      console.log(e);
    }
}





export const deleteTask = async (id) => {
  try {
    const [result] = await db.query("DELETE FROM tasks WHERE id = ?", [id]);
    return result;
  } catch (err) {
    console.error("Error deleting task:", err);
    throw err;
  }
};




export const updateTask = async (id, { title, description, priority, status, dueDate }) => {
  try {
    const [result] = await db.query(
      `UPDATE tasks 
       SET title = ?, description = ?, priority = ?, status = ?, dueDate = ? 
       WHERE id = ?`,
      [title, description, priority, status, dueDate, id]
    );

    // Optional: return the updated task
    const [updatedRows] = await db.query("SELECT * FROM tasks WHERE id = ?", [id]);
    return updatedRows[0]; // return the updated task object
  } catch (err) {
    console.error("Error updating task:", err);
    throw err;
  }
};