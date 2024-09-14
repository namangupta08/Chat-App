import { Router } from "express";
import { getUserInfo, Login, SignUp } from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";


const AuthRoutes = Router();

AuthRoutes.post("/signup" , SignUp)
AuthRoutes.post("/login" , Login)
AuthRoutes.get("/user-info" , verifyToken, getUserInfo)

export default AuthRoutes;