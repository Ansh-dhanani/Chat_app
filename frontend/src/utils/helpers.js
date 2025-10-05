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