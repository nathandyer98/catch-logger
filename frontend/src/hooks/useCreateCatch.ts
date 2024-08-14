import apiClient from "../services/api-client";
import { FishSpecies } from "../enum/FishSpecies";
import { FetchCatchLogs } from "./useFetchCatch";
import { AxiosError, CanceledError } from "axios";
import { useState } from "react";

export interface CreateCatchLog {
  name: string;
  species: FishSpecies;
  weight: number;
  date_caught: string;
}

const useCreateCatch = () => {
  const [error, setError] = useState("");

  const createCatch = async (newCatch: CreateCatchLog) => {
    const controller = new AbortController();

    try {
      const response = await apiClient.post<FetchCatchLogs>(
        "/catches",
        newCatch,
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

  return { createCatch, error };
};

export default useCreateCatch;
