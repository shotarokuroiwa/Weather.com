import type { WeatherData } from "../api/api";

interface Props {
  weather: WeatherData;
  isliked: boolean;
  onToggleFavorite: () => void;
}

const WeatherView = ({ weather, isliked, onToggleFavorite }: Props) => {
  return (
    <div className="container">
      <button onClick={onToggleFavorite} className={isliked ? "btn-remove" : "btn-add"}>
        {isliked ? "－" : "＋"}
      </button>
      <h1>{weather.city}</h1>
      <img
        src={`https://openweathermap.org{weather.icon}@2x.png`}
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
          <p className="main">{weather.humidity}%</p>
        </section>
        <section>
          <p>風速</p>
          <p className="main">{weather.windSpeed} m/s</p>
        </section>
        <section>
          <p>体感温度</p>
          <p className="main">{weather.feelsLike}℃</p>
        </section>
      </div>
    </div>
  );
};

export default WeatherView;
