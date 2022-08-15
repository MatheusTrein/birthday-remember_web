import { AxiosError, AxiosResponse } from "axios";
import { useState } from "react";

interface RequestParams<paramsType> {
  fn: (params: paramsType) => Promise<AxiosResponse<any>>;
  params: paramsType;
}

const useAxios = <P>(initialData: any) => {
  const [data, setData] = useState<P>(initialData as P);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const request = async <paramsType>({
    fn,
    params,
  }: RequestParams<paramsType>): Promise<AxiosResponse<P>> => {
    let response;
    try {
      if (error) {
        setError(null);
      }
      setLoading(true);
      response = await fn(params);
      setData(response.data);
      return response;
    } catch (err) {
      const error = err as AxiosError;
      const response = error.response;
      if (response) {
        setError(response?.data.message);
      } else {
        setError(error.message);
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    request,
    setData,
  };
};

export { useAxios };
