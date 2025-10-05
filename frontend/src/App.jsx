import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router';
import { ChatPage } from './pages/ChatPage';
import { AuthPage } from './pages/AuthPage';
import { useAuthStore } from './store/useAuthStore';
import PageLoader from './components/PageLoader';
import toast, { Toaster } from 'react-hot-toast';
function App() {
  const { checkAuth, authUser, isCheckingAuth } = useAuthStore();
  
  useEffect(() => {
    checkAuth();
    console.log("checking...")
  }, []);

  console.log("App render - authUser:", authUser, "isCheckingAuth:", isCheckingAuth);

  if (isCheckingAuth ) {
    return (
      <PageLoader/> 
    );
  }

  return (
    <>
      {/* Background gradient with noise texture */}
      <div className="app-background" />
      
      {/* Main app container */}
      <div className="app-container">
        <div className="page-content">
          <Routes>
            <Route path="/" element={authUser ? <ChatPage /> : <Navigate to="/auth" replace />} />
            <Route path="/auth" element={!authUser ? <AuthPage /> : <Navigate to="/" replace />} />
            <Route path="/login" element={<Navigate to="/auth" replace />} />
            <Route path="/signup" element={<Navigate to="/auth" replace />} />
          </Routes>
        </div>
      </div>
      
      {/* Toast notifications */}
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#ffffff',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), 0 4px 16px rgba(0, 0, 0, 0.05)',
            color: '#1e293b',
            fontFamily: "'PP Neue Montreal', sans-serif",
            fontWeight: '500',
            fontSize: '14px',
            padding: '12px 16px',
            maxWidth: '400px',
            textAlign: 'center',
          },
          success: {
            style: {
              background: '#ffffff',
              borderColor: '#10b981',
              color: '#059669',
            },
            iconTheme: {
              primary: '#10b981',
              secondary: '#ffffff',
            },
          },
          error: {
            style: {
              background: '#ffffff',
              borderColor: '#ef4444',
              color: '#dc2626',
            },
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff',
            },
          },
        }}
      />
    </>
  )
}

export default App;
