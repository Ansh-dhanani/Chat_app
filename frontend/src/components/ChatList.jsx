import React, { useEffect, useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import { MessageCircle, Search } from 'lucide-react'
import { getInitials, formatTime } from '../utils/helpers'
import styles from '../styles/ChatList.module.css'

const ChatList = () => {
  const { conversations, selectedUser, setSelectedUser, getMyChatPartners, isUsersLoading, isSoundEnabled } = useChatStore()
  const [searchQuery, setSearchQuery] = useState('')
  const mouseClickSound = useRef(null)

  useEffect(() => {
    getMyChatPartners()

    // Load click sound
    mouseClickSound.current = new Audio('/mouse-click.mp3')
    mouseClickSound.current.volume = 0.5
    mouseClickSound.current.load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Empty deps - Zustand actions are stable
  
  const playClickSound = () => {
    if (!isSoundEnabled || !mouseClickSound.current) return
    try {
      mouseClickSound.current.currentTime = 0
      mouseClickSound.current.play().catch(() => {})
    } catch (error) {
      // Silently fail
    }
  }

  const handleChatSelect = (user) => {
    playClickSound()
    setSelectedUser(user)
  }

  // Filter conversations based on search query
  const filteredConversations = conversations.filter((chat) => {
    const query = searchQuery.toLowerCase()
    const fullName = (chat.fullName || '').toLowerCase()
    const email = (chat.email || '').toLowerCase()
    return fullName.includes(query) || email.includes(query)
  })

  if (isUsersLoading) {
    return (
      <div className={styles.emptyState}>
        <MessageCircle className={styles.emptyIcon} />
        <p>Loading conversations...</p>
      </div>
    )
  }

  if (conversations.length === 0) {
    return (
      <div className={styles.emptyState}>
        <MessageCircle className={styles.emptyIcon} />
        <p>No conversations yet</p>
        <p>Start a new chat from contacts</p>
      </div>
    )
  }

  return (
    <div className={styles.chatList}>
      {/* Search Input */}
      <div className={styles.searchContainer}>
        <Search className={styles.searchIcon} size={18} />
        <input
          type="text"
          placeholder="Search chats..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      {/* Chat List */}
      {filteredConversations.length === 0 ? (
        <div className={styles.emptyState}>
          <MessageCircle className={styles.emptyIcon} />
          <p>No chats found</p>
        </div>
      ) : (
        filteredConversations.map((chat) => (
          <div
            key={chat._id}
            className={`${styles.chatItem} ${
              selectedUser?._id === chat._id ? styles.active : ''
            }`}
            onClick={() => handleChatSelect(chat)}
          >
            <div className={styles.chatAvatar}>
              {chat.profilePic ? (
                <img src={chat.profilePic} alt={chat.fullName} className={styles.avatarImage} />
              ) : (
                getInitials(chat.fullName)
              )}
              <span className={`${styles.statusIndicator} ${chat.isOnline ? styles.online : styles.offline}`}></span>
            </div>
            
            <div className={styles.chatInfo}>
              <div className={styles.chatName}>
                {chat.fullName}
              </div>
              <div className={styles.lastMessage}>
                {chat.email}
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default ChatList