import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { getContactforDMList, SearchContacts } from "../controllers/ContactsController.js";


const contactRoutes = Router();

contactRoutes.post("/search", verifyToken, SearchContacts);
contactRoutes.get("/get-contact-for-dm", verifyToken, getContactforDMList);

export default contactRoutes;
