import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
  try {
    const loginUserId = req?.user?._id;

    const filterMeUser = await User.find({ _id: { $ne: loginUserId } })
      .select("-password")
    // $ne 运算符，MongoDB 的一个查询操作符
    // 用于匹配不等于指定值的文档
    // select("-password") 用于排除密码字段
    res.status(200).json(filterMeUser);
  } catch (error) {
    console.error("获取用户失败:", error);
    res.status(500).json({ message: "服务器错误，请稍后再试" });
  }
} 