import { useAppStore } from "@/store"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import ContactsContainer from "./components/contacts-container"
import EmptyChatContainer from "./components/empty-chat-container"
import ChatContainer from "./components/chat-container"


const Chat = () => {

    const {userInfo , selectedChatType} = useAppStore();
    

    const navigate = useNavigate();

    useEffect(()=> {
        if (!userInfo.profileSetup) {
            toast("Please set up profile to continue");
            navigate("/profile");
          }
    } ,[userInfo , navigate])
  return (
    <div className="flex overflow-hidden h-[100vh] text-white">
     <ContactsContainer/>
     {
      selectedChatType === undefined ? <EmptyChatContainer/> : <ChatContainer/>
     }
    
    </div>
  )
}

export default Chat
