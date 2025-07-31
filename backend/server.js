// const express = require('express')
// const dotenv = require('dotenv')
// 由于在package.json中设置了"type": "module"，所以需要使用ES6模块语法
import express from 'express'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import userRoutes from './routes/user.route.js'

import connectToMongoDB from './db/connectMongoDB.js'
import cookieParser from 'cookie-parser'
import { app, server } from './socket/socket.js'

// env 环境变量
const PROT = process.env.PROT || 5000


dotenv.config()
// 使用中间件
app.use(express.json()) // 解析 JSON 格式的请求体(from req.body)
app.use(cookieParser()) // 解析 Cookie

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)
app.use("/api/user", userRoutes)

server.listen(PROT, () => {
  // 连接MongoDB
  connectToMongoDB()
  console.log(` 服务器已启动，端口：${PROT}`)
})