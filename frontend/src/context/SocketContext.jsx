import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from 'socket.io-client'

const SocketContext = createContext()

// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () => {
  return useContext(SocketContext)
} 


export const SocketContextProvider = ({children}) => {
  // socket 是否连接
  const [socket,setSocket] = useState(null)
  const [onlineUser,setOnlineUser] = useState([])
  const { authUser } = useAuthContext()
  useEffect(() => {
    // 如果有登录用户，就连接socket.io
    if(authUser) {
      const socket = io('http://localhost:5000',{
        query:{
          userId:authUser._id
        }
      })

      setSocket(socket)

      socket.on('getOnlineUsers',(users) => {
        setOnlineUser(users)
      })

      return () => {
        // 清理函数
        // 组件卸载或用户退出登录时关闭连接
        socket.close()
      }
    }else {
      if(socket) {
        socket.close()
        setSocket(null)
      }
    }
  },[authUser])
  return (
    <SocketContext.Provider value={{socket,onlineUser}}>
    {children}
    </SocketContext.Provider>
  )
} 