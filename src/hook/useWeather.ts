import { useState, useEffect } from "react";
import fetchdata from "../api/api";
import type { WeatherData } from "../api/api"

const useWeather = (lat?: number, lon?: number) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
 
  useEffect(() => {
    if (lat === undefined || lon === undefined) {
      setLoading(false);
      return;
    }

    let ignore = false;
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchdata(Number(lat), Number(lon))
        if (!ignore) {
          setWeather(data);
        }
      } catch (e) {
        if (!ignore) {
          if (e instanceof Error) {
            setError(e.message)
          } else {
            setError("予期せぬエラーが発生しました")
          }
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }
    fetchWeather()
    return () => {
      ignore = true
    };
  }, [lat, lon])

  return { weather, loading, error };
}

export default useWeather;
