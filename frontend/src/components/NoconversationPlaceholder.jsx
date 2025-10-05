import React from 'react'
import { MessageCircle, Users, Zap, Shield, Heart, Sparkles } from 'lucide-react'
import styles from '../styles/NoconversationPlaceholder.module.css'

const NoconversationPlaceholder = () => {
  const features = [
    {
      icon: <Zap className={styles.featureIcon} />,
      title: 'Lightning Fast',
      description: 'Real-time messaging with instant delivery'
    },
    {
      icon: <Shield className={styles.featureIcon} />,
      title: 'Secure & Private',
      description: 'End-to-end encryption for your conversations'
    },
    {
      icon: <Users className={styles.featureIcon} />,
      title: 'Connect with Friends',
      description: 'Find and chat with people you care about'
    },
    {
      icon: <Heart className={styles.featureIcon} />,
      title: 'Beautiful Design',
      description: 'Clean, modern interface that feels great to use'
    }
  ]

  return (
    <div className={styles.placeholder}>
      <div className={styles.iconContainer}>
        <MessageCircle className={styles.mainIcon} />
        <Sparkles className={styles.decorativeIcon} />
        <Heart className={styles.decorativeIcon} />
        <Zap className={styles.decorativeIcon} />
      </div>
      
      <h2 className={styles.title}>
        Welcome to ChatFlow
      </h2>
      
      <p className={styles.subtitle}>
        Select a conversation from the sidebar to start chatting, or browse your contacts to begin a new conversation.
      </p>
      
      <div className={styles.features}>
        {features.map((feature, index) => (
          <div key={index} className={styles.feature}>
            {feature.icon}
            <div className={styles.featureTitle}>
              {feature.title}
            </div>
            <div className={styles.featureDescription}>
              {feature.description}
            </div>
          </div>
        ))}
      </div>
      
      <button className={styles.startButton}>
        Start Chatting
      </button>
    </div>
  )
}

export default NoconversationPlaceholder