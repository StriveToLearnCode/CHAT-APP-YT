import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext.jsx";
import { useState } from "react";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const logout = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.removeItem("chat-user");
      setAuthUser(null);
      toast.success("登出成功");
    } catch (error) {
      toast.error("登出失败，请稍后再试");
      console.error("登出失败:", error);
    } finally {
      setLoading(false);
    }
  }

  return { loading, logout };
}

export default useLogout;