import { useState } from 'react'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    password: ''
  })
  const [isLogin, setIsLogin] = useState(true)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const endpoint = isLogin ? 'login' : 'signup'
      const body = isLogin 
        ? { email: formData.email, password: formData.password }
        : formData

      const response = await fetch(`/api/auth/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(body)
      })

      const data = await response.json()
      
      if (response.ok) {
        setUser(data)
        setFormData({ fullname: '', email: '', password: '' })
      } else {
        alert(data.message)
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Something went wrong!')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (user) {
    return (
      <div className="app">
        <div className="chat-container">
          <h1>Welcome to Chat App, {user.fullname}! 🎉</h1>
          <p>Your account: {user.email}</p>
          <p>Chat functionality will be implemented next...</p>
          <button onClick={() => setUser(null)}>Logout</button>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <div className="auth-container">
        <h1>💬 Chat App</h1>
        <p>Connect • Chat • Share</p>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
          
          {!isLogin && (
            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
          )}
          
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>
        
        <p>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button 
            type="button" 
            onClick={() => setIsLogin(!isLogin)}
            className="link-button"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  )
}

export default App
