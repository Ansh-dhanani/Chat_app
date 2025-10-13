import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'; 
import ProfileHeader from '../components/ProfileHeader';
import ActiveTabSwitch from '../components/ActiveTabSwitch';
import ChatList from '../components/ChatList';
import ContactList from '../components/ContactList';
import ChatContainer from '../components/ChatContainer';
import NoconversationPlaceholder from '../components/NoconversationPlaceholder';
import styles from '../styles/ChatPage.module.css';

export const ChatPage = () => {

  const {activeTab, selectedUser, getAllContacts, getMyChatPartners, refreshUserStatuses} = useChatStore();

  useEffect(() => {
    // Load all contacts when component mounts
    getAllContacts();
    getMyChatPartners();

    // Set up polling to refresh user statuses every 10 seconds
    const statusInterval = setInterval(() => {
      refreshUserStatuses();
    }, 10000); // 10 seconds

    // Cleanup interval on unmount
    return () => clearInterval(statusInterval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty deps - Zustand actions are stable and don't need to be in dependencies

  return (
    <div className={styles.chatPageContainer}>
      {/* left side */}
      <div className={styles.leftSidebar}>
        <ProfileHeader/>
        <ActiveTabSwitch/>

        <div className={styles.chatListContainer}>
          {activeTab==="chats"?<ChatList/>:<ContactList/>}
        </div>
      </div>
      
      {/* right side  */}
      <div className={`${styles.rightMainArea} ${selectedUser ? styles.active : ''}`}>
        {selectedUser?<ChatContainer/>:<NoconversationPlaceholder/>}
      </div>
    </div>
  );
}
