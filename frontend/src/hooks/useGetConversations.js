import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const useGetConversations = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const getAllConversations = async () => {
      setLoading(true)

      try {
        const res = await fetch('/api/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setConversations(data);
      } catch (error) {
        console.error("获取会话失败:", error);
        toast.error("获取会话失败，请稍后再试");
      } finally {
        setLoading(false);
      }
    }
    getAllConversations();

  }, [])


  return { conversations, loading };

}

export default useGetConversations;