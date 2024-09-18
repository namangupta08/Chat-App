import { useAppStore } from "@/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import ContactsContainer from "./components/contacts-container";
import EmptyChatContainer from "./components/empty-chat-container";
import ChatContainer from "./components/chat-container";

const Chat = () => {
  const {
    userInfo,
    selectedChatType,
    isUploading,
    isDownloading,
    fileUploadProgress,
    fileDownloadProgress,
  } = useAppStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo.profileSetup) {
      toast("Please set up profile to continue");
      navigate("/profile");
    }
  }, [userInfo, navigate]);
  return (
    <div className="flex overflow-hidden h-[100vh] text-white">
    {
      isUploading && <div className="top-0 left-0 z-10 h-[100vh] w-[100vw] fixed bg-black/80 flex items-center justify-center flex-col gap-5 backdrop-blur-lg">
        <h5 className="text-5xl animate-pulse">Uploading file</h5>
        {fileUploadProgress}%
      </div>
    }
    {
      isDownloading && <div className="top-0 left-0 z-10 h-[100vh] w-[100vw] fixed bg-black/80 flex items-center justify-center flex-col gap-5 backdrop-blur-lg">
        <h5 className="text-5xl animate-pulse">Downloading file</h5>
        {fileDownloadProgress}%
      </div>
    }
      <ContactsContainer />
      {selectedChatType === undefined ? (
        <EmptyChatContainer />
      ) : (
        <ChatContainer />
      )}
    </div>
  );
};

export default Chat;
