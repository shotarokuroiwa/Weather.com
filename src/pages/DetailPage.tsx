import { useParams } from "react-router-dom";
import useWeather from "../hook/useWeather";
import { useFavorites } from "../components/FavoritesCntext";
import WeatherView from "../components/WeatherCard";

const DetailPage = () => {
  const { lat, lon } = useParams();
  const { weather, loading, error } = useWeather(Number(lat), Number(lon));
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const isliked = favorites.some(fav => fav.lat === Number(lat) && fav.lon === Number(lon));

  const handleToggle = () => {
    if (!weather) return;
    const current = { lat: Number(lat), lon: Number(lon), city: weather.city };
    isliked ? removeFavorite(current) : addFavorite(current);
  };

  if (loading) return <div>読み込み中...</div>;
  if (error || !weather) return <div>{error}</div>;

  return <WeatherView weather={weather} isliked={isliked} onToggleFavorite={handleToggle} />;
};

export default DetailPage;
