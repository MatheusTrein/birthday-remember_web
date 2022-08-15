import { AxiosError, HeadersDefaults } from "axios";
import Router from "next/router";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { User } from "../hooks/useUser";
import { api } from "../services/apiClient";

interface SingInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  singIn(credentials: SingInCredentials): Promise<void>;
  isAuthenticated: boolean;
  user: User;
  setUser: (user: User) => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

interface ForceTypeAxiosHeaderDefault extends HeadersDefaults {
  Authorization: string;
}

export const AuthContext = createContext({} as AuthContextData);

export const singOut = () => {
  destroyCookie(undefined, "birthdayremember.token", { path: "/" });
  destroyCookie(undefined, "birthdayremember.refreshToken", { path: "/" });

  Router.push("/");
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({} as User);
  const isAuthenticated = !!user;

  useEffect(() => {
    const token = parseCookies(undefined, { path: "/" })[
      "birthdayremember.token"
    ];

    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      api
        .get("/users/show")
        .then((response) => {
          const { email, firstName, lastName, avatarUrl } = response.data;
          const name = `${firstName} ${lastName}`;

          setUser({ email, firstName, lastName, avatarUrl, name });
        })
        .catch(() => {
          singOut();
        });
    }
  }, []);

  const singIn = useCallback(async ({ email, password }: SingInCredentials) => {
    try {
      const response = await api.post("/sessions", {
        email,
        password,
      });

      const { user } = response.data;

      const name = `${user.firstName} ${user.lastName}`;

      setUser({
        ...user,
        name,
      });

      const { refreshToken, token } = response.data;

      setCookie(undefined, "birthdayremember.token", token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });
      setCookie(undefined, "birthdayremember.refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      const headers = api.defaults.headers as ForceTypeAxiosHeaderDefault;
      headers["Authorization"] = `Bearer ${token}`;

      Router.push("/birthdays");
    } catch (err) {
      const error = err as AxiosError;
      if (
        error.response?.status === 401 &&
        error.response?.data.type !== "verification.false"
      ) {
        toast("Email ou senha incorretos", { type: "error" });
      } else if (error.response?.data.type === "verification.false") {
        toast("Você precisa verificar a sua conta.", { type: "warning" });
      } else {
        toast("Erro ao fazer o login", { type: "error" });
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ singIn, user, isAuthenticated, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
