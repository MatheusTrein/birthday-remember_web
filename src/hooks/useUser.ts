import { AxiosResponse } from "axios";
import { api } from "../services/apiClient";
import { useAxios } from "./useAxios";

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  name: string;
  avatarUrl: string;
}

interface SingUpParams {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  timezoneOffSet: number;
}

export const singUp = ({
  email,
  password,
  timezoneOffSet,
  firstName,
  lastName,
}: SingUpParams): Promise<AxiosResponse<void>> => {
  return new Promise((resolve, reject) => {
    api
      .post("/users", {
        email,
        password,
        timezoneOffSet,
        firstName,
        lastName,
      })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

interface UpdateUserParams {
  body: FormData;
}

export const updateUser = ({
  body,
}: UpdateUserParams): Promise<AxiosResponse<User>> => {
  return new Promise((resolve, reject) => {
    api
      .put<User>(`/users`, body)
      .then((response) => {
        const user = response.data;
        const name = `${user.firstName} ${user.lastName}`;
        response.data.name = name;
        return resolve(response);
      })
      .catch((error) => reject(error));
  });
};

interface VerifyUserParams {
  params: {
    token: string;
  };
}

export const verifyUser = ({
  params,
}: VerifyUserParams): Promise<AxiosResponse<User>> => {
  return new Promise((resolve, reject) => {
    api
      .patch<User>(`/users/verify`, null, { params })
      .then((response) => {
        const user = response.data;
        const name = `${user.firstName} ${user.lastName}`;
        response.data.name = name;
        return resolve(response);
      })
      .catch((error) => reject(error));
  });
};

interface ForgotPasswordUserParams {
  email: string;
}

export const forgotPasswordUser = ({
  email,
}: ForgotPasswordUserParams): Promise<AxiosResponse<User>> => {
  return new Promise((resolve, reject) => {
    api
      .post(`/password/forgot`, { email })
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

interface ResetPasswordUserParams {
  queryStrings: {
    token: string;
  };
  password: string;
}

export const ResetPasswordUser = ({
  queryStrings,
  password,
}: ResetPasswordUserParams): Promise<AxiosResponse<User>> => {
  return new Promise((resolve, reject) => {
    api
      .post(
        `/password/reset`,
        { password },
        {
          params: {
            token: queryStrings.token,
          },
        }
      )
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

export const useUser = () => {
  const { request, data, error, loading, setData } = useAxios<User>({});

  return { request, data, error, loading, setData };
};
