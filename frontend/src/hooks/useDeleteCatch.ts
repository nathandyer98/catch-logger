import apiClient from "../services/api-client";
import { AxiosError, CanceledError } from "axios";
import { useState } from "react";

const useDeleteCatch = () => {
  const [error, setError] = useState("");

  const deleteCatch = async (catchId: number) => {
    const controller = new AbortController();

    try {
      const response = await apiClient.delete<string>(`/catches/${catchId}`, {
        signal: controller.signal,
      });
      return response.data;
    } catch (err) {
      if (err instanceof CanceledError) {
        return;
      }
      if (err instanceof AxiosError) {
        setError(err.response?.data?.message || err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    }

    return () => controller.abort();
  };

  return { deleteCatch, error };
};

export default useDeleteCatch;
