import { createContext, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setError(null);
    toast.success("Logged out successfully");
    navigate("/");
  }, [navigate]);


  // getUser with cancellation support
  const getUser = useCallback(
    async (signal) => {
      try {
        setLoading(true)
        const res = await API.get("/auth/me", { signal }); // Pass AbortSignal to axios
        setUser(res.data.user);
      } catch (err) {
        if (err.name === "CanceledError" || err.message === "canceled") {
          // request was canceled — do nothing
          return;
        }
        toast.error(err.response?.data?.error || "Failed to get user");
        logout();
      } finally {
        setLoading(false);
      }
    },
    [logout]
  );

  //   Check if user is authenticated
  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }
    if (user) return; // avoid duplicate fetch if we already have user
    const controller = new AbortController();
    getUser(controller.signal);

    return () => {
      controller.abort();
    };
  }, [token, getUser, user]);

  // register
  const register = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      const res = await API.post("/auth/register", formData);
      setUser(res.data.user);
      toast.success("Registered successfully");
      navigate("/login");
       return { success: true };
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Registration failed due to server error"
      );
      return { success: false, error: err.response?.data?.error };
    } finally {
      setLoading(false);
    }
  };

  // login
  const login = async (formData) => {
    try {
      setLoading(true);
      setError(null);
      const res = await API.post("/auth/login", formData);
      const token = res.data.token;
      localStorage.setItem("token", token);
      setToken(token);
      setUser(res.data.user);
      toast.success("Logged in successfully");
      navigate("/dashboard");
      return { success: true };
    } catch (err) {
      toast.error(err.response?.data?.error || "Login failed");
      return { success: false, error: err.response?.data?.error };
    } finally {
      setLoading(false);
    }
  };

  // //  get user data
  // const getUser = async () => {
  //   try {
  //     const res = await API.get("/auth/me");
  //     setUser(res.data.user);
  //     setLoading(false);
  //   } catch (err) {
  //     toast.error(err.response?.data?.error);
  //     logout();
  //   }
  // };

  // clear errors
  const clearErrors = () => setError(null);

  const value = {
    user,
    token,
    error,
    loading,
    register,
    login,
    logout,
    clearErrors,
    navigate,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
