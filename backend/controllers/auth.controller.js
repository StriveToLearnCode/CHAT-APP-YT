import User from "../models/user.model.js";
// bcryptjs 是一个用于加密密码的库
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (password !== confirmPassword) {
      // 状态码 400 表示客户端传来的参数、格式或内容有问题
      return res.status(400).json({ message: "密码不匹配" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ message: "用户名已存在" });
    }

    // 给密码加密
    // bcrypt.genSalt() 方法用于生成一个盐值，盐值是加密算法中的一个随机数，用于增加密码的安全性。
    // 如果不传参数，默认生成 10 位盐值。
    // 盐值越高，密码加密的安全性越高，但加密和验证的速度也会变慢。
    const salt = await bcrypt.genSalt(10);
    // bcrypt.hash() 方法用于对密码进行加密，第二个参数是盐值。
    const hashedPassword = await bcrypt.hash(password, salt);

    // 个人头像
    // https://avatar.iran.liara.run/public/girl?username=Maria
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    //在 Mongoose 中，new 操作符用于根据 Schema 创建一个文档实例，它并不会直接把数据存入数据库，而是先创建对象，之后你可以选择保存（save）它。
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === '女' ? girlProfilePic : boyProfilePic,
    })
    if (newUser) {
      // 创建JWT令牌
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();
      // 状态码 201 表示创建成功
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        profilePic: newUser.profilePic,
        username: newUser.username,
      })
    } else {
      // 状态码 400 表示请求错误
      res.status(400).json({ message: "无效的用户数据" });
    }
  } catch (error) {
    console.error("注册失败:", error);
    res.status(500).json({ message: "服务器错误，请稍后再试" });
  }

}
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 查找用户
    const user = await User.findOne({ username });
    const isCorrectPassword = await bcrypt.compare(password, user?.password || '');

    if (!user || !isCorrectPassword) {
      return res.status(400).json({ message: "用户名或密码错误" });
    }

    generateTokenAndSetCookie(user._id, res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      profilePic: user.profilePic,
      username: user.username,
    });

  } catch (error) {
    console.error("登录失败:", error);
    res.status(500).json({ message: "服务器错误，请稍后再试" });
  }
}
export const logout = (req, res) => {
  try {
    // 把 jwt 设为空字符串 + 立即过期，效果就是 清除客户端的 jwt Cookie。
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    res.status(200).json({ message: "登出成功" });
  } catch (error) {
    console.error("登出失败:", error);
    res.status(500).json({ message: "服务器错误，请稍后再试" });
  }
}