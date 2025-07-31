import { useState } from "react"
import toast from "react-hot-toast"
import useCoversation from "../zustand/useConversation"

const useSendMessage = () => {
  const [loading, setLoading] = useState(false)
  const { selectedConversation, messages, setMessages } = useCoversation()
  const sendMessage = async (message) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/message/send/${selectedConversation._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message })
      })

      const data = await res.json()

      if (data.error) throw new Error(data.error);

      setMessages([...messages, data])
      toast.success('消息发送成功')
    } catch (error) {
      console.error('发送消息失败:', error)
      toast.error('发送消息失败')
    } finally {
      setLoading(false)
    }
  }
  return { loading, sendMessage }
}

export default useSendMessage;