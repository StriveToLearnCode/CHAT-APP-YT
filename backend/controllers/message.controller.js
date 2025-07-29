import Conversation from "../models/conversation.models.js";
import Message from "../models/message.model.js";

export const getMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    }).populate("messages")
    // populate() 方法用于填充引用的文档
    console.log("conversation:", conversation);

    if (!conversation) {
      return res.status(200).json([]);
    }

    const messages = conversation.messages

    res.status(200).json(messages);
  } catch (error) {
    console.error("获取消息失败:", error.message);
    res.status(500).json({ message: "服务器错误，请稍后再试" });
  }
}


export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params; // 接收者ID
    const senderId = req.user._id; // 发送者ID

    let conversation = await Conversation.findOne({
      // $all 运算符,MongoDB 的一个查询操作符
      // 匹配数组字段，包含所有指定的元素（顺序不限）
      participants: { $all: [senderId, receiverId] }
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId]
      })
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    })

    if (newMessage) {
      conversation.messages.push(newMessage._id);
      // await conversation.save(); 
      // await newMessage.save();    
      // 使用 Promise.all() 方法可以并行执行多个异步操作，提高性能
      await Promise.all([conversation.save(), newMessage.save()])
    }

    res.status(201).json(newMessage);

  } catch (error) {
    console.error("发送消息失败:", error.message);
    res.status(500).json({ message: "服务器错误，请稍后再试" });
  }
}