import User from "../models/user.model.js";
import Message from '../models/Message.model.js';
import cloudinary from "../lib/cloudinary.js";


export const getAllContacts =async(req,res)=>{
    try {
        const loggedInUserId = req.user._id;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const skip = (page - 1) * limit;       
        const filteredUsers = await User.find({_id:{$ne:loggedInUserId}})
            .select("-password")
            .limit(limit)
            .skip(skip);
        
        const total = await User.countDocuments({_id:{$ne:loggedInUserId}});
        
        res.status(200).json({
            users: filteredUsers,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        console.log("enter in getAllContacts",error);
        res.status(500).json({Message:"Server error"});
    }
}

export const getMessagesByUserId = async (req,res) => {
    try {
        const myId = req.user._id;
        const {id:userToChatId}= req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const skip = (page - 1) * limit;


        const messages = await Message.find({
            $or:[
                {senderId:myId,receiverId:userToChatId},
                {senderId:userToChatId,receiverId:myId},
            ] 
        })
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip);
        
        const total = await Message.countDocuments({
            $or:[
                {senderId:myId,receiverId:userToChatId},
                {senderId:userToChatId,receivedIr:myId},
            ]
        });

        res.status(200).json({
            messages: messages.reverse(), // Reverse to show oldest first
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit)
            }
        })
    } catch (error) {
        console.log("error in getMessage Controller :",error.message);
        res.status(500).json({error:"Internal Server error"});
    }
}

export const sendMessage = async (req,res) => {
    try {
        const {text,image}=req.body;
        const {id:receiverId} = req.params;
        const senderId =req.user._id;

        if (!text && !image) {
            return res.status(400).json({
                error: "Message must contain either text or image"
            });
        }

        let imageUrl;
        if(image){
            try {
                const uploadResponse = await cloudinary.uploader.upload(image);
                imageUrl = uploadResponse.secure_url;
            } catch (uploadError) {
                console.error("Cloudinary upload failed:", uploadError.message);
                return res.status(400).json({
                    error: "Failed to upload image. Please try again or send without image."
                });
            }
        }

        const newMessage = new Message({
            senderId,
            receivedId: receiverId,
            text,
            image: imageUrl,
        })

        await newMessage.save();

        //send message to user realtime if user is online



        res.status(201).json({newMessage})

    } catch (error) {
        console.log("Error in sendMessage controller: ",error.message);
        res.status(500).json({error:"Internal server error"});
    }
}

export const getChatPartners=async (req,res) => {
    try {
        const loggedInUserId = req.user._id

        //find all the messages where the user is reciever of sender
        const messages = await Message.find({
            $or:[{senderId:loggedInUserId},{receiverId:loggedInUserId}],
        })

        const chatPartnersIds = [
            ...new Set(
                messages.map((msg) => 
                    msg.senderId.toString() === loggedInUserId.toString()
                    ? msg.receiverId.toString()
                    :msg.senderId.toString()
                )
            ),
        ];

        const chatPartners= await User.find({_id:{$in:chatPartnersIds}}).select("-password")
        res.status(200).json({chatPartners});
    } catch (error) {
        console.error("Error in getChatPartners: ",error.message);
        res.status(500).json({error:"internal server error"});
    }
}