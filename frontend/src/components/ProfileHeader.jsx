import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { MoreHorizontal, LogOut } from 'lucide-react'
import styles from '../styles/ProfileHeader.module.css'

const ProfileHeader = () => {
  const { authUser, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
  }

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'
  }

  return (
    <div className={styles.profileHeader}>
      <div className={styles.avatar}>
        {getInitials(authUser?.fullName)}
      </div>
      
      <div className={styles.userInfo}>
        <div className={styles.userName}>
          {authUser?.fullName || 'User'}
        </div>
        <div className={styles.userStatus}>
          <span className={styles.statusDot}></span>
          Online
        </div>
      </div>
      
      <button 
        className={styles.menuButton}
        onClick={handleLogout}
        title="Logout"
      >
        <LogOut size={16} />
      </button>
    </div>
  )
}

export default ProfileHeader