import { useAppStore } from '@/store'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

function Chat() {
  
  const {userInfo} = useAppStore();
  const navigate = useNavigate();

  useEffect(() => {
    if(!userInfo.profileSetup){
      toast('Please set up profile to continue')
      navigate('/profile')
    }
  },[userInfo , navigate])
  return (
    <div>
      chat
    </div>
  )
}

export default Chat
