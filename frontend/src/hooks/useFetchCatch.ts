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
  rigInfo?: string;
  baitInfo?: string;
  distance?: string;
  location?: string;
  comments?: string;
}

const useFetchCatch = (catchQuery: CatchQuery) => {
  const [catchLog, setCatchLog] = useState<FetchCatchLogs[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const fetchCatches = useCallback(() => {
    const controller = new AbortController();

    setIsLoading(true)
    apiClient
      .get<FetchCatchLogs[]>('/catches', { 
        signal: controller.signal, 
        params: { 
          sortBy: catchQuery?.sortBy,
          name: catchQuery?.name } 
      })
      .then(res => {
        setCatchLog(res.data)
        setIsLoading(false)})
      .catch(err => {
        if (err instanceof CanceledError) return;       
        setError(err.message);
        setIsLoading(false)
      });

    return () => controller.abort();
  }, [catchQuery]);

  useEffect(() => {
    fetchCatches();
  }, [fetchCatches]);

  return { catchLog, setCatchLog, error, isLoading, refetch: fetchCatches };
};

export default useFetchCatch;