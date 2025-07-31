import { useEffect, useState } from "react"
import useCoversation from "../zustand/useConversation"
import toast from "react-hot-toast"
const useGetMessages = () => {
  const [loading, setLoading] = useState(false)
  const { selectedConversation, setMessages, messages } = useCoversation()
  useEffect(() => {
    const getMessages = async () => {
      if (!selectedConversation) return

      setLoading(true)
      try {
        const res = await fetch(`/api/message/${selectedConversation._id}`, {
          method: "GET",
          headers: {
            'Content-Type': 'application/json',
          }
        })
        const data = await res.json()
        if (data.message) {
          throw new Error(data.message);
        }
        setMessages(data)
      } catch (error) {
        console.error('获取消息失败:', error)
        toast.error('获取消息失败')
      } finally {
        setLoading(false)
      }
    }

    if (selectedConversation?._id) {
      getMessages()
    }
  }, [selectedConversation, setMessages])



  return { loading, messages }
}

export default useGetMessages