import express from "express";
import * as Manager from "../controllers/managerController.js"
import { loginUser } from "../controllers/loginController.js";
import { verifyAuth } from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/manager/login",loginUser);

router.get("/manager/dashboard",verifyAuth,(req,res)=>{
  console.log(req.user.name);
    res.status(200).json({
    response: true,
    manager: req.user, 
  });
})
router.get("/manager/me", verifyAuth, (req, res) => {
  res.status(200).json({ manager: req.user });
});

router.post("/manager/logout", verifyAuth,Manager.logoutManager)
router.get("/manager/details", verifyAuth,Manager.detailsManager);

router.get("/manager/:id",Manager.getManagerDetails );


export default router;
