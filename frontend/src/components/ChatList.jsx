import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import { MessageCircle } from 'lucide-react'
import styles from '../styles/ChatList.module.css'

const ChatList = () => {
  const { conversations, selectedUser, setSelectedUser, getMyChatPartners, isUsersLoading } = useChatStore()

  // TODO: Remove mock data and implement actual conversation fetching
  // TODO: Call getMyChatPartners() on component mount
  // TODO: Handle loading states and error states
  // TODO: Implement real-time conversation updates via WebSocket

  useEffect(() => {
    // TODO: Uncomment when backend is ready
    // getMyChatPartners()
  }, [])

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'
  }

  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now - date) / (1000 * 60 * 60)
    
    if (diffInHours < 1) {
      return 'now'
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h`
    } else {
      return date.toLocaleDateString()
    }
  }

  const handleChatSelect = (user) => {
    setSelectedUser(user)
  }

  // TODO: Replace with actual conversations from store
  const chatsToDisplay = conversations || []

  if (isUsersLoading) {
    return (
      <div className={styles.emptyState}>
        <MessageCircle className={styles.emptyIcon} />
        <p>Loading conversations...</p>
      </div>
    )
  }

  if (chatsToDisplay.length === 0) {
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
      {chatsToDisplay.map((chat) => (
        <div
          key={chat._id}
          className={`${styles.chatItem} ${
            selectedUser?._id === chat.participant._id ? styles.active : ''
          }`}
          onClick={() => handleChatSelect(chat.participant)}
        >
          <div className={styles.chatAvatar}>
            {getInitials(chat.participant.fullName)}
          </div>
          
          <div className={styles.chatInfo}>
            <div className={styles.chatName}>
              {chat.participant.fullName}
            </div>
            <div className={styles.lastMessage}>
              {chat.lastMessage?.text || 'No messages yet'}
            </div>
          </div>
          
          <div className={styles.chatMeta}>
            <div className={styles.timestamp}>
              {formatTime(chat.lastMessage?.createdAt)}
            </div>
            {chat.unreadCount > 0 && (
              <div className={styles.unreadBadge}>
                {chat.unreadCount}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default ChatList