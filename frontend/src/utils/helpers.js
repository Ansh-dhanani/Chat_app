/**
 * Shared utility functions for the chat application
 */

/**
 * Generate initials from a full name
 * @param {string} name - Full name
 * @returns {string} - Initials (e.g., "John Doe" -> "JD")
 */
export const getInitials = (name) => {
  return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'
}

/**
 * Format timestamp for display
 * @param {string} timestamp - ISO timestamp
 * @returns {string} - Formatted time
 */
export const formatTime = (timestamp) => {
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

/**
 * Format time for message display
 * @param {string} timestamp - ISO timestamp
 * @returns {string} - Formatted time (HH:MM)
 */
export const formatMessageTime = (timestamp) => {
  return new Date(timestamp).toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}

/**
 * Get last seen text for offline users
 * @param {string} lastSeen - ISO timestamp of last seen
 * @returns {string} - Formatted last seen text
 */
export const getLastSeenText = (lastSeen) => {
  if (!lastSeen) return 'Offline'
  
  const now = new Date()
  const lastSeenDate = new Date(lastSeen)
  const diffInMs = now - lastSeenDate
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
  
  if (diffInMinutes < 1) {
    return 'Last seen just now'
  } else if (diffInMinutes < 60) {
    return `Last seen ${diffInMinutes}m ago`
  } else if (diffInHours < 24) {
    return `Last seen ${diffInHours}h ago`
  } else if (diffInDays === 1) {
    return 'Last seen yesterday'
  } else if (diffInDays < 7) {
    return `Last seen ${diffInDays}d ago`
  } else {
    return `Last seen ${lastSeenDate.toLocaleDateString()}`
  }
}