import React, { useState, useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import { Search, Users, UserPlus } from 'lucide-react'
import styles from '../styles/ContactList.module.css'

const ContactList = () => {
  const { onlineUsers, setSelectedUser, getAllContacts, isUsersLoading } = useChatStore()
  const [searchTerm, setSearchTerm] = useState('')

  // TODO: Remove mock data and implement actual contact fetching
  // TODO: Call getAllContacts() on component mount
  // TODO: Implement real-time online status updates via WebSocket
  // TODO: Add contact management features (add/remove contacts)

  useEffect(() => {
    // TODO: Uncomment when backend is ready
    // getAllContacts()
  }, [])

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'
  }

  const handleContactSelect = (contact) => {
    // TODO: Check if conversation exists, if not create new conversation
    setSelectedUser(contact)
  }

  // TODO: Replace with actual contacts from store
  const contactsToDisplay = onlineUsers || []

  const filteredContacts = contactsToDisplay.filter(contact =>
    contact.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isUsersLoading) {
    return (
      <div className={styles.emptyState}>
        <Users className={styles.emptyIcon} />
        <p>Loading contacts...</p>
      </div>
    )
  }

  if (contactsToDisplay.length === 0) {
    return (
      <div className={styles.emptyState}>
        <Users className={styles.emptyIcon} />
        <p>No contacts available</p>
        <p>Add friends to start chatting</p>
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
      </div>

      {filteredContacts.map((contact) => (
        <div
          key={contact._id}
          className={styles.contactItem}
          onClick={() => handleContactSelect(contact)}
        >
          <div className={styles.contactAvatar}>
            {getInitials(contact.fullName)}
          </div>
          
          <div className={styles.contactInfo}>
            <div className={styles.contactName}>
              {contact.fullName}
            </div>
            <div className={styles.contactStatus}>
              <span className={contact.isOnline ? styles.onlineIndicator : styles.offlineIndicator}></span>
              {contact.isOnline ? 'Online' : 'Offline'}
            </div>
          </div>
          
          <button className={styles.addButton} title="Start chat">
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