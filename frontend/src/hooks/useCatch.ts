import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { FishSpecies } from "../enum/FishSpecies";
import { CanceledError } from "axios";

export interface Log {
    id: number;
    name: string;
    species: FishSpecies;
    weight: number;
    imgUrl: string; 
}

const useCatch = () => {
    const [catchLog, setCatchLog] = useState<Log[]>([]); 
    const [error, setError] = useState("");

    useEffect(() => {
        const controller = new AbortController(); 

        apiClient.get<Log[]>('/catches', { signal: controller.signal })
            .then(res => setCatchLog(res.data))
            .catch(err => {
                if (err instanceof CanceledError) {
                    return; 
                }
                setError(err.message);
            });

        return () => controller.abort(); 
        
    }, []);

    return { catchLog, error };
}

export default useCatch;