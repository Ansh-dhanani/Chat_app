import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
    allContacts: [],
    conversations: [],
    messages: [],
    activeTab: "chats",
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    isSendingMessage: false,
    isSoundEnabled: localStorage.getItem("isSoundEnabled") === "true",

    toggleSound: () => {
        const newState = !get().isSoundEnabled;
        localStorage.setItem("isSoundEnabled", newState.toString());
        set({ isSoundEnabled: newState });
    },

    setActiveTab: (tab) => set({ activeTab: tab }),
    
    setSelectedUser: (selectedUser) => {
        set({ selectedUser });
        if (selectedUser) {
            get().getMessages(selectedUser._id);
        }
    },

    getAllContacts: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/contacts");
            set({ allContacts: res.data.users || res.data });
        } catch (error) {
            console.error("Error fetching contacts:", error);
            toast.error(error.response?.data?.message || "Failed to fetch contacts");
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMyChatPartners: async () => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/messages/chats");
            set({ conversations: res.data.chatPartners || res.data });
        } catch (error) {
            console.error("Error fetching chat partners:", error);
            toast.error(error.response?.data?.message || "Failed to fetch conversations");
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            
            const messages = res.data.messages || res.data || [];
            set({ messages });
        } catch (error) {
            console.error("Error fetching messages:", error);
            toast.error(error.response?.data?.message || "Failed to fetch messages");
            set({ messages: [] });
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        if (!selectedUser) {
            return { success: false };
        }

        set({ isSendingMessage: true });
        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
            
            // Add the new message to the messages array
            const newMessage = res.data.newMessage;
            set({ messages: [...messages, newMessage] });
            
            // Also update conversations to show this user in chat partners
            get().getMyChatPartners();
            
            return { success: true };
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error(error.response?.data?.message || error.response?.data?.error || "Failed to send message");
            return { success: false };
        } finally {
            set({ isSendingMessage: false });
        }
    },

    deleteChat: async (userId) => {
        try {
            await axiosInstance.delete(`/messages/${userId}`);
            
            // Clear messages if this chat is currently selected
            const { selectedUser } = get();
            if (selectedUser && selectedUser._id === userId) {
                set({ messages: [] });
            }
            
            // Refresh chat partners list
            await get().getMyChatPartners();
            
            toast.success("Chat deleted successfully");
            return { success: true };
        } catch (error) {
            console.error("Error deleting chat:", error);
            toast.error(error.response?.data?.error || "Failed to delete chat");
            return { success: false };
        }
    },

    // Refresh user statuses to keep online/offline status updated
    refreshUserStatuses: async () => {
        try {
            const { activeTab, selectedUser, allContacts, conversations } = get();
            
            // Refresh contacts if on contacts tab
            if (activeTab === "contacts") {
                const res = await axiosInstance.get("/messages/contacts");
                const updatedContacts = res.data.users || res.data;
                set({ allContacts: updatedContacts });
                
                // Update selected user if they're in contacts
                if (selectedUser) {
                    const updatedSelectedUser = updatedContacts.find(
                        user => user._id === selectedUser._id
                    );
                    if (updatedSelectedUser) {
                        set({ selectedUser: updatedSelectedUser });
                    }
                }
            }
            
            // Refresh chat partners if on chats tab
            if (activeTab === "chats") {
                const res = await axiosInstance.get("/messages/chats");
                const updatedPartners = res.data.chatPartners || res.data;
                set({ conversations: updatedPartners });
                
                // Update selected user if they're in the chat partners
                if (selectedUser) {
                    const updatedSelectedUser = updatedPartners.find(
                        user => user._id === selectedUser._id
                    );
                    if (updatedSelectedUser) {
                        set({ selectedUser: updatedSelectedUser });
                    }
                }
            }
            
            // Also update selected user from the appropriate list even if viewing chat
            if (selectedUser && !activeTab) {
                // Try to find in conversations first
                let updatedUser = conversations.find(user => user._id === selectedUser._id);
                
                // If not found, try contacts
                if (!updatedUser) {
                    updatedUser = allContacts.find(user => user._id === selectedUser._id);
                }
                
                // If found, fetch fresh data
                if (updatedUser) {
                    set({ selectedUser: updatedUser });
                } else {
                    // Fetch fresh user data from contacts API
                    try {
                        const res = await axiosInstance.get("/messages/contacts");
                        const contacts = res.data.users || res.data;
                        const freshUser = contacts.find(user => user._id === selectedUser._id);
                        if (freshUser) {
                            set({ selectedUser: freshUser });
                        }
                    } catch (err) {
                        // Silent fail
                    }
                }
            }
        } catch (error) {
            // Silently fail - this is a background refresh
        }
    },
}));

