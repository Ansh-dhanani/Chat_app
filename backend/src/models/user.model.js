import mongoose, { Types } from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique:true,
    },
    fullname:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    profilePic:{
        type:String,
        default:""
    }
},{
    timestamps:true
});

const User=mongoose.model("user",userSchema);

export default User;