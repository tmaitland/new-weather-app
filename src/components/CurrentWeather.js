import React from 'react';
import ReactDOM from 'react-dom';
import Form from './Form';
import CityWeather from './CityWeather';
import axios from 'axios';



const APPID = '9347522dfc18eb6dc577618e6c9e8db1';
// let cityName = `Accra`;

class CurrentWeather extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        givenCity: "Miami",
        givenCountry: "USA",
      };
    }

    getWeather = () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.givenCity},${this.state.givenCountry}&appid=${APPID}&units=imperial`;

      axios.get(url).then(response => {
        this.setState({
          data: response.data
        });

        // console.log(this.state.data);


        this.setState({
          icon:  this.state.data.weather[0].icon,
          temperature: this.state.data.main.temp,
          city: this.state.data.name,
          country: this.state.data.sys.country,
          humidity: this.state.data.main.humidity,
          weather: this.state.data.weather[0].main,
          description: this.state.data.weather[0].description,
          error: ""

        });
      });
    };

    componentDidMount() {
      this.getWeather();
    }

    newLocation = event => {
      event.preventDefault();
      const newCityValue = event.target.elements.newCity.value;
      const newCountryValue = event.target.elements.newCountry.value;
      this.setState(
        {
          givenCity: newCityValue,
          givenCountry: newCountryValue
        },
        () => {
          this.getWeather();
        }
      );
    };

      render() {
          return (
              <div className="section">
                  <div className="container">
                        <Form newLocation={this.newLocation}/>
                        <CityWeather
                            icon={this.state.icon}
                            temperature={this.state.temperature} 
                            humidity={this.state.humidity}
                            city={this.state.givenCity}
                            country={this.state.givenCountry}
                            weather={this.state.weather}
                            description={this.state.description}
                            error={this.state.error}
                        />


                  </div>
              </div>
          );
      }

    // helper.getCurrentWeatherByCityName(cityName, (err, currentWeather) => {
    //     if(err){
    //         console.log(err);
    //     }
    //     else{
    //         console.log(currentWeather)
    //         console.log(currentWeather.weather[0].main, currentWeather.sys.country);
    //     }
    // });
}

export default CurrentWeather; 
