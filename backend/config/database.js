import mongoose from "mongoose";


const connectDB = async (req,res) => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Db connection successfull")
    } catch (error) {
        console.log("DB connection failed")
        console.log(error)
    }
};

export default connectDB;