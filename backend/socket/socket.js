import { Server } from "socket.io";
import http from 'http'
import express from "express";


const app = express()
// 这个没配置，是因为我们在前端vite配置文件中的proxy配置过了
const server = http.createServer(app) // express server

const io = new Server(server, {
  // 预防socket.io server跨域问题
  cors: {
    origin: ['http://localhost:3000'],
    methods: ["GET", "POST"]
  }
})  // 在 express server 里添加 socket.io server

const userSocketMap = {} // {userId:socketId}

// 判断接收者在不在线
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId]
}

// socket即将要连接的用户
io.on('connection', (socket) => {
  console.log('用户已连接:', socket.id);

  const userId = socket.handshake.query.userId
  if (userId != 'undefined') userSocketMap[userId] = socket.id

  socket.emit('getOnlineUsers', Object.keys(userSocketMap))

  // ❓为什么 disconnect 要写在 connection 里面？
  // 因为你监听的是**「某个客户端」的断开事件**，而不是所有客户端统一的断开事件。
  socket.on('disconnect', () => {
    console.log('用户已断开连接:', socket.id);
    delete userSocketMap[userId]
    io.emit('getOnlineUsers', Object.keys(userSocketMap))
  })
})

export { app, server, io }