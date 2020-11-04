import React from 'react';
import cityList from 'indian-cities-json';
import './CitySearch.css';

class CitySearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cityInput: "",
      isSelectVisible: false,
    }
    this.handleCityInputChange = this.handleCityInputChange.bind(this);
    this.handleCitySelect = this.handleCitySelect.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleCityInputChange(e) {
    this.setState({
      cityInput: e.target.value,
      isSelectVisible: true
    });
  }

  handleCitySelect(e) {
    this.setState({
      isSelectVisible: false,
      cityInput: e.target.value
    })
    this.props.onSelect(e.target.value)
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    const filteredList = cityList.cities.filter((city) => {
      return city.name.toLowerCase().search(this.state.cityInput.toLowerCase()) !== -1;
    });
    return (
      <article className="CitySearch">
        <form className="city-form" onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.cityInput} onChange={this.handleCityInputChange} placeholder="Enter a city name" />
          {
            this.state.isSelectVisible &&
            <select value={this.state.selectedCity} onChange={this.handleCitySelect} multiple>
              {
                filteredList.slice(0,5).map((city) => (
                  <option key={city.name} value={`${city.name}, ${city.state}`}>{city.name},{city.state}</option>
                ))
              }
            </select>
          }
        </form>
      </article>
    )
  }
}

export default CitySearch;
