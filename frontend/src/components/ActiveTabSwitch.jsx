import React from 'react'
import { useChatStore } from '../store/useChatStore'
import styles from '../styles/ActiveTabSwitch.module.css'

const ActiveTabSwitch = () => {
  const { activeTab, setActiveTab } = useChatStore()

  return (
    <div className={styles.tabSwitch}>
      <div className={styles.tabContainer}>
        <div className={`${styles.tabIndicator} ${styles[activeTab]}`}></div>
        
        <button
          className={`${styles.tabButton} ${activeTab === 'chats' ? styles.active : ''}`}
          onClick={() => setActiveTab('chats')}
        >
          Chats
        </button>
        
        <button
          className={`${styles.tabButton} ${activeTab === 'contacts' ? styles.active : ''}`}
          onClick={() => setActiveTab('contacts')}
        >
          Contacts
        </button>
      </div>
    </div>
  )
}

export default ActiveTabSwitch