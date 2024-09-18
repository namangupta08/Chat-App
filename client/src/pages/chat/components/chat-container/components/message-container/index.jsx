import { apiClient } from "@/lib/api-client";
import { useAppStore } from "@/store";
import { GET_ALL_MESSAGES_ROUTE, GET_CHANNEL_MESSAGES, HOST } from "@/utils/constants";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { MdFolderZip } from "react-icons/md";
import { IoMdArrowRoundDown } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { getColor } from "@/lib/utils";
import { AvatarFallback } from "@/components/ui/avatar";

const MessageContainer = () => {
  const {
    selectedChatType,
    selectedChatData,
    selectedChatMessages,
    setSelectedChatMessages,
    setFileDownloadProgress,
    setIsDownloading,
    userInfo,
  } = useAppStore();

  const [showImage, setshowImage] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const scrollRef = useRef();

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await apiClient.post(
          GET_ALL_MESSAGES_ROUTE,
          { id: selectedChatData._id },
          { withCredentials: true }
        );
        if (response.data.messages) {
          console.log(
            "Fetched messages with timestamps in msg container:",
            response.data.messages
          );
          setSelectedChatMessages(response.data.messages);
        }
      } catch (error) {
        console.log(error);
      }
    };

    const getChannelMessages = async () => {
      try {
        const response = await apiClient.get(
          `${GET_CHANNEL_MESSAGES}/${selectedChatData._id}`,
          
          { withCredentials: true }
        );
        if (response.data.messages) {
          console.log(
            "Fetched messages with timestamps in msg container:",
            response.data.messages
          );
          setSelectedChatMessages(response.data.messages);
        }
      } catch (error) {
        console.log(error);
      }
    }




    if (selectedChatData._id) {
      if (selectedChatType === "contact") {
        getMessages();
      }else if(selectedChatType === "channel"){
        getChannelMessages();
      }
    }
  }, [selectedChatData, selectedChatType, setSelectedChatMessages]);

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
          {selectedChatType == "channel" && renderChannelMessages(message)}
        </div>
      );
    });
  };

  const checkIfImage = (filePath) => {
    const imageRegex =
      /\.(jpg|jpeg|png|gif|bmp|tiff|tif|webp|svg|ico|heic|heif)$/i;

    console.log("chec if img");

    return imageRegex.test(filePath);
  };

  const downloadFile = async (url) => {
    setIsDownloading(true);
    setFileDownloadProgress(0);
    const response = await apiClient.get(`${HOST}/${url}`, {
      responseType: "blob",
      onDownloadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        // console.log("message container loaded" , loaded)
        // console.log("message container total" , total)

        const percentCompleted = Math.round((loaded * 100) / total);
        setFileDownloadProgress(percentCompleted);
      },
    });

    const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = urlBlob;
    link.setAttribute("download", url.split("/").pop());
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(urlBlob);
    setIsDownloading(false);
    setFileDownloadProgress(0);
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
        {message.messageType === "file" && (
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
            {checkIfImage(message.fileUrl) ? (
              <div
                className=" cursor-pointer"
                onClick={() => {
                  setshowImage(true);
                  setImageUrl(message.fileUrl);
                }}
              >
                <img
                  src={`${HOST}/${message.fileUrl}`}
                  height={300}
                  width={300}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center gap-5">
                <span
                  className=" text-white/80 text-3xl bg-black/20 rounded-full
               p-3"
                >
                  <MdFolderZip />
                </span>
                <span>{message.fileUrl.split("/").pop()}</span>
                <span
                  className="p-3 rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300 bg-black/20 text-2xl"
                  onClick={() => downloadFile(message.fileUrl)}
                >
                  <IoMdArrowRoundDown />
                </span>
              </div>
            )}
          </div>
        )}
        <div className="text-xs text-gray-400">
          {moment(message.timeStamp).format("LT")}
        </div>
      </div>
    );
  };

  const renderChannelMessages = (message) => {
    return (
      <div
        className={`mt-5 ${
          message.sender._id !== userInfo.id ? " text-left" : "text-right"
        } `}
      >
        {message.messageType === "text" && (
          <div
            className={`${
              message.sender._id === userInfo.id
                ? " bg-[#8417ff] text-[#ffffff] border-[#8417ff]/50 font-bold"
                : " bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20 font-bold"
            } border inline-block p-4 rounded my-1 max-w-[50%] break-words ml-11`}
            style={{
              borderRadius:
                message.sender._id !== userInfo.id
                  ? "20px 20px 20px 0px" // Sender's message
                  : "20px 20px 0px 20px", // Receiver's message
            }}
          >
            {message.content}
          </div>
        )}

        {message.messageType === "file" && (
          <div
            className={`${
              message.sender._id === userInfo.id
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
            {checkIfImage(message.fileUrl) ? (
              <div
                className=" cursor-pointer"
                onClick={() => {
                  setshowImage(true);
                  setImageUrl(message.fileUrl);
                }}
              >
                <img
                  src={`${HOST}/${message.fileUrl}`}
                  height={300}
                  width={300}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center gap-5">
                <span
                  className=" text-white/80 text-3xl bg-black/20 rounded-full
               p-3"
                >
                  <MdFolderZip />
                </span>
                <span>{message.fileUrl.split("/").pop()}</span>
                <span
                  className="p-3 rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300 bg-black/20 text-2xl"
                  onClick={() => downloadFile(message.fileUrl)}
                >
                  <IoMdArrowRoundDown />
                </span>
              </div>
            )}
          </div>
        )}
        {message.sender._id !== userInfo.id ? (
          <div className="flex items-center justify-start gap-3">
            <Avatar className="h-8 w-8 rounded-full overflow-hidden">
              {message.sender.image && (
                <AvatarImage
                  src={`${HOST}/${message.sender.image}`}
                  alt="profile"
                  className="object-cover w-full h-full bg-black rounded-full"
                  getColor
                />
              )}

              <AvatarFallback
                className={`h-8 w-8 uppercase text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(
                  message.sender.color
                )}`}
              >
                {message.sender.firstName
                  ? message.sender.firstName.split("").shift()
                  : message.sender.email.split("").shift()}
              </AvatarFallback>
             
            </Avatar>
            <span className="text-sm text-white/60">{`${message.sender.firstName} ${message.sender.lastName}`}</span>
            <span className="text-xs text-white/60">{moment(message.timeStamp).format("LT")}</span>
          </div>
        ) : (
          <div className="text-xs text-white/60 mt-1">{moment(message.timeStamp).format("LT")}</div>
        )}
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw]">
      {renderMessages()}
      <div ref={scrollRef} />
      {showImage && (
        <div className="fixed z-[1000] top-0 left-0 h-[100vh] w-[100vw] flex items-center justify-center backdrop-blur-lg flex-col">
          <div>
            <img
              className="h-[80vh] w-full bg-cover"
              src={`${HOST}/${imageUrl}`}
            />
          </div>

          <div className="flex gap-5 fixed top-0 mt-5">
            <button className="p-3 rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300 bg-black/20 text-2xl">
              <IoMdArrowRoundDown onClick={() => downloadFile(imageUrl)} />
            </button>

            <button className="p-3 rounded-full hover:bg-black/50 cursor-pointer transition-all duration-300 bg-black/20 text-2xl">
              <IoCloseSharp
                onClick={() => {
                  setshowImage(false);
                  setImageUrl(null);
                }}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageContainer;
