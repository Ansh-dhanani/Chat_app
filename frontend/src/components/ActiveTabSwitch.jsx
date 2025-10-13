import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore'
import styles from '../styles/ActiveTabSwitch.module.css'

const ActiveTabSwitch = () => {
  const { activeTab, setActiveTab, isSoundEnabled } = useChatStore()
  const mouseClickSound = useRef(null)

  useEffect(() => {
    mouseClickSound.current = new Audio('/mouse-click.mp3')
    mouseClickSound.current.volume = 0.5
    mouseClickSound.current.load()
  }, [])

  const playClickSound = () => {
    if (!isSoundEnabled || !mouseClickSound.current) return
    try {
      mouseClickSound.current.currentTime = 0
      mouseClickSound.current.play().catch(() => {})
    } catch (error) {
      // Silently fail
    }
  }

  const handleTabChange = (tab) => {
    playClickSound()
    setActiveTab(tab)
  }

  return (
    <div className={styles.tabSwitch}>
      <div className={styles.tabContainer}>
        <div className={`${styles.tabIndicator} ${styles[activeTab]}`}></div>
        
        <button
          className={`${styles.tabButton} ${activeTab === 'chats' ? styles.active : ''}`}
          onClick={() => handleTabChange('chats')}
        >
          Chats
        </button>
        
        <button
          className={`${styles.tabButton} ${activeTab === 'contacts' ? styles.active : ''}`}
          onClick={() => handleTabChange('contacts')}
        >
          Contacts
        </button>
      </div>
    </div>
  )
}

export default ActiveTabSwitch