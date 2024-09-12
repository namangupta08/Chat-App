
// import { useAppStore } from "@/store";
// import { HOST } from "@/utils/constants";
// import { createContext, useContext, useEffect, useRef } from "react";
// import { io } from "socket.io-client";

// const SocketContext = createContext(null);

// export const useSocket = () => {
//     return useContext(SocketContext);
// };

// export const SocketProvider = ({ children }) => {
//     const socket = useRef();
//     const userInfo = useAppStore();

//     useEffect(() => {
//         if (userInfo && userInfo.userInfo && userInfo.userInfo.id) {
//             socket.current = io(HOST, {
//                 withCredentials: true,
//                 query: { userId: userInfo.userInfo.id }
//             });

//             socket.current.on("connect", () => {
//                 console.log("Connected to socket server");
//                 console.log("UserInfo ID:", userInfo.id); // Debug log
//             });
//         } else {
//             console.log("UserInfo or userId is not available, socket connection not established.");
//         }

//         const handleReceiveMessage = (message) => {
//             const {selectedChatData , selectedChatType , addMessage} = useAppStore.getState();

//             if(
//                 selectedChatType !== undefined &&
//                 (selectedChatData._id === message.sender._id || 
//                  selectedChatData._id === message.recipient._id)
//             ){
//                 addMessage(message)
//             }
//         } 

//         socket.current.on("receiveMessage" , handleReceiveMessage)

//         return () => {
//             if (socket.current) {
//                 socket.current.disconnect();
//             }
//         };
//     }, [userInfo]);

//     return (
//         <SocketContext.Provider value={socket.current}>
//             {children}
//         </SocketContext.Provider>
//     );
// };

import { useAppStore } from "@/store";
import { HOST } from "@/utils/constants";
import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const socket = useRef();
    const { userInfo } = useAppStore(); // Destructure userInfo from store
    const userId = userInfo?.id; // Extract userId directly

    useEffect(() => {
        if (userId) {
            socket.current = io(HOST, {
                withCredentials: true,
                query: { userId }
            });

            socket.current.on("connect", () => {
                console.log("Connected to socket server");
                console.log("UserInfo ID:", userId); // Debug log
            });

            // Handle receiving messages
            const handleReceiveMessage = (message) => {
                const { selectedChatData, selectedChatType, addMessage } = useAppStore.getState();
                if (
                    selectedChatType !== undefined &&
                    (selectedChatData._id === message.sender._id ||
                        selectedChatData._id === message.recipient._id)
                ) {
                    console.log("msg recieved" , message)
                    addMessage(message);
                }
            };

            socket.current.on("receiveMessage", handleReceiveMessage);

            return () => {
                socket.current.off("receiveMessage", handleReceiveMessage); // Properly remove the handler
                socket.current.disconnect();
            };
        } else {
            console.log("UserInfo or userId is not available, socket connection not established.");
        }
    }, [userId]); // Dependency is only userId now

    return (
        <SocketContext.Provider value={socket.current}>
            {children}
        </SocketContext.Provider>
    );
};
