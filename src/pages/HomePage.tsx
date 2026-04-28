import { useState, useEffect } from 'react'
import WeatherView from "../components/WeatherCard";
import useWeather from "../hook/useWeather";
import { useFavorites } from "../components/FavoritesCntext";

const HomePage = () => {
  const TOKYO_COORDS = { lat: 35.6895, lon: 139.6917 };
  const [coords, setCoords] = useState<{ lat: number; lon: number } | null>(null);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude });
      },
      () => {
        setCoords(TOKYO_COORDS);
      }
    );
  }, []);

  const { weather, loading, error } = useWeather(
    coords?.lat ?? TOKYO_COORDS.lat,
    coords?.lon ?? TOKYO_COORDS.lon
  );

  const isliked = favorites.some(
    (fav) => fav.lat === coords?.lat && fav.lon === coords?.lon
  );

  const handleToggle = () => {
    if (!weather || !coords) return;
    const current = { ...coords, city: weather.city };
    if (isliked) {
      removeFavorite(current);
    } else {
      addFavorite(current);
    }
  };

  if (!coords || loading) return <div style={{ display: "flex", justifyContent: "center" }}>読み込み中...</div>;
  if (error || !weather) return <div>{error}</div>;

  return (
    <WeatherView
      weather={weather}
      isliked={isliked}
      onToggleFavorite={handleToggle}
    />
  );
};

export default HomePage;
