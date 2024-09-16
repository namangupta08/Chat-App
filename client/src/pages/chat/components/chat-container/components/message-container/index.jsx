import { apiClient } from "@/lib/api-client";
import { useAppStore } from "@/store";
import { GET_ALL_MESSAGES_ROUTE } from "@/utils/constants";
import moment from "moment";
import { useEffect, useRef } from "react";

const MessageContainer = () => {
  const {
    selectedChatType,
    selectedChatData,
    selectedChatMessages,
    setSelectedChatMessages,
  } = useAppStore();
  const scrollRef = useRef();

  useEffect(() => {
    const getMessages = async () => {
        try {
            const response = await apiClient.post(GET_ALL_MESSAGES_ROUTE,{id:selectedChatData._id},{withCredentials:true}) 
            if(response.data.messages){
                console.log("Fetched messages with timestamps in msg container:", response.data.messages);
                setSelectedChatMessages(response.data.messages)
            }
        } catch (error) {
            console.log(error)
        }
    }
    if(selectedChatData._id){
         if(selectedChatType === "contact"){
            getMessages();
         }
    }
  }, [selectedChatData, selectedChatType , setSelectedChatMessages]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessages]);

  const renderMessages = () => {
    let lastDate = null;
    return selectedChatMessages.map((message, index) => {
      const messageDate = moment(message.timeStamp).format("YYYY-MM-DD");
      const showDate = messageDate !== lastDate;
      lastDate = messageDate;
      return (
        <div key={index}>
          {showDate && (
            <div className=" text-center text-gray-500 my-2">
              {moment(message.timeStamp).format("LL")}
            </div>
          )}
          {selectedChatType == "contact" && renderDMMessages(message)}
        </div>
      );
    });
  };

  const renderDMMessages = (message) => {
    return (
      <div
        className={`${
          message.sender === selectedChatData._id ? "text-left" : "text-right"
        }`}
      >
        {message.messageType === "text" && (
          <div
            className={`${
              message.sender !== selectedChatData._id
                ? " bg-[#8417ff] text-[#ffffff] border-[#8417ff]/50 font-bold"
                : " bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20 font-bold"
            } border inline-block p-4 rounded my-1 max-w-[50%] break-words`}
            style={{
              borderRadius:
                message.sender === selectedChatData._id
                  ? "20px 20px 20px 0px" // Sender's message
                  : "20px 20px 0px 20px", // Receiver's message
            }}
          >
            {message.content}
          </div>
        )}
        <div className="text-xs text-gray-400">
          {moment(message.timeStamp).format("LT")}
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw]">
      {renderMessages()}
      <div ref={scrollRef} />
    </div>
  );
};

export default MessageContainer;
