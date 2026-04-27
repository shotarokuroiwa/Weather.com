import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SearchBar from "./SearchBar";
import fetchFavorite, { type FavoriteData } from "../api/favoriteApi";
import { useFavorites } from './FavoritesCntext';

const SideBar = ({}) => {
  const [favWeathers, setWeathers] = useState<FavoriteData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { favorites } = useFavorites();
 
  useEffect(() => {
    if (favorites.length === 0) {
      setLoading(false);
      return;
    }

    let ignore = false;
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchFavorite(favorites)
        if (!ignore) {
          setWeathers(data);
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
  }, [favorites])

  return (
    <div>
      <h1>Weather.con</h1>
      <SearchBar />
      <div className='fav-list'>
        {loading ? (
          <p>読み込み中...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : favWeathers.length === 0 ? ( 
          <p>お気に入り未登録</p> 
        ) : (
          favWeathers.map((weather) => (
            <div key={`${weather.lat}-${weather.lon}`} className='fav-item'>
              <Link to={`/weather/?lat=${weather.lat}&lon=${weather.lon}`}>
                <div className='item-upper'>
                  <h3>{weather.city}</h3>
                  <p>{weather.temp}</p>
                  <span>℃</span>
                </div>
                <div className='item-lower'>
                  <p>{weather.weather}</p>
                  <span>最高</span>
                  <p>{weather.tempMax}</p>
                  <span>最低</span>
                  <p>{weather.tempMin}</p>
                </div>
              </Link>
            </div>
        )))}
      </div>
    </div>
  )
}

export default SideBar;
