import React, { useState, useRef, useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'
import { ArrowLeft, Phone, Video, MoreVertical, Send, Smile } from 'lucide-react'
import { getInitials, formatMessageTime } from '../utils/helpers'
import styles from '../styles/ChatContainer.module.css'

const ChatContainer = () => {
  const { selectedUser, messages, sendMessage } = useChatStore()
  const { authUser } = useAuthStore()
  const [messageText, setMessageText] = useState('')
  const messagesEndRef = useRef(null)

  // TODO: Remove mock messages and implement actual message fetching
  // TODO: Call getMessages(selectedUser._id) when user is selected
  // TODO: Implement real-time message updates via WebSocket
  // TODO: Add message status indicators (sent, delivered, read)
  // TODO: Add file/image upload functionality
  // TODO: Add emoji picker functionality

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // TODO: Fetch messages when selectedUser changes
    if (selectedUser) {
      // fetchMessages(selectedUser._id)
    }
  }, [selectedUser])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (messageText.trim() && selectedUser) {
      // TODO: Implement actual message sending
      // TODO: Add message to local state optimistically
      // TODO: Handle message sending errors and retry logic
      try {
        await sendMessage({ text: messageText, receiverId: selectedUser._id })
        setMessageText('')
      } catch (error) {
        // Error is already handled by toast in the store
        return // Don't clear input on error
      }
    }
  }

  const handleBack = () => {
    // TODO: Implement mobile navigation back to chat list
    // setSelectedUser(null)
  }

  // TODO: Replace with actual messages from store
  const messagesToDisplay = messages || []

  if (!selectedUser) {
    return null
  }

  return (
    <div className={styles.chatContainer}>
      {/* Chat Header */}
      <div className={styles.chatHeader}>
        <button className={styles.backButton} onClick={handleBack}>
          <ArrowLeft size={20} />
        </button>
        
        <div className={styles.userAvatar}>
          {getInitials(selectedUser.fullName)}
        </div>
        
        <div className={styles.userInfo}>
          <div className={styles.userName}>
            {selectedUser.fullName}
          </div>
          <div className={styles.userStatus}>
            <span className={styles.onlineIndicator}></span>
            Online
          </div>
        </div>
        
        <div className={styles.chatActions}>
          <button className={styles.actionButton} title="Voice call">
            <Phone size={18} />
          </button>
          <button className={styles.actionButton} title="Video call">
            <Video size={18} />
          </button>
          <button className={styles.actionButton} title="More options">
            <MoreVertical size={18} />
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className={styles.messagesContainer}>
        {messagesToDisplay.map((message) => (
          <div
            key={message._id}
            className={`${styles.messageGroup} ${
              message.senderId === authUser?._id ? styles.sent : styles.received
            }`}
          >
            <div
              className={`${styles.message} ${
                message.senderId === authUser?._id ? styles.sent : styles.received
              }`}
            >
              {message.text}
            </div>
            <div className={styles.messageTime}>
              {formatMessageTime(message.createdAt)}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className={styles.inputContainer}>
        <form className={styles.inputForm} onSubmit={handleSendMessage}>
          <div className={styles.messageInputWrapper}>
            <textarea
              className={styles.messageInput}
              placeholder="Type a message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage(e)
                }
              }}
              rows={1}
            />
          </div>
          
          <button
            type="submit"
            className={styles.sendButton}
            disabled={!messageText.trim()}
            title="Send message"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatContainer