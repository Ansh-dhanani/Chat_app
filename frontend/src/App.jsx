import React from 'react'
import { Route, Routes } from 'react-router';
import { ChatPage } from './pages/ChatPage';
import { LoginPage } from './pages/LoginPage';
import { SignUpPage } from './pages/SignUpPage';
import { useAuthStore } from './store/useAuthStore';

function App() {
  const {authUser,login,isLoggedIn} = useAuthStore();
  console.log("auth user: ",authUser);
  console.log("isLoggedIn",isLoggedIn);
  
  return (
    <>
      <div className="absolute w-full h-screen z-[-1] ">
        <div
          className="absolute inset-0  bg-gradient-to-br from-stone-200 via-pink-500 to-black"
          style={{
            backgroundImage: `
            linear-gradient(to bottom right, 
              #e7e5e4 0%, 
              #f5d0fe 1%,
              #ec4899 30%,
              #dc2626 50%,
              #7f1d1d 70%,
              #000000 100%
            ),
            url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.35'/%3E%3C/svg%3E")
          `,
            backgroundBlendMode: "overlay",
          }}
        >
           <button onClick={login}> button</button>
      </div>
      <Routes>
        <Route path="/" element={<ChatPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path="/signup" element={<SignUpPage/>}/>
      </Routes>
      </div>
    </>
  )
}

export default App;
