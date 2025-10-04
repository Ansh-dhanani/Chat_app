import {create} from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useAuthStore = create((set)=>({
    authUser : null,
    isCheckingAuth:true,
    isSigningUp:false,

    checkAuth :async ()=>{
        try {
            console.log("Checking auth...");
            const res = await axiosInstance.get("/auth/check")
            console.log("Auth check response:", res.data);
            
            // Check if response is valid user data (not HTML)
            if (res.data && typeof res.data === 'object' && res.data._id) {
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
            toast.success("Account Cretaed Sucessfully!")

        } catch (error) {
            toast.error(error.response.data.message);
        } finally{
            set({isSigningUp:false})
        }
    }
}));