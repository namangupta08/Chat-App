import { Server as SocketIOServer } from "socket.io";
import Message from "./models/MessagesModel.js";

const setupSocket = (server) => {
    const io = new SocketIOServer(server, {
        cors: {
            origin: process.env.ORIGIN,
            methods: ["GET", "POST"],
            credentials: true,
        }
    });

    const userSocketMap = new Map();

    const disconnect = (socket) => {
        console.log(`Client disconnected: ${socket.id}`);
        for (const [userId, socketId] of userSocketMap.entries()) {
            if (socketId === socket.id) {
                userSocketMap.delete(userId);
                break;
            }
        }
    };

    const sendMessage = async (message) => {
        const senderSocketId = userSocketMap.get(message.sender);
        const recipientSocketId = userSocketMap.get(message.recipient)

        const createdMessage = await Message.create(message)
                                .populate("sender" , "id email firstName lastName image color")
                                .populate("recipient" , "id email firstName lastName image color")
        
        if(recipientSocketId){
            io.to(recipientSocketId).emit("receiveMessage" , messageData);
        }

        if(senderSocketId){
            io.to(recipientSocketId).emit("receiveMessage" , messageData);
        }
    }


    

    io.on("connection", (socket) => {
        console.log("New connection:", socket.id);
        console.log("Socket handshake query:", socket.handshake.query);

        const userId = socket.handshake.query.userId;
        console.log("Received connection with userId:", userId); // Ensure this is correct

        if (userId && userId !== 'undefined') {
            userSocketMap.set(userId, socket.id);
            console.log(`User Connected ${userId} with socket id ${socket.id}`);
        } else {
            console.log("Valid user id not provided during connection");
        }


        socket.on("sendMessage" , sendMessage)

        socket.on("disconnect", () => disconnect(socket));
    });
};

export default setupSocket;
