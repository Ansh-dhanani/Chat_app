import React, { useState, useRef, useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'
import { ArrowLeft, MoreVertical, Send, Trash2 } from 'lucide-react'
import { getInitials, formatMessageTime, getLastSeenText } from '../utils/helpers'
import styles from '../styles/ChatContainer.module.css'
import toast from 'react-hot-toast'

const ChatContainer = () => {
  const { selectedUser, messages, sendMessage, getMessages, isMessagesLoading, isSendingMessage, setSelectedUser, isSoundEnabled, deleteChat } = useChatStore()
  const { authUser } = useAuthStore()
  const [messageText, setMessageText] = useState('')
  const [showMenu, setShowMenu] = useState(false)
  const messagesEndRef = useRef(null)
  const menuRef = useRef(null)
  
  // Sound effects refs
  const keystrokeSounds = useRef([])
  const mouseClickSound = useRef(null)
  const currentKeystrokeIndex = useRef(0)

  // Initialize sound effects
  useEffect(() => {
    // Load multiple keystroke sounds for variety
    keystrokeSounds.current = [
      new Audio('/keystroke1.mp3'),
      new Audio('/keystroke2.mp3'),
      new Audio('/keystroke3.mp3'),
      new Audio('/keystroke4.mp3'),
    ]
    
    // Preload all keystroke sounds
    keystrokeSounds.current.forEach((sound, index) => {
      sound.volume = 0.3 // Lower volume for typing
      sound.load()
      
      sound.addEventListener('error', (e) => {
        console.error(`Error loading keystroke sound ${index + 1}:`, e)
      })
    })
    
    // Load mouse click sound
    mouseClickSound.current = new Audio('/mouse-click.mp3')
    mouseClickSound.current.volume = 0.5
    mouseClickSound.current.load()
    
    mouseClickSound.current.addEventListener('error', (e) => {
      console.error('Error loading mouse click sound:', e)
    })
  }, [])

  // Play keystroke sound
  const playKeystrokeSound = () => {
    if (!isSoundEnabled || keystrokeSounds.current.length === 0) return
    
    try {
      const sound = keystrokeSounds.current[currentKeystrokeIndex.current]
      if (!sound) return
      
      sound.currentTime = 0
      sound.play().catch(() => {})
      
      // Rotate through different keystroke sounds
      currentKeystrokeIndex.current = (currentKeystrokeIndex.current + 1) % keystrokeSounds.current.length
    } catch (error) {
      // Silently fail
    }
  }

  // Play mouse click sound
  const playClickSound = () => {
    if (!isSoundEnabled || !mouseClickSound.current) return
    
    try {
      mouseClickSound.current.currentTime = 0
      mouseClickSound.current.play().catch(() => {})
    } catch (error) {
      // Silently fail
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id)
    }
  }, [selectedUser, getMessages])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (messageText.trim() && selectedUser && !isSendingMessage) {
      playClickSound() // Play sound when sending
      const result = await sendMessage({ text: messageText })
      if (result.success) {
        setMessageText('')
        scrollToBottom()
      }
    }
  }

  const handleBack = () => {
    playClickSound()
    setSelectedUser(null)
  }

  const handleDeleteChat = async () => {
    if (!selectedUser) return
    
    const confirmed = window.confirm(`Are you sure you want to delete all messages with ${selectedUser.fullName}? This action cannot be undone.`)
    
    if (confirmed) {
      playClickSound()
      setShowMenu(false)
      
      const result = await deleteChat(selectedUser._id)
      if (result.success) {
        setSelectedUser(null)
      }
    }
  }

  const toggleMenu = () => {
    playClickSound()
    setShowMenu(!showMenu)
  }

  // Handle typing with sound
  const handleInputChange = (e) => {
    const newValue = e.target.value
    const oldValue = messageText
    
    // Only play sound if text was actually added (not deleted)
    if (newValue.length > oldValue.length) {
      playKeystrokeSound()
    }
    
    setMessageText(newValue)
  }

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
          {selectedUser.profilePic ? (
            <img src={selectedUser.profilePic} alt={selectedUser.fullName} className={styles.avatarImage} />
          ) : (
            getInitials(selectedUser.fullName)
          )}
          <span className={`${styles.statusIndicator} ${selectedUser.isOnline ? styles.online : styles.offline}`}></span>
        </div>
        
        <div className={styles.userInfo}>
          <div className={styles.userName}>
            {selectedUser.fullName}
          </div>
          <div className={styles.userEmail}>
            {selectedUser.isOnline ? 'Online' : getLastSeenText(selectedUser.lastSeen)}
          </div>
        </div>
        
        <div className={styles.chatActions} ref={menuRef}>
          <button 
            className={styles.actionButton} 
            title="More options"
            onClick={toggleMenu}
          >
            <MoreVertical size={18} />
          </button>
          
          {showMenu && (
            <div className={styles.dropdownMenu}>
              <button 
                className={styles.menuItem}
                onClick={handleDeleteChat}
              >
                <Trash2 size={16} />
                <span>Delete Chat</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Messages Container */}
      <div className={styles.messagesContainer}>
        {isMessagesLoading ? (
          <div className={styles.loadingState}>Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className={styles.emptyState}>No messages yet. Start the conversation!</div>
        ) : (
          messages.map((message) => (
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
                {message.image && (
                  <img src={message.image} alt="message attachment" className={styles.messageImage} />
                )}
              </div>
              <div className={styles.messageTime}>
                {formatMessageTime(message.createdAt)}
              </div>
            </div>
          ))
        )}
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
              onChange={handleInputChange}
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
            disabled={!messageText.trim() || isSendingMessage}
            title="Send message"
            onClick={playClickSound}
          >
            {isSendingMessage ? '...' : <Send size={18} />}
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatContainer