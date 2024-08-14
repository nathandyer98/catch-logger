import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { FishSpecies } from "../enum/FishSpecies";
import { CanceledError } from "axios";

export interface FetchCatchLogs {
  id: number;
  name: string;
  species: FishSpecies;
  weight: number;
  imgUrl: string;
  date_caught: string;
}

const useFetchCatch = () => {
  const [catchLog, setCatchLog] = useState<FetchCatchLogs[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    apiClient
      .get<FetchCatchLogs[]>("/catches", { signal: controller.signal })
      .then((res) => setCatchLog(res.data))
      .catch((err) => {
        if (err instanceof CanceledError) {
          return;
        }
        setError(err.message);
      });

    return () => controller.abort();
  }, []);

  return { catchLog, setCatchLog, error };
};

export default useFetchCatch;
