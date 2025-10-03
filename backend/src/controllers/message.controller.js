import User from "../models/user.model.js";
import Message from '../models/Message.model.js';
import cloudinary from "../lib/cloudinary.js";


export const getAllContacts =async(req,res)=>{
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password")
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("enter in getAllContacts",error);
        res.status(500).json({Message:"Server error"});
    }
}

export const getMessagesByUserId = async (req,res) => {
    try {
        const myId = req.user._id;
        const {id:userToChatId}= req.params;

        const messages = await Message.find({
            $or:[
                {senderId:myId,receivedId:userToChatId},
                {senderId:userToChatId,receivedId:myId},
            ] 
        });
        res.status(200).json({messages})
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

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl= uploadResponse.secure_url;
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
                    ? msg.receivedId.toString()
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