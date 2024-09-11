
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
    const userInfo = useAppStore();

    useEffect(() => {
        if (userInfo && userInfo.userInfo && userInfo.userInfo.id) {
            socket.current = io(HOST, {
                withCredentials: true,
                query: { userId: userInfo.userInfo.id }
            });

            socket.current.on("connect", () => {
                console.log("Connected to socket server");
                console.log("UserInfo ID:", userInfo.userInfo.id); // Debug log
            });
        } else {
            console.log("UserInfo or userId is not available, socket connection not established.");
        }

        return () => {
            if (socket.current) {
                socket.current.disconnect();
            }
        };
    }, [userInfo]);

    return (
        <SocketContext.Provider value={socket.current}>
            {children}
        </SocketContext.Provider>
    );
};
