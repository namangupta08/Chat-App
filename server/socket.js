import { Server as SocketIOServer } from "socket.io";
import Message from "./models/MessagesModel.js";

const setupSocket = (server) => {
    const io = new SocketIOServer(server , {
        cors:{
            origin:process.env.ORIGIN,
            methods:["GET" , "POST"],
            credentials:true,
        },
    });

    const userSocketMap = new Map();

    const disconnect = (socket) => {
        console.log(`Client disconnected ${socket.id}`)
        for(const[userId , socketId] of userSocketMap.entries()){
            if(socketId === socket.id){
                userSocketMap.delete(userId);
                break;
            }
        }
    }

    const sendMessage = async (message) => {
        const senderSocketId = userSocketMap.get(message.sender)
        const recipientSocketId = userSocketMap.get(message.recipient);

        const createdMessage = await Message.create(message);

        const messageData = await Message.findById(createdMessage._id)
        .populate("sender" , "id email firstName lastName image color")
        .populate("recipient" , "id email firstName lastName image color")

        console.log("Message sent with timestamp:", messageData.timeStamp);

        if(recipientSocketId){
            io.to(recipientSocketId).emit("receiveMessage" , messageData)
        }
        if(senderSocketId){
            io.to(senderSocketId).emit("receiveMessage" , messageData)
        }


    }



    io.on("connection" , (socket) => {
        const userId = socket.handshake.query.userId;

        if(userId){
            userSocketMap.set(userId , socket.id)
            console.log(`User Connected ${userId} with socket id ${socket.id}`)
        }else{
            console.log("user id not provided during connection")
        }

        socket.on("sendMessage" , sendMessage)
        socket.on("disconnect" , () => disconnect(socket))
    })
}

export default setupSocket;