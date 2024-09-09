import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import AuthRoutes from './routes/AuthRoutes.js';


dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const dataBaseUrl = process.env.MONGODB_URL;

app.use(cors({
    origin:[process.env.ORIGIN],
    methods:["GET" , "POST" , "PATCH" , "PUT" , "DELETE"],
    credentials:true,
}))

app.use("/uploads/profiles" , express.static("uploads/profiles"))

app.use(cookieParser())
app.use(express.json())

app.use("/api/auth" , AuthRoutes )

const server = app.listen(port , () => {
    console.log(`Server is running at http://localhost:${port}`);
})

mongoose
    .connect(dataBaseUrl)
    .then(() => console.log("DB connection successfull✅ "))
    .catch((err) => console.log("Db Connection unsuccessfull ❌" + err))


