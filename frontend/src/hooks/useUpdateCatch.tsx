import apiClient from "../services/api-client";
import { FishSpecies } from "../enum/FishSpecies";
import { FetchCatchLogs } from "./useFetchCatch";
import { AxiosError, CanceledError } from "axios";
import { useState } from "react";

export interface UpdateCatchLog {
  name?: string;
  species?: FishSpecies;
  weight?: number;
}

const useUpdateCatch = () => {
  const [error, setError] = useState("");

  const updateCatch = async (catchId: number, updateCatch: UpdateCatchLog) => {
    const controller = new AbortController();

    try {
      const response = await apiClient.patch<FetchCatchLogs>(
        `/catches/${catchId}`,
        updateCatch,
        { signal: controller.signal }
      );
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

  return { updateCatch, error };
};

export default useUpdateCatch;
