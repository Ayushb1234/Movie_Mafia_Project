import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import {
  getMe,
  loginUser,
  registerUser
} from "../api/api";

import {
  getToken,
  removeToken,
  setToken
} from "../utils/auth";

const AuthContext =
  createContext(null);

export const AuthProvider = ({
  children
}) => {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = getToken();

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await getMe();
        setUser(data.user);
      } catch (error) {
        removeToken();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (
    email,
    password
  ) => {
    const data = await loginUser(
      email,
      password
    );

    setToken(data.token);
    setUser(data.user);

    return data;
  };

  const register = async (
    username,
    email,
    password
  ) => {
    const data =
      await registerUser(
        username,
        email,
        password
      );

    setToken(data.token);
    setUser(data.user);

    return data;
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: Boolean(user),
    isAdmin:
      user?.role === "admin"
  };

  return (
    <AuthContext.Provider
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};