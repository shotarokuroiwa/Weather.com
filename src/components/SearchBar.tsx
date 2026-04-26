import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import useDebounce from '../hook/useDebounce'
import { API_KEY } from '../api/api';

export interface CityType {
  name: string;
  local_names?: Record<string, string>;
  lat: number;
  lon: number;
}

const SearchBar = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const debounceValue = useDebounce(inputValue, 500);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [cities, setCities] = useState<CityType[]>([]);
  const [cursor, setCursor] = useState(-1);

  useEffect(() => {
    let ignore = false;
    if (!debounceValue) return;

    const fetchCity = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${debounceValue}&limit=2&appid=${API_KEY}`)
        const data: CityType[] = await res.json()
        if (!ignore) {
          setCities(data);
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
    fetchCity()
    return () => {
      ignore = true
    };
  }, [debounceValue])

  const navigate = useNavigate();
  const handleSelect = (city: CityType) => {
    const { lat, lon } = city
    navigate(`/weather?lat=${lat}&lon=${lon}`)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      // 下キー：候補を一つ下に
      setCursor(prev => (prev < cities.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      // 上キー：候補を一つ上に
      setCursor(prev => (prev > 0 ? prev - 1 : prev));
    } else if (e.key === 'Enter') {
      // エンター：現在のカーソル位置の都市を選択
      if (cursor >= 0 && cursor < cities.length) {
        handleSelect(cities[cursor]);
      }
    } else if (e.key === 'Escape') {
      // Esc：リストを閉じる
      setCities([]);
    }
  };

  return (
    <div className='searchbar'>
      <input
        type="text"
        placeholder="都市名で検索..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      {loading && <p>読み込み中...</p>}
      {error && <div className='error'>{error}</div>}

      {!error && cities.length > 0 && (
        <ul className='dropdown'>
          {cities.map((city, i) => (
            <li key={i} onClick={() => handleSelect(city)} className={i === cursor ? "active" : ""}>
              {city.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchBar;
