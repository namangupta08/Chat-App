import User from "../models/U ser.js";

export const signup = async (res,req) => {
    try {
        
        const {fullName , userName , password , confrimPassword , gender} = req.body;

        if(password != confrimPassword){
            return res.status(400).json({
                success: false,
                message:"Password and Confirm Password do not match. Please try again.",
            });
        }
        
        const user = await User.findOne({userName});

        if(user){
            return res.status(400).json({
                success: false,
                message:"User Already exists",
            });
        }
    
    
    
    
    
    
    
    
    
    } catch (error) {
        
    }
}

export const login = (req,res) => {
    console.log("login user")
}

export const logout = (req,res) => {
    console.log("logOut user")
}