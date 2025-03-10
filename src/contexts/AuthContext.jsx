import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import api from "../helpers/axios";
import { useNavigate } from "react-router-dom";

// Create context with proper default values
const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  logout: () => {},
  updateProfile: () => {},
  refreshUser: () => {},
  setUser: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // State
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Use the same token key as in useLogin
  const token = localStorage.getItem("token");

  // Check if user is authenticated on initial load or token change
  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          // Token is already handled in axios interceptors
          const response = await api.get("/user");
          setUser(response.data);
          setError(null);
          setIsLoading(false);
        } catch (error) {
          console.error("Authentication error:", error);
          // Token might be invalid or expired
          localStorage.removeItem("token");
          setUser(null);
          setError("Authentication session expired. Please login again.");
          setIsLoading(false);
        }
      } else {
        setUser(null);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [token]);

  // Logout user
  const logout = async () => {
    setIsLoading(true);

    try {
      // Call logout endpoint if available
      if (token) {
        await api.post("/logout");
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Remove token from localStorage - using the same key as useLogin
      localStorage.removeItem("token");

      // Reset state
      setUser(null);
      setError(null);
      setIsLoading(false);

      // Redirect to login page
      navigate("/login");
    }
  };

  // Update user profile
  const updateProfile = async (userData) => {
    setIsLoading(true);

    try {
      const response = await api.put("/user", userData);
      setUser(response.data);
      setError(null);
      setIsLoading(false);
      return { success: true, user: response.data };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update profile";

      setError(errorMessage);
      setIsLoading(false);
      return {
        success: false,
        error: errorMessage,
      };
    }
  };

  // Get fresh user data
  const refreshUser = async () => {
    if (!token) return;

    try {
      const response = await api.get("/user");
      setUser(response.data);
      return response.data;
    } catch (error) {
      console.error("Failed to refresh user data:", error);
    }
  };

  // Create a memoized context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      error,
      logout,
      updateProfile,
      refreshUser,
      setUser,
    }),
    [user, isLoading, error] // Only re-create when these values change
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
