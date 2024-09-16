import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import AuthRoutes from './routes/AuthRoute.js';
import contactRoutes from './routes/ContactRoutes.js';
import setupSocket from './socket.js';
import messagesRoutes from './routes/MessagesRoutes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const DATABASE_URL = process.env.DATABASE_URL;

app.use(cors({
    origin:[process.env.ORIGIN],
    methods:["GET" , "POST" , "PATCH" , "PUT" , "DELETE"],
    credentials:true,
}))

app.use("/uploads/profiles" , express.static("uploads/profiles"))

app.use(cookieParser())
app.use(express.json())

app.use("/api/auth" , AuthRoutes)
app.use("/api/contacts" , contactRoutes)
app.use("/api/messages" , messagesRoutes)

const server = app.listen(port , () => {
    console.log(`Server is running at http://localhost:${port}`);
})

setupSocket(server);

mongoose
    .connect(DATABASE_URL)
    .then(() => console.log("DB connection successfull✅ "))
    .catch((err) => console.log("Db Connection unsuccessfull ❌" + err))
