import { sendWelcomeEmail } from '../emails/emailHandler.js';
import { generateToken } from '../lib/utils.js';
import User from '../models/user.model.js';
import bcrypt from "bcryptjs";
import "dotenv/config";

export const signup = async (req ,res)=>{


    const {fullname ,email,password}=req.body;
    
    try {
        if(!fullname || !email || !password){
            return res.status(400).json({message:"All feilds are required"});
        }
        if(password.length<8){
            return res.status(400).json({message:"password should be atleast 8 characters"});
        }

        //check if email is valid or not 

        const emailRegex= /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({message:"Invalid Email"});
        }
        
        const user = await User.findOne({email});
        if(user) {return res.status(400).json({message:"Email already used"});}


        const salt =await bcrypt.genSalt(10);
        const hashedPassword =await bcrypt.hash(password,salt);
        const newUser =new User({
            fullname,
            email,
            password:hashedPassword
        })

        if(newUser){
            const savedUser = await newUser.save();
            generateToken(savedUser._id,res);
            

            res.status(201).json({
                _id:newUser._id,
                fullname:newUser.fullname,
                email:newUser.email,
                profilePic:newUser.profilePic
            })
        
            try {
                await sendWelcomeEmail(savedUser.email,savedUser.fullname,process.env.CLIENT_URL)
            } catch (error) {
                console.error("Failed to send welcome Email :",error);
            }
        }

        else{
            res.status(400).json({message:"Invalid user data"});
        }
    } catch (error) {
        console.log("error in signup controller");
        res.status(500).json({message:"internal server error"});
    }
};