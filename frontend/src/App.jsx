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
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
          },
        }}
      />
    </>
  )
}

export default App;
