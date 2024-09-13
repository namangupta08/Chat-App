import { Router } from "express";
import { SignUp } from "../controllers/AuthController.js";


const AuthRoutes = Router();

AuthRoutes.post("/signup" , SignUp)

export default AuthRoutes;