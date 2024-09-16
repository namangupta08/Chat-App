import Message from "../models/MessagesModel.js";

export const getMessages = async (req, res, next) => {
  try {
    const user1 = req.userId;
    const user2 = req.body.id;

    if (!user1 || !user2) {
      return res.status(400).send("both user id are required");
    }

    const messages = await Message.find({
      $or: [
        { sender: user1, recipient: user2 },
        { sender: user2, recipient: user1 },
      ],
    }).sort({ timestamp: 1 });

    console.log("messages found: in messages contacts ", messages);

    return res.status(200).json({ messages });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};
