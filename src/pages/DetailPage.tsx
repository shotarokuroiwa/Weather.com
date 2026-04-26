import { useParams } from "react-router-dom";
import useWeather from "../hook/useWeather";

const DetailPage = () => {
 const { lat, lon } = useParams<{ lat: string; lon: string }>();
 const { weather, loading, error } = useWeather(Number(lat), Number(lon));
 
  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }
  if (loading) {
    return <div>読み込み中...</div>;
  }
  if (!weather) {
    return <div>データがありません</div>;
  }

  return (
    <div className="container">
      <h1>{weather.city}</h1>
      <img
      src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
      alt="天気アイコン"
      />
      <h2>{weather.temp}</h2>
      <span>℃</span>
      <div className="minmax">
        <div className="max">
          <span className="minmax-text">最高</span>
          <span className="temp-text">{weather.tempMax}</span>
        </div>
        <div className="min">
          <span className="minmax-text">最低</span>
          <span className="temp-text">{weather.tempMin}</span>
        </div>
      </div> 

      <div className="section-container">
        <section>
          <p>概要</p>
          <p className="main">{weather.description}</p>
        </section>

        <section>
          <p>湿度</p>
          <p className="main">{weather.humidity}</p>

        </section>
        <section>
          <p>風</p>
          <p className="main">{weather.windSpeed}</p>
        </section>

        <section>
          <p>体感温度</p>
          <p className="main">{weather.temp}</p>
        </section>
      </div>
    </div>
  )

}
export default DetailPage;
