import mongoose from "mongoose";

const messageSechema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  message: {
    type: String,
    required: true,
  }
}, { timestamps: true });
/**
 * timestamps: true:
 *   Mongoose 会自动为每个文档添加以下两个字段：
 *   字段名	    类型	 含义
 *   createdAt	Date	文档首次创建时间
 *   updatedAt	Date	文档最后更新时间
 * 
 * "createdAt": "2025-07-28T12:34:56.789Z"
 * "updatedAt": "2025-07-28T13:00:01.123Z"
 */

const Message = mongoose.model('Message', messageSechema);

export default Message;