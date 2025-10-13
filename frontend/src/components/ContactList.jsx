import React, { useState, useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore'
import { Search, Users, UserPlus, X } from 'lucide-react'
import { getInitials } from '../utils/helpers'
import styles from '../styles/ContactList.module.css'

const ContactList = () => {
  const { allContacts, conversations, setSelectedUser, getAllContacts, isUsersLoading, isSoundEnabled } = useChatStore()
  const [searchTerm, setSearchTerm] = useState('')
  const mouseClickSound = useRef(null)

  useEffect(() => {
    getAllContacts()
    
    // Load click sound
    mouseClickSound.current = new Audio('/mouse-click.mp3')
    mouseClickSound.current.volume = 0.5
    mouseClickSound.current.load()
  }, [getAllContacts])

  const playClickSound = () => {
    if (!isSoundEnabled || !mouseClickSound.current) return
    try {
      mouseClickSound.current.currentTime = 0
      mouseClickSound.current.play().catch(() => {})
    } catch (error) {
      // Silently fail
    }
  }

  const handleContactSelect = (contact) => {
    playClickSound()
    setSelectedUser(contact)
  }

  // Get IDs of users already in chat partners
  const chatPartnerIds = new Set(conversations.map(partner => partner._id))

  // Filter out users who are already chat partners
  const availableContacts = allContacts.filter(contact => !chatPartnerIds.has(contact._id))

  // Filter and sort contacts based on search relevance
  const filteredContacts = searchTerm.trim() === '' 
    ? availableContacts 
    : availableContacts
        .filter(contact => {
          const search = searchTerm.toLowerCase().trim()
          const name = contact.fullName?.toLowerCase() || ''
          const email = contact.email?.toLowerCase() || ''
          return name.includes(search) || email.includes(search)
        })
        .sort((a, b) => {
          const search = searchTerm.toLowerCase().trim()
          const aName = a.fullName?.toLowerCase() || ''
          const bName = b.fullName?.toLowerCase() || ''
          const aEmail = a.email?.toLowerCase() || ''
          const bEmail = b.email?.toLowerCase() || ''
          
          // Prioritize exact name matches
          if (aName === search) return -1
          if (bName === search) return 1
          
          // Then prioritize name starts with search
          const aNameStarts = aName.startsWith(search)
          const bNameStarts = bName.startsWith(search)
          if (aNameStarts && !bNameStarts) return -1
          if (!aNameStarts && bNameStarts) return 1
          
          // Then prioritize email starts with search
          const aEmailStarts = aEmail.startsWith(search)
          const bEmailStarts = bEmail.startsWith(search)
          if (aEmailStarts && !bEmailStarts) return -1
          if (!aEmailStarts && bEmailStarts) return 1
          
          // Finally, alphabetical order
          return aName.localeCompare(bName)
        })

  if (isUsersLoading) {
    return (
      <div className={styles.emptyState}>
        <Users className={styles.emptyIcon} />
        <p>Loading contacts...</p>
      </div>
    )
  }

  if (availableContacts.length === 0 && allContacts.length > 0) {
    return (
      <div className={styles.emptyState}>
        <Users className={styles.emptyIcon} />
        <p>All contacts are in your chats</p>
        <p>Check the Chats tab to message them</p>
      </div>
    )
  }

  if (allContacts.length === 0) {
    return (
      <div className={styles.emptyState}>
        <Users className={styles.emptyIcon} />
        <p>No contacts available</p>
        <p>Sign up more users to start chatting</p>
      </div>
    )
  }

  return (
    <div className={styles.contactList}>
      <div className={styles.searchContainer}>
        <Search className={styles.searchIcon} size={16} />
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search contacts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button 
            className={styles.clearButton}
            onClick={() => setSearchTerm('')}
            title="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {filteredContacts.map((contact) => (
        <div
          key={contact._id}
          className={styles.contactItem}
          onClick={() => handleContactSelect(contact)}
        >
          <div className={styles.contactAvatar}>
            {contact.profilePic ? (
              <img src={contact.profilePic} alt={contact.fullName} className={styles.avatarImage} />
            ) : (
              getInitials(contact.fullName)
            )}
            <span className={`${styles.statusIndicator} ${contact.isOnline ? styles.online : styles.offline}`}></span>
          </div>
          
          <div className={styles.contactInfo}>
            <div className={styles.contactName}>
              {contact.fullName}
            </div>
            <div className={styles.contactEmail}>
              {contact.email}
            </div>
          </div>
          
          <button 
            className={styles.addButton} 
            title="Start chat"
            onClick={(e) => {
              e.stopPropagation()
              handleContactSelect(contact)
            }}
          >
            <UserPlus size={16} />
          </button>
        </div>
      ))}

      {filteredContacts.length === 0 && searchTerm && (
        <div className={styles.emptyState}>
          <Search className={styles.emptyIcon} />
          <p>No contacts found</p>
          <p>Try a different search term</p>
        </div>
      )}
    </div>
  )
}

export default ContactList