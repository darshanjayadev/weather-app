import React from 'react';
import './DisplayWeather.css'

class DisplayWeather extends React.Component {
  constructor(props) {
    super(props);
    this.days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
    this.today = new Date().getDay();
  }

  convertToCelsius(k) {
    return k - 273;
  }

  render() {
    return (
    <section className="DisplayWeather">
      <article className="daily-weather">
        {
          this.props.weatherData.daily.map((dayData) => {
            if(this.today > 6) {
              this.today = 0;
            }
            return (
              <div className="day-detail" key={dayData.dt}>
                <div className="day">
                  {this.days[this.today++]}
                </div>
                <div className="temp">
                  <div className="min">{Math.floor(this.convertToCelsius(dayData.temp.min))}°</div>
                  <div className="max">{Math.floor(this.convertToCelsius(dayData.temp.max))}°</div>
                </div>
                <div className="logo">
                  <img src={`http://openweathermap.org/img/wn/${dayData.weather[0].icon}@2x.png`} alt="daily weather icon"/>
                </div>
                <div className="type">{dayData.weather[0].main}</div>
              </div>
            )
          })
        }
      </article>
      <section className="current-container">
      <article className="current">
        <div>
          {Math.floor(this.props.weatherData.current.temp - 273)}°C
        </div>
        <img src={`http://openweathermap.org/img/wn/${this.props.weatherData.current.weather[0].icon}@2x.png`} alt="current weather icon"/>
      </article>
      <article className="weather">
        <div className="pressure">
          <span>Pressure </span>
          {this.props.weatherData.current.pressure}
          hpa
        </div>
        <div className="humidity">
          <span>Humidity </span>
          {this.props.weatherData.current.humidity}
          %
        </div>
      </article>
      </section>
    </section>
    )
  }
}

export default DisplayWeather;
