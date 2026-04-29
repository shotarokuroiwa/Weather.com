import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import SearchBar from "./SearchBar";
import fetchFavorite, { type FavoriteData } from "../api/favoriteApi";
import { useFavorites } from './FavoritesCntext';
import './css/SideBar.css'

const SideBar = () => {
  const [favWeathers, setWeathers] = useState<FavoriteData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { favorites } = useFavorites();

  useEffect(() => {
    if (favorites.length === 0) {
      setWeathers([]);
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
    <div className='sidebar'>
      <h1 className='title'>
        <Link to='/'>Weather.com</Link>
      </h1>
      <SearchBar />
      <div className='fav-list'>
        {loading ? (
          <p style={{ display: "flex", justifyContent: "center" }}>読み込み中...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : favWeathers.length === 0 ? (
          <p style={{ textAlign: "center", marginTop: "10px", opacity: "0.4" }}>No favorites added.</p>
        ) : (
          favWeathers.map((weather) => (
            <div key={`${weather.lat}-${weather.lon}`} className='fav-item'>
              <Link to={`/weather/${weather.lat}/${weather.lon}`}>
                <div className='item-upper'>
                  <h3>{weather.city}</h3>
                  <div className='temp'>
                    <p>{weather.temp}</p>
                    <span>℃</span>
                  </div>
                </div>
                <div className='item-lower'>
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                    alt="天気アイコン"
                  />
                  <div className='minmax'>
                    <section>
                      <span>最高</span>
                      <p>{weather.tempMax}</p>
                    </section>
                    <section>
                      <span>最低</span>
                      <p>{weather.tempMin}</p>
                    </section>
                  </div>
                </div>
              </Link>
            </div>
          )))}
      </div>
    </div>
  )
}

export default SideBar;
