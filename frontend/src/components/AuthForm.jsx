import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import logo from '../assets/logo.png';

export const AuthForm = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const { login, signup, isLoggingIn, isSigningUp } = useAuthStore();

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    setShowPassword(false); // Reset password visibility on tab change
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginData.email && loginData.password) {
      login(loginData);
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    if (signupData.fullName && signupData.email && signupData.password) {
      signup(signupData);
    }
  };

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignupChange = (e) => {
    setSignupData({
      ...signupData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="unified-auth-container">

      <div className="text-center mb-8">

        <div className="flex items-center justify-center mb-4">
          <img 
            src={logo} 
            alt="ChatFlow Logo" 
            className="w-9 h-9 object-contain"
          />
          <h1 className="text-2xl font-bold text-gray-900 ml-3">ChatFlow</h1>
        </div>
        <p className="text-gray-600">Sign in to your account or create a new one</p>
      </div>

      <div className={`auth-tabs mb-8 ${activeTab === 'signup' ? 'signup-active' : ''}`}>
        <button
          onClick={() => handleTabChange('login')}
          className={`tab-button ${activeTab === 'login' ? 'active' : ''}`}
        >
          Login
        </button>
        <button
          onClick={() => handleTabChange('signup')}
          className={`tab-button ${activeTab === 'signup' ? 'active' : ''}`}
        >
          Sign Up
        </button>
      </div>


      {activeTab === 'login' && (
        <form onSubmit={handleLoginSubmit} className="space-y-6">
                            <div>
                <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="input-icon" />
                  <input
                    type="email"
                    id="login-email"
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    className="auth-input"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="login-password"
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                    className="auth-input pr-12"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="input-icon-right"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="auth-submit-button"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? 'Signing In...' : 'Sign In'}
              </button>
            </form>
          )}


          {activeTab === 'signup' && (
            <form onSubmit={handleSignupSubmit} className="space-y-6">
              <div>
                <label htmlFor="signup-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="input-icon" />
                  <input
                    type="text"
                    id="signup-name"
                    name="fullName"
                    value={signupData.fullName}
                    onChange={handleSignupChange}
                    className="auth-input"
                    placeholder="Your full name"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="signup-email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="input-icon" />
                  <input
                    type="email"
                    id="signup-email"
                    name="email"
                    value={signupData.email}
                    onChange={handleSignupChange}
                    className="auth-input"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="signup-password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="signup-password"
                    name="password"
                    value={signupData.password}
                    onChange={handleSignupChange}
                    className="auth-input pr-12"
                    placeholder="Create a password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="input-icon-right"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="auth-submit-button"
                disabled={isSigningUp}
              >
                {isSigningUp ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>
          )}
    </div>
  );
};