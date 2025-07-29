import mongoose from "mongoose";

// Schema ---> 字段规则表
const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  gender: {
    type: String,
    enum: ['男', '女', '其他'],
    default: '其他',
  },
  profilePic: {
    type: String,
    default: '',
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;