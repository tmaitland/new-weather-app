import React from 'react';
import ReactDOM from 'react-dom';
import Form from './Form';
import CityWeather from './CityWeather';
import axios from 'axios';



const APPID = '9347522dfc18eb6dc577618e6c9e8db1';
// let cityName = `Accra`;

class CurrentWeather extends React.Component {
    
    //    state = {
    //         icon: undefined,
    //         temperature: undefined,
    //         city: undefined,
    //         country: undefined,
    //         humidity: undefined,
    //         description: undefined,
    //         error: undefined
    //       }
    //     // this.getWeather();

    // getWeather = async (event) => {
    //     event.preventDefault();
    //     const city = event.target.elements.city.value;
    //     const country = event.target.elements.country.value;
    //     const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${APPID}&units=imperial`);
    //     const data = await api_call.json();
        

    //     if (city && country) {
    //       this.setState({
    //         icon: data.weather[0].icon,
    //         temperature: data.main.temp,
    //         city: data.name,
    //         country: data.sys.country,
    //         humidity: data.main.humidity,
    //         description: data.weather[0].description,
    //         error: ""
    //       });
    //     } else {
    //       this.setState({
    //         icon: undefined,
    //         temperature: undefined,
    //         city: undefined,
    //         country: undefined,
    //         humidity: undefined,
    //         description: undefined,
    //         error: "Please enter the values."
    //       });
         
    //     }
    //     console.log(`${data.weather}`);
    //   }
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