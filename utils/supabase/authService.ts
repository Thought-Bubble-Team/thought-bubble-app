import { User } from "@supabase/supabase-js";
import { createContext, FC, ReactElement, ReactNode, useContext, useState } from "react";
import { supabase } from "./supabase";

type Tokens = {
  access_token: string;
  refresh_token: string;
};

type UserContextProps = {
  user: User | null;
  loginWithToken: (credentials: Tokens) => Promise<void>;
};

const AuthContext = createContext<UserContextProps | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }): ReactElement => {
  const [user, setUser] = useState<User | null>(null);

  const loginWithToken = async ({ access_token, refresh_token }: Tokens) => {
    const signIn = async () => {
      await supabase.auth.setSession({
        access_token,
        refresh_token,
      });

      return await supabase.auth.refreshSession();
    };

    const {
      data: { user: supabaseUser },
    } = await signIn();

    setUser(supabaseUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loginWithToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("context must be used within an AuthProvider");
  }

  return context;
};