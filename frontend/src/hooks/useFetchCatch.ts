import { useCallback, useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { FishSpecies } from "../enum/FishSpecies";
import { CanceledError } from "axios";
import { CatchQuery } from "../App";

export interface FetchCatchLogs {
  id: number;
  name: string;
  species: FishSpecies;
  weight: number;
  imgUrl: string;
  dateCaught: string;
}

const useFetchCatch = (catchQuery: CatchQuery) => {
  const [catchLog, setCatchLog] = useState<FetchCatchLogs[]>([]);
  const [error, setError] = useState("");

  const fetchCatches = useCallback(() => {
    const controller = new AbortController();

    apiClient
      .get<FetchCatchLogs[]>('/catches', { 
        signal: controller.signal, 
        params: { sortBy: catchQuery?.sortBy } 
      })
      .then(res => setCatchLog(res.data))
      .catch(err => {
        if (err instanceof CanceledError) return;       
        setError(err.message);
      });

    return () => controller.abort();
  }, [catchQuery]);

  useEffect(() => {
    fetchCatches();
  }, [fetchCatches]);

  return { catchLog, setCatchLog, error, refetch: fetchCatches };
};

export default useFetchCatch;