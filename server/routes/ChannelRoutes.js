import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { createChannel, getChannelMessages, getUserChannels } from "../controllers/ChannelController.js";

const channelRoute = Router();

channelRoute.post("/create-channel" , verifyToken , createChannel)
channelRoute.get("/get-user-channel" , verifyToken , getUserChannels)
channelRoute.get("/get-channel-messages/:channelId" , verifyToken , getChannelMessages)

export default channelRoute; 