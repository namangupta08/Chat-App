import { Router } from "express";
import { addProfileImage, getUserInfo, Login, SignUp , UpdateProfile , removeProfileImage, logout } from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import multer from "multer";


const AuthRoutes = Router();
const upload =  multer({dest:"uploads/profiles"})

AuthRoutes.post("/signup" , SignUp)
AuthRoutes.post("/login" , Login)
AuthRoutes.get("/user-info" , verifyToken, getUserInfo)
AuthRoutes.post("/update-profile" , verifyToken , UpdateProfile)
AuthRoutes.post("/add-profile-image" , verifyToken , upload.single('profile-image') ,  addProfileImage)
AuthRoutes.delete("/remove-profile-image" , verifyToken , removeProfileImage)
AuthRoutes.post("/logout" , logout)

export default AuthRoutes;