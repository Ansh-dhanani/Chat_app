import React, { useState } from 'react'
import { useChatStore } from '../store/useChatStore'; 
import ProfileHeader from '../components/ProfileHeader';
import ActiveTabSwitch from '../components/ActiveTabSwitch';
import ChatList from '../components/ChatList';
import ContactList from '../components/ContactList';
import ChatContainer from '../components/ChatContainer';
import NoconversationPlaceholder from '../components/NoconversationPlaceholder';
import styles from '../styles/ChatPage.module.css';

export const ChatPage = () => {

  const {activeTab,selectedUser} = useChatStore();

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
