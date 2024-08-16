"use client";

import axiosInstance from "@/lib/axiosInstance";
import { baseUrl } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

interface User {
  _id: string;
  username: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  // register: (
  //   username: string,
  //   email: string,
  //   password: string
  // ) => Promise<void>;
  // logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { data } = await axiosInstance.get(`${baseUrl}/users/profile`);
        setUser(data);
      } catch (error: any) {
        if (error.response?.status === 401) {
          setUser(null);
        } else {
          console.log("Request error in checkUser");
        }
      }
    };

    checkUser();
  }, []);
  console.log("User", user);
  const login = async (email: string, password: string) => {
    try {
      const { data } = await axiosInstance.post(`${baseUrl}/users/login`, {
        email,
        password,
      });
      setUser(data);
      window.location.href = "/";
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // const register = async (
  //   username: string,
  //   email: string,
  //   password: string
  // ) => {
  //   try {
  //     const { data } = await axios.post("/api/auth/register", {
  //       username,
  //       email,
  //       password,
  //     });
  //     setUser(data);
  //     router.push("/profile");
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // };

  // const logout = async () => {
  //   try {
  //     await axiosInstance.post("/api/auth/logout");
  //     setUser(null);
  //     router.push("/");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const value = { user, login };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
