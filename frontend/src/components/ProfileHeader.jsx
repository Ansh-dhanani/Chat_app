import React, { useState, useRef } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { MoreHorizontal, LogOut, VolumeOffIcon, Volume2Icon, Camera, Loader } from 'lucide-react'
import { getInitials } from '../utils/helpers'
import styles from '../styles/ProfileHeader.module.css'
import { useChatStore } from '../store/useChatStore'
import toast from 'react-hot-toast'

const ProfileHeader = () => {
  const { authUser, logout, updateProfile, isUpdatingProfile } = useAuthStore()
  const { isSoundEnabled, toggleSound } = useChatStore()
  const [selectedImg, setSelectedImg] = useState(null)
  const fileInputRef = useRef(null)
  
  // Create audio reference for click sound
  const mouseClickSound = useRef(null)
  
  // Initialize audio on mount
  React.useEffect(() => {
    mouseClickSound.current = new Audio('/mouse-click.mp3')
    mouseClickSound.current.load()
  }, [])

  const fileImageUpload = async (e) => {
    const file = e.target.files[0]

    if(!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return;
    }

    const reader = new FileReader()
    reader.readAsDataURL(file)

    reader.onloadend = async () => {
      const base64Image = reader.result
      setSelectedImg(base64Image)
      await updateProfile({profilePic: base64Image})
    }

    reader.onerror = () => {
      toast.error('Failed to read image file');
    }
  }
  
  const handleSoundToggle = () => {
    // Play click sound if enabled
    if (isSoundEnabled) {
      mouseClickSound.current.currentTime = 0
      mouseClickSound.current.play().catch(() => {})
    }
    toggleSound()
  }

  const handleLogout = () => { 
    logout()
  }

  return (
    <div className={styles.profileHeader}>
      <div className={styles.avatarContainer}>
        <div 
          className={styles.avatar} 
          onClick={() => !isUpdatingProfile && fileInputRef.current?.click()}
          style={{ cursor: isUpdatingProfile ? 'not-allowed' : 'pointer' }}
        >
          {authUser?.profilePic ? (
            <img src={authUser.profilePic} alt="Profile" className={styles.avatarImage} />
          ) : (
            getInitials(authUser?.fullName)
          )}
          <div className={styles.avatarOverlay}>
            {isUpdatingProfile ? (
              <Loader size={20} className={styles.spinner} />
            ) : (
              <Camera size={20} />
            )}
          </div>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          onChange={fileImageUpload}
          accept="image/*"
          style={{ display: 'none' }}
          disabled={isUpdatingProfile}
        />
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
        onClick={handleSoundToggle}
        title={isSoundEnabled ? "Mute sounds" : "Enable sounds"}
      >
        {isSoundEnabled ? (
          <Volume2Icon size={16} />
        ) : (
          <VolumeOffIcon size={16} />
        )}
      </button>
      
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