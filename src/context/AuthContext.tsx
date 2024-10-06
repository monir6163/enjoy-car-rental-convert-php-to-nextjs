"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
interface Props {
  children: React.ReactNode;
  user?: { name: string; email: string; image: string };
  session: any;
}

interface AuthContextType {
  user?: { name: string; email: string; image: string };
  session: any;
  loggedIn: boolean;
  loginWithCredentials: (email: string, password: string) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children, session, user }: Props) => {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    if (session) {
      setLoggedIn(true);
    }
    if (user) {
      setLoggedIn(true);
    }
  }, [session, user]);

  const loginWithCredentials = async (email: string, password: string) => {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    router.refresh();
    return res;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loggedIn,
        loginWithCredentials,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};
