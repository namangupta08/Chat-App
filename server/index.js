import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import AuthRoutes from './routes/AuthRoute.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const DATABASE_URL = process.env.DATABASE_URL;

app.use(cors({
    origin:[process.env.ORIGIN],
    methods:["GET" , "POST" , "PATCH" , "PUT" , "DELETE"],
    credentials:true,
}))

app.use(cookieParser())
app.use(express.json())

app.use("/api/auth" , AuthRoutes)

const server = app.listen(port , () => {
    console.log(`Server is running at http://localhost:${port}`);
})

mongoose
    .connect(DATABASE_URL)
    .then(() => console.log("DB connection successfull✅ "))
    .catch((err) => console.log("Db Connection unsuccessfull ❌" + err))
