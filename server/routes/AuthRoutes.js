import { Router } from "express";
import { getUserInfo, Login, SignUp ,UpdateProfile , addProfileImage } from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import multer from "multer";




const AuthRoutes = Router();
const upload =  multer({dest:"uploads/profiles"})

AuthRoutes.post("/signup" , SignUp)
AuthRoutes.post("/login" , Login)
AuthRoutes.get("/user-info" , verifyToken , getUserInfo)
AuthRoutes.post("/update-profile" , verifyToken , UpdateProfile)
AuthRoutes.post("/add-profile-image" , verifyToken , upload.single('profile-image') ,  addProfileImage)


export default AuthRoutes;