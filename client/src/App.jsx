
import { Navigate, Route, Routes } from 'react-router-dom'
import Auth from './pages/auth'
import Chat from './pages/chat'
import Profile from './pages/profile'
import {  useEffect, useState } from 'react'
import { useAppStore } from './store'
import { apiClient } from './lib/api-client'
import { GET_USER_INFO } from './utils/constants'

function App() {

  const {userInfo , setUserInfo} = useAppStore();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUserData = async () => {
      try {
         const response = await apiClient.get(GET_USER_INFO , {withCredentials:true})
         console.log(response)
      } catch (error) {
        console.log(error)
      }
    }

    if(!userInfo){
      getUserData();
    }else{
      setLoading(false);
    }

  } , [userInfo , setUserInfo])

  if(loading){
    return <div>loading...</div>
  }

  const PrivateRoute = ({children}) => {
    const {userInfo} = useAppStore();
    const isAuthenticated = !!userInfo
    return isAuthenticated ? children : <Navigate to='/auth'/>
  }

  const AuthRoute = ({children}) => {
    const {userInfo} = useAppStore();
    const isAuthenticated = !!userInfo
    return isAuthenticated ? <Navigate to='/chat'/> : children
  }


  return (
    <div>
      <Routes>
        <Route path='/auth' element={
          <AuthRoute>
            <Auth/>
          </AuthRoute>}>
        </Route>

        <Route path='/chat' element={
          <PrivateRoute>
            <Chat/>
          </PrivateRoute>
        }></Route>
        
        <Route path='/profile' element=
          { 
            <PrivateRoute>
             <Profile/>
            </PrivateRoute>
          }
        ></Route>
        
        <Route path='*' element={<Navigate to= '/auth'/>}></Route>
      </Routes>
    </div>
  )
}

export default App
