import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import { sendWelcomeEmail } from '../lib/emailService';
import toast from 'react-hot-toast';

export const useAuthStore = create((set, get)=>({
    authUser : null,
    isCheckingAuth:true,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,

    checkAuth :async ()=>{
        try {
            const res = await axiosInstance.get("/auth/check")
            set({authUser:res.data, isCheckingAuth: false})
        } catch (error) {
            set({authUser:null, isCheckingAuth: false})
        }
    },

    signup:async(data)=>{
        set({isSigningUp:true})
        try {
            const res = await axiosInstance.post("/auth/signup",data);
            set({authUser:res.data, isSigningUp: false});

            try {
                await sendWelcomeEmail(res.data.email, res.data.fullName);
                toast.success("Account created! Check your email 📧");
            } catch (emailError) {
                toast.success("Account created successfully!");
            }
            
            return { success: true };
        } catch (error) {
            set({isSigningUp: false});
            const message = error.response?.data?.message || "Signup failed";
            toast.error(message);
            return { success: false, message };
        }
    },

    login:async(data)=>{
        set({isLoggingIn:true})
        try {
            const res = await axiosInstance.post("/auth/login",data);
            set({authUser:res.data, isLoggingIn: false});
            toast.success("Logged in successfully!");
            return { success: true };
        } catch (error) {
            set({isLoggingIn: false});
            const message = error.response?.data?.message || "Login failed";
            toast.error(message);
            return { success: false, message };
        }
    },

    logout:async()=>{
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser:null});
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error("Logout failed");
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data, isUpdatingProfile: false });
            toast.success("Profile updated successfully!");
            return { success: true };
        } catch (error) {
            set({ isUpdatingProfile: false });
            const message = error.response?.data?.message || "Update failed";
            toast.error(message);
            return { success: false, message };
        }
    },
}));
