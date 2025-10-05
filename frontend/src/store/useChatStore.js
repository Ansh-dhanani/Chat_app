import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set,get)=>({
    allContacts:[],
    conversations:[], // Updated from chats to conversations for clarity
    messages:[],
    activeTab:"chats",
    selectedUser : null,
    onlineUsers:[], // Added for contact list
    isUsersLoading:false,
    isMessagesLoading:false, // Fixed typo: isMessaegesLoading -> isMessagesLoading
    isSoundEnable:localStorage.getItem("isSoundEnable") === "true", // Fixed boolean conversion

    toggleSound:()=>{
        const newState = !get().isSoundEnable;
        localStorage.setItem("isSoundEnable", newState.toString()); // Fixed key mismatch
        set({isSoundEnable: newState});
    },

    setActiveTab:(tab)=>set({activeTab:tab}),
    setSelectedUser:(selectedUser)=>set({selectedUser}),

    getAllContacts: async()=>{
        set({isUsersLoading:true});
        try {
            const res = await axiosInstance.get("/messages/contacts");
            set({allContacts:res.data, onlineUsers: res.data}); // Also set as onlineUsers for now
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch contacts");
        } finally {
            set({isUsersLoading:false});
        }
    },
    
    getMyChatPartners:async()=>{
        set({isUsersLoading:true});
        try {
            const res = await axiosInstance.get("/messages/chats");
            set({conversations:res.data}); // Updated property name
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch conversations");
        } finally {
            set({isUsersLoading:false});
        }
    },

    sendMessage: async(messageData) => {
        try {
            const res = await axiosInstance.post("/messages/send", messageData);
            // TODO: Update messages array with new message
            // TODO: Update conversation list with latest message
            // TODO: Implement optimistic updates
            // TODO: Handle WebSocket real-time updates
            toast.success("Message sent!");
            return res.data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to send message");
            throw error; // Re-throw to allow calling code to handle the error
        }
    },

    // TODO: Add getMessages function to fetch conversation messages
    // TODO: Add markMessageAsRead function
    // TODO: Add deleteMessage function
    // TODO: Add WebSocket connection management
    // TODO: Add typing indicators
    // TODO: Add online status management
}));