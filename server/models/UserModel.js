import { genSalt, hash } from "bcrypt";
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true , "Email is required."],
        unique:true,
    },
    firstName:{
        type:String,
        required:false,
    },
    lastName:{
        type:String,
        required:false,
    },
    image:{
        type:String,
        required:false,
    },
    color:{
        type:Number,
        required:false,
    },
    profileSetup:{
        type:Boolean,
        required:false,
    }

});

userSchema.pre("save" , async function(next){
    const salt = await genSalt(10);
    this.password = await hash(this.password , salt);
    next();
})

const User = mongoose.model("Users" , userSchema);
export default User;