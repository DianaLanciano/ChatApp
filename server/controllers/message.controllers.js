import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    /* find the conversation that contains receiverId, senderId.
        If !conversation (first message sent) create new conversation */
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessageToPush = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessageToPush) {
      conversation.messages.push(newMessageToPush._id);
    }

    // await conversation.save();
    // await newMessageToPush.save();

    // this will run in parallel
    await Promise.all([conversation.save(), newMessageToPush.save()]);

    // socket here will send the message to the receiver 
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      // send the event to the specific user
      io.to(receiverSocketId).emit("newMessage", newMessageToPush);
    }

    res.status(201).json(newMessageToPush);
  } catch (error) {
    console.log("Error in send message", error.message);
    res
      .status(500)
      .json({ error: "Server error while trying to send a message" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages"); // the populate will get the message object and not only the reference - id

    let result;
    if (!conversation) {
      result = [];
    } else {
      result = conversation.messages;
    }
    
    res.status(200).json(result);
    
  } catch (error) {
    console.log("Error in get messages", error.message);
    res.status(500).json({ error: "Server error while trying get messages" });
  }
};
