import mongoose, { Types } from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    fullName:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    profilePic:{
        type:String,
        default:""
    },
    isOnline:{
        type:Boolean,
        default:false
    },
    lastSeen:{
        type:Date,
        default:Date.now
    }
},{
    timestamps:true
});

const User=mongoose.model("user",userSchema);

export default User;