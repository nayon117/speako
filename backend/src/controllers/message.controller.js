import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";


export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const filteredUsers = await User.find({ _id: {$ne:loggedInUser} }).select("-password");

    return res.status(200).json(filteredUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getMessages = async (req, res) => {
  try {
    const { id:userToChatId } = req.params;
    const myId = req.user._id;
    const messages = await Message.find({
      $or:[
        { myId:myId, receiverId:userToChatId },
        { myId:userToChatId ,receiverId:myId}
      ]
    })
    res.status(200).json(messages);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const sendMessage = async (req, res) => {
  try {
    const {text,image} = req.body;
    const { id:receiverId } = req.params;
    const senderId = req.user._id;

    let imageUrl; 
    if(image){
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image:imageUrl
    });

    await newMessage.save();
    // todo: real time message sending
    res.status(200).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
