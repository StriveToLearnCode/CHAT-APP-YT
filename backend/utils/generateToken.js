// 创建JWT令牌,并存储到Cookie中
import jwt from 'jsonwebtoken';


// res 是 Express 的响应对象
const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '15d', // 令牌有效期为30天
  })

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true, // 只能通过 HTTP 请求访问，不能通过 JavaScript 访问,预防 XSS 攻击(跨站脚本攻击)
    sameSite: 'strict', // 防止 CSRF 攻击(跨站请求伪造)
    secure: process.env.NODE_ENV === 'production', // 在生产环境中，确保 cookie 只能通过 HTTPS 传输
  })
}


export default generateTokenAndSetCookie;