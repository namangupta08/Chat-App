import express from "express";
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"
import connectDB from "./config/database.js";

const PORT = process.env.PORT || 4000
const app = express();


dotenv.config();

app.use('/api/auth' , authRoutes)
app.use(express.json())

connectDB();

// app.get("/" , (req,res  ) => {
//     res.send("hello world!!!")
// })

app.listen(PORT , () => console.log(`Server running on port ${PORT}`));