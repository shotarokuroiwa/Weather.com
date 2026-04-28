import type { Coord } from "../components/FavoritesCntext"
import { API_KEY, BASE_URL } from "./api"

export interface FavoriteData {
  city: string;
  lat: number;
  lon: number;
  temp: number;
  tempMin: number;
  tempMax: number;
  weather: string;
  icon: string;
};

const fetchFavorite = async (favorites: Coord[]): Promise<FavoriteData[]> => {
      try {
        const results = await Promise.all(
          favorites.map(async (fav) => {
            const res = await fetch(
              `${BASE_URL}?lat=${fav.lat}&lon=${fav.lon}&appid=${API_KEY}&units=metric&lang=ja`
            );
            if (!res.ok) {
              if (res.status === 404) {
                throw new Error(`${fav.city}が見つかりませんでした`)
              }
              throw new Error("取得に失敗しました")
            }
            const data = await res.json();
            return {
              city: data.name,
              lat: fav.lat,
              lon: fav.lon,
              temp: Math.round(data.main.temp),
              tempMin: Math.round(data.main.temp_min),
              tempMax: Math.round(data.main.temp_max),
              weather: data.weather[0]?.main || "",
              icon: data.weather[0]?.icon || "",
            }
          })
        )
        return results;
      } catch (e) {
        throw e;
      }
}

export default fetchFavorite;
