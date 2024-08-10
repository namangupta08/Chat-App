import React from 'react'
import { Button } from './components/ui/button'
import { Navigate, Route, Routes } from 'react-router-dom'
import Auth from './pages/auth'
import Chat from './pages/chat'
import Profile from './pages/profile'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/auth' element={<Auth/>}></Route>
        <Route path='/chat' element={<Chat/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='*' element={<Navigate to= '/auth'/>}></Route>
      </Routes>
    </div>
  )
}

export default App
