import { configureStore } from "@reduxjs/toolkit";
import managerSignupReducer from "../reducer/ managerSignupReducer";
import  taskReducer from "../reducer/taskReducer";
import managerReducer from "../reducer/managerSlice";
import employeeTaskReducer from "../reducer/employeeTaskSlice";
import departmentReducer from "../reducer/departmentSlice";
import employeeReducer from "../reducer/employeeSlice";
export const store = configureStore({
  reducer: {
    managerSignup: managerSignupReducer,
    taskState: taskReducer,
    managerState: managerReducer,
     employeeTasks: employeeTaskReducer,
         department: departmentReducer,
          employee: employeeReducer,
  },
});