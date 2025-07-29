import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt; // 从Cookie中获取JWT令牌
    if (!token) {
      return res.status(401).json({ message: "未授权，请登录" });
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    if (!decoded) {
      return res.status(401).json({ message: "无效的令牌，请重新登录" });
    }
    const user = await User.findById(decoded.userId).select('-password'); // 

    if (!user) {
      return res.status(404).json({ message: "用户不存在" });
    }
    req.user = user; // 将用户信息存储在请求对象中
    next(); // 继续处理请求
  } catch (error) {
    console.error("验证令牌失败:", error);
    return res.status(500).json({ message: "服务器错误，请稍后再试" });
  }
}


export default protectRoute;