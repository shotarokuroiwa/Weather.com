export type WeatherData = {
  city: string;
  lat: number;
  lon: number;
  temp: number;
  tempMin: number;
  tempMax: number;
  feelsLike: number;
  description: string; // 詳細(少し曇り等)
  humidity: number; // 湿度 
  windSpeed: number;
  icon: string;
}

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const fetchdata = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const res = await fetch(
      `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=ja`
    );
    if (!res.ok) {
      if (res.status === 404) {
        throw new Error("都市名が見つかりませんでした")
      }
      throw new Error("取得に失敗しました")
    }

    const data = await res.json();
    return {
      city: data.name,
      lat: data.coord.lat,
      lon: data.coord.lon,
      temp: data.main.temp,
      tempMin: data.main.temp_min,
      tempMax: data.main.temp_max,
      feelsLike: data.main.feels_like,
      description: data.weather[0]?.description || "",
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
      icon: data.weather[0]?.icon || "",
    };

  } catch (error) { // 通信エラー
    throw error;
  }
}

export default fetchdata;
