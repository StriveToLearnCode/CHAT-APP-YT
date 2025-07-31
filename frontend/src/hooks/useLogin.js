import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext.jsx";
const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (username, password) => {
    const success = verifyInput(username, password);
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      })
      const data = await res.json();

      if (data.message) {
        throw new Error(data.message);
      }

      setAuthUser(data);
      localStorage.setItem("chat-user", JSON.stringify(data));

      toast.success('登录成功');
    } catch (error) {
      console.error("Login failed:", error);
      toast.error(error.message || '登录失败');
    } finally {
      setLoading(false);
    }

  }
  return { loading, login }

}

export default useLogin;

const verifyInput = (username, password) => {
  if (!username.trim() || !password.trim()) {
    toast.error("请填写所有字段");
    return false;
  }

  return true;
}