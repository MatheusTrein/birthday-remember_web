import { AxiosResponse } from "axios";
import { GetServerSidePropsContext } from "next";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { api } from "../services/apiClient";
import { setupAPIClient } from "../services/api";
import { formatDate } from "../utils/formatDate";
import { useAxios } from "./useAxios";

export interface Birthday {
  id: string;
  name: string;
  birthDate: string;
  birthDateFormatted: string;
  reminderIsActive: boolean;
  alarmTime: string;
  createdAt: string;
  createdAtFormatted: string;
}

export interface GetBirthdaysParams {
  context?: GetServerSidePropsContext;
  params: {
    page: number;
    perPage: number;
  };
}

export const getBirthdays = ({
  context,
  params,
}: GetBirthdaysParams): Promise<AxiosResponse<Birthday[]>> => {
  return new Promise((resolve, reject) => {
    const apiClient = setupAPIClient(context);
    apiClient
      .get<Birthday[]>("/birthday-persons", { params })
      .then((response) => {
        response.data = response.data.map((birthday) =>
          formatBirthday(birthday)
        );
        return resolve(response);
      })
      .catch((error) => reject(error));
  });
};

export interface EnableReminderBirthdayParams {
  birthdayId: string;
}

export const enableReminderBirthday = ({
  birthdayId,
}: EnableReminderBirthdayParams): Promise<AxiosResponse<Birthday>> => {
  return new Promise((resolve, reject) => {
    api
      .patch<Birthday>(`/birthday-persons/${birthdayId}/enable`)
      .then((response) => {
        response.data = formatBirthday(response.data);
        return resolve(response);
      })
      .catch((error) => reject(error));
  });
};

export interface DisableReminderBirthdayParams {
  birthdayId: string;
}

export const disableReminderBirthday = ({
  birthdayId,
}: DisableReminderBirthdayParams): Promise<AxiosResponse<Birthday>> => {
  return new Promise((resolve, reject) => {
    api
      .patch<Birthday>(`/birthday-persons/${birthdayId}/disable`)
      .then((response) => {
        response.data = formatBirthday(response.data);
        return resolve(response);
      })
      .catch((error) => reject(error));
  });
};

export interface CreateBirthday {
  name: string;
  birthDate: Date;
  alarmTime: string;
}

interface PostBirthdayParams {
  data: CreateBirthday;
}

export const postBirthday = ({
  data,
}: PostBirthdayParams): Promise<AxiosResponse<Birthday>> => {
  return new Promise((resolve, reject) => {
    api
      .post<Birthday>("/birthday-persons", data)
      .then((response) => {
        response.data = formatBirthday(response.data);
        return resolve(response);
      })
      .catch((error) => reject(error));
  });
};

export interface UpdateBirthday {
  name: string;
  birthDate: Date;
  alarmTime: string;
}

interface UpdateBirthdayParams {
  birthdayId: string;
  data: UpdateBirthday;
}

export const updateBirthday = ({
  birthdayId,
  data,
}: UpdateBirthdayParams): Promise<AxiosResponse<Birthday>> => {
  return new Promise((resolve, reject) => {
    api
      .put<Birthday>(`/birthday-persons/${birthdayId}`, data)
      .then((response) => {
        response.data = formatBirthday(response.data);
        return resolve(response);
      })
      .catch((error) => reject(error));
  });
};

interface DeleteBirthdayParams {
  birthdayId: string;
}

export const deleteBirthday = ({
  birthdayId,
}: DeleteBirthdayParams): Promise<AxiosResponse<void>> => {
  return new Promise((resolve, reject) => {
    api
      .delete(`/birthday-persons/${birthdayId}`)
      .then((response) => resolve(response))
      .catch((error) => reject(error));
  });
};

const formatBirthday = (birthday: Birthday): Birthday => {
  const [hours, minutes] = birthday.alarmTime.split(":");
  const parsedAlarmTime = `${hours}:${minutes}`;

  return {
    ...birthday,
    alarmTime: parsedAlarmTime,
    birthDateFormatted: formatDate(new Date(birthday.birthDate)),
    createdAtFormatted: `Criado dia ${formatDate(
      new Date(birthday.createdAt)
    )}`,
  };
};

export const useBirthdays = (initialData: Birthday[]) => {
  const { request, data, loading, error, setData } =
    useAxios<Birthday[]>(initialData);
  const [totalCount, setTotalCount] = useState(0);
  const registerPerPage = 5;

  useEffect(() => {
    if (!initialData) {
      request({
        fn: getBirthdays,
        params: {
          params: {
            page: 1,
            perPage: registerPerPage,
          },
        },
      })
        .then((response) => {
          setTotalCount(Number(response.headers["x-total-count"]));
        })
        .catch((error) => {
          toast("Erro ao carregar os aniversários");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    request,
    data,
    loading,
    error,
    setData,
    totalCount,
    setTotalCount,
    registerPerPage,
  };
};
