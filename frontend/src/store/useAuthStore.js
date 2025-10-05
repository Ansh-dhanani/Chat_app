import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import { sendWelcomeEmail } from '../lib/emailService';
import toast from 'react-hot-toast';

export const useAuthStore = create((set)=>({
    authUser : null,
    isCheckingAuth:true,
    isSigningUp:false,
    isLoggingIn:false,

    checkAuth :async ()=>{
        try {
            console.log("Checking auth...");
            const res = await axiosInstance.get("/auth/check")
            console.log("Auth check response:", res.data);
            
            // Check if response is valid user data (not HTML)
            if (res.data && typeof res.data === 'object' && !res.data.message && (res.data._id || res.data.id)) {
                set({authUser:res.data})
            } else {
                // If we get HTML or invalid data, user is not authenticated
                console.log("Invalid auth response (likely HTML), setting authUser to null");
                set({authUser:null})
            }
        } catch (error) {
            console.log("Error in authCheck:",error)
            set({authUser:null})
        } finally{
            set({isCheckingAuth:false});
        }
    },

    signup:async(data)=>{
        set({isSigningUp:true})
        try {
            const res = await axiosInstance.post("/auth/signup",data);
            set({authUser:res.data});

            // Send welcome email from frontend (EmailJS works better here)
            try {
                console.log("📧 Attempting to send welcome email...");
                const emailResult = await sendWelcomeEmail(res.data.email, res.data.fullName);
                
                if (emailResult.success) {
                    console.log("✅ Welcome email sent successfully");
                    toast.success("Account created! Check your email for a welcome message 📧");
                } else {
                    console.warn("⚠️ Welcome email failed:", emailResult.error);
                    toast.success("Account created successfully!");
                    toast.error(`Failed to send welcome email: ${emailResult.error}`);
                }
            } catch (emailError) {
                console.warn("⚠️ Welcome email failed with exception:", emailError);
                toast.success("Account created successfully!");
                toast.error("Failed to send welcome email");
            }

        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed. Please try again.");
        } finally{
            set({isSigningUp:false})
        }
    },

    login:async(data)=>{
        set({isLoggingIn:true})
        try {
            const res = await axiosInstance.post("/auth/login",data);
            set({authUser:res.data});
            toast.success("Logged in successfully!")

        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed. Please try again.");
        } finally{
            set({isLoggingIn:false})
        }
    },

    logout:async()=>{
        try {
            const res = await axiosInstance.post("/auth/logout");
            set({authUser:null});
            toast.success("Logged out successfully!")
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed. Please try again.");
        }
    }
}));