import axios, { AxiosError, AxiosRequestHeaders, HeadersDefaults } from "axios";
import { GetServerSidePropsContext } from "next";
import nookies from "nookies";
import { toast } from "react-toastify";

import { singOut } from "../contexts/AuthContext";
import { AuthTokenError } from "../errors/AuthTokenError";

let isRefreshing = false;
let refreshToken = nookies.get()["birthdayremember.refreshToken"];
let failedRequestsQueue: any = [];

interface ForceTypeHeadersDefault extends HeadersDefaults {
  Authorization: string;
}

interface ForceTypeAxiosRequestHeaders extends AxiosRequestHeaders {
  Authorization: string;
}

export const setupAPIClient = (context?: GetServerSidePropsContext) => {
  let contextCookies = context?.req.cookies;
  let cookies = nookies.get();
  const token = contextCookies
    ? contextCookies["birthdayremember.token"]
    : cookies["birthdayremember.token"];
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  api.interceptors.request.use(
    (config) => {
      let contextCookies = context?.req.cookies;
      let cookies = nookies.get();

      refreshToken = contextCookies
        ? (contextCookies["birthdayremember.refreshToken"] as string)
        : (cookies["birthdayremember.refreshToken"] as string);
      return config;
    },
    (error) => Promise.reject(error)
  );
  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      const originalConfig = error.config;
      if (error.response?.status === 500 && window) {
        toast(
          "Erro interno do servidor, estamos enviando a notifição para a equipe. Em breve será resolvido.",
          { type: "error", autoClose: 7000 }
        );
      }
      if (error.response?.status === 401) {
        if (error.response.data?.type === "token.expired") {
          if (!isRefreshing) {
            console.log("Refreshing Token");
            isRefreshing = true;
            api
              .post("/sessions/refresh", {
                refreshToken,
              })
              .then((response) => {
                const { token: newToken, refreshToken: newRefreshToken } =
                  response.data;
                // tokenResponse = newToken;
                refreshToken = newRefreshToken;

                let contextCookies = context?.req.cookies;
                if (contextCookies) {
                  contextCookies["birthdayremember.token"] = newToken;
                  contextCookies["birthdayremember.refreshToken"] =
                    newRefreshToken;
                }

                nookies.set(context, "birthdayremember.token", newToken, {
                  maxAge: 60 * 60 * 24 * 30, // 30 days,
                  path: "/",
                });

                nookies.set(
                  context,
                  "birthdayremember.refreshToken",
                  newRefreshToken,
                  {
                    maxAge: 60 * 60 * 24 * 30, // 30 days,
                    path: "/",
                  }
                );

                const headers = api.defaults.headers as ForceTypeHeadersDefault;

                headers["Authorization"] = `Bearer ${newToken}`;

                failedRequestsQueue.forEach((request: any) =>
                  request.onSuccess(newToken)
                );
                failedRequestsQueue = [];
              })
              .catch((error) => {
                failedRequestsQueue.forEach((request: any) =>
                  request.onFailure(error)
                );
                failedRequestsQueue = [];

                if (
                  error.response.data?.type === "token.invalid" ||
                  error.response.data?.type === "refreshToken.invalid" ||
                  error.response.data?.type === "refreshToken.expired"
                ) {
                  if (typeof window === "undefined") {
                    throw new AuthTokenError();
                  } else {
                    singOut();
                  }
                }
              })
              .finally(() => {
                isRefreshing = false;
              });
          }
          return new Promise((resolve, reject) => {
            if (originalConfig.url !== "/sessions/refresh") {
              failedRequestsQueue.push({
                onSuccess: (token: string) => {
                  const headers =
                    originalConfig.headers as ForceTypeAxiosRequestHeaders;
                  headers["Authorization"] = `Bearer ${token}`;
                  originalConfig.headers = headers;
                  resolve(api(originalConfig));
                },
                onFailure: (error: AxiosError) => {
                  reject(error);
                },
              });
            }
          });
        } else if (
          error.response.data?.type === "token.invalid" ||
          error.response.data?.type === "refreshToken.invalid" ||
          error.response.data?.type === "refreshToken.expired"
        ) {
          if (typeof window === "undefined") {
            throw new AuthTokenError();
          } else {
            singOut();
          }
        }
      }

      return Promise.reject(error);
    }
  );
  return api;
};
