import { Router } from "express";
import { Login, SignUp } from "../controllers/AuthController.js";


const AuthRoutes = Router();

AuthRoutes.post("/signup" , SignUp)
AuthRoutes.post("/login" , Login)


export default AuthRoutes;