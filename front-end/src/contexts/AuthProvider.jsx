import { useEffect, useMemo, useState } from "react";
import { createContext } from "react";
import { useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAutenticated, setIsAutenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getAutenticatedUser();

      if (data.success) {
        setUser(data.user);
        setIsAutenticated(true);
      } else {
        setIsAutenticated(false);
        setUser(null);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  const getAutenticatedUser = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/me`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data) return data;
      return console.log("getAutenticatedUser: No data received");
    } catch (error) {
      console.log("getAutenticatedUser: ", error);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/login`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (!data) return { msg: `No response from server` };
      if (data.success) {
        setUser(data.user);
        setIsAutenticated(true);
      }
      return {...data, status: response.status};
    } catch (error) {
      return {
        success: false,
        msg: `Error in login: ${error}`,
      };
    }
  };

  const logout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/logout`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        setUser(false);
        setIsAutenticated(false);
        return data.msg;
      }
      return data.msg;
    } catch (error) {
      console.log("Logout error: ", error);
      return false;
    }
  };

  const value = useMemo(
    () => ({
      user,
      setUser,
      isAutenticated,
      setIsAutenticated,
      loading,
      getAutenticatedUser,
      login,
      logout,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  return context;
};
