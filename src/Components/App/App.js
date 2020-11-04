import React from 'react';
import './App.css';
import CitySearch from '../CitySearch/CitySearch';
import DisplayWeather from '../DisplayWeather/DisplayWeather';

class App extends React.Component {
  constructor(props){
    super(props)
    this.APIKey = '075a665da509f418b33ffa19630376e7';
    this.state = {
      isLoaded: false,
      location: '',
      weatherData: {}
    }
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }
  handleLocationChange(searchLocation) {
    this.setState({
      location: searchLocation
    });

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchLocation}&appid=${this.APIKey}`)
      .then(res => res.json())
      .then(
        (result) => {
          fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${result.coord.lat}&lon=${result.coord.lon}&exclude=minutely,alert&appid=${this.APIKey}`)
            .then(res => res.json())
            .then(
              (result) => {
                this.setState({
                  isLoaded: true,
                  weatherData: result
                })
              },
              (error) => {
                this.setState({
                  isLoaded: true,
                  error
                })
              }
            )
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  render() {

    return (
      <div className="App">
        <CitySearch onSelect={this.handleLocationChange}/>
        {this.state.location !== '' && (!this.state.isLoaded ?<div>Loading</div> : <DisplayWeather weatherData={this.state.weatherData}/> )}
      </div>
    )
  }
}

export default App;
