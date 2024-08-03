import express from "express";
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"

const app = express();
dotenv.config();

const PORT = process.env.PORT || 4000


app.use('/api/auth' , authRoutes)

app.get("/" , (req,res  ) => {
    res.send("hello world!!!")
})

app.listen(PORT , () => console.log(`Server running on port ${PORT}`));