import express from "express";
import cors from "cors";
import {upload} from "./middleware/multerMiddleware.js"
import { registerManager, updateManagerController} from "./controllers/managerController.js";

import cookieParser from "cookie-parser";
import roleRoutes from "./routers/roleRoutes.js";
import employeeRoutes  from "./routers/employeeRoutes.js"
import path from "path"; 
import  taskRoute from "./routers/taskRoute.js"
import { verifyAuth } from "./middleware/authMiddleware.js";
import managerRouter from "./routers/managerRoutes.js"
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
  origin: [
    "http://localhost:5173",
  ],
  credentials: true
}));

app.post("/manager/signup", upload.single("profilePicture"), registerManager);
app.put("/manager/update", verifyAuth ,upload.single("profilePicture"), updateManagerController );
app.use("/",managerRouter);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/",roleRoutes)
 app.use("/employee",employeeRoutes)
 app.use("/",verifyAuth,taskRoute);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
