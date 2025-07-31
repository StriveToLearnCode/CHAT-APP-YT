import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext.jsx";

const useSignup = () => {
  const [loading, setLoading] = useState(false)
  const { setAuthUser } = useAuthContext();
  const signup = async ({ fullName, username, password, confirmPassword, gender }) => {
    const success = verifyInput({ fullName, username, password, confirmPassword, gender });
    if (!success) return;
    setLoading(true)
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, username, password, confirmPassword }),
      });
      if (!response.ok) {
        toast.error(data.message || "注册失败");
        return;
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
      toast.success("注册成功！");

    } catch (error) {
      console.error("注册失败:", error);
      toast.error("注册失败，请稍后再试");
    } finally {
      setLoading(false)
    }
  }



  return {
    loading, signup
  }
}

export default useSignup;


const verifyInput = ({ fullName, username, password, confirmPassword, gender }) => {
  if (!fullName.trim() ||
    !username.trim() ||
    !password.trim() ||
    !confirmPassword.trim() || !gender) {
    toast.error("请填写所有字段");
    return false
  }

  if (password !== confirmPassword) {
    toast.error("密码不匹配");
    return false
  }

  if (password.length < 6) {
    toast.error("密码长度至少为6个字符");
    return false
  }

  return true;
}