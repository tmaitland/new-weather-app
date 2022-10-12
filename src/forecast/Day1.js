import React from 'react';
import ReactDOM from 'react-dom';
import Form from '../components/Form';
import Modal from '../components/Modal';
import '../App.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';


// const OpenWeatherMapHelper = require("openweathermap-node");
// const helper = new OpenWeatherMapHelper({
//     APPID: '9347522dfc18eb6dc577618e6c9e8db1',
//     units:"kelvin"
// });

const height = {
    height: '75vh'
}

const center = {
    textAlign: 'center'
}

const centerBtn = {
    textAlign: 'center',
    display: 'block',
    margin: 'auto'
}

const formStyle = {
	display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

const noUnderline = {
    textDecoration: 'none'
}

const APPID = '9347522dfc18eb6dc577618e6c9e8db1';
// let cityName = `Accra`;

class FiveDayForeCast extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            givenCity: "Miami",
            givenCountry: "USA",
            day: new Array(),
            minTemp: new Array(),
            maxTemp: new Array(),
            icon: new Array(),
            humidity: new Array(),
            weather: new Array(),
            weatherDescription: new Array(),
            error: undefined,
            show: false
        };
      }

      showModal = () => {
        this.setState({ show: true });
      };

      hideModal = () => {
        this.setState({ show: false });
      };


      getWeather = () => {
        const api_call = `https://api.openweathermap.org/data/2.5/forecast?q=${this.state.givenCity},${this.state.givenCountry}&appid=${APPID}&units=imperial`;
        let today = new Date();
        let numToday = today.toJSON();
        var now = numToday.split('T')[0];

        axios.get(api_call).then(response => {
            this.setState({
                data: response.data
            });
            console.log(response.data)

            let day = new Array();
            let minTemp = new Array();
            let maxTemp = new Array();
            let icon = new Array();
            let humidity = new Array();
            let weather = new Array();
            let weatherDescription = new Array();

            for (let i=0; i < this.state.data.list.length; i++ ) {
                day.push(this.state.data.list[i].dt_txt);
                minTemp.push(Math.floor(this.state.data.list[i].main.temp_min));
                maxTemp.push(Math.round(this.state.data.list[i].main.temp_max));
                icon.push(this.state.data.list[i].weather[0].icon);
                weather.push(this.state.data.list[i].weather[0].main);
                weatherDescription.push(this.state.data.list[i].weather[0].description);
                humidity.push(this.state.data.list[i].main.humidity);
            }
            this.setState({
                city: this.state.data.city.name,
                country: this.state.data.city.country,
                day,
                today,
                minTemp,
                maxTemp,
                icon,
                weather,
                weatherDescription,
                humidity
              });
              console.log(this.state.data.city.name)
        })
        console.log(now);

      }

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
          let threeHours = [];
          let iconurl = 'https://openweathermap.org/img/w/';
          let imgext = '.png';
          let today = new Date();
          let numToday = today.toJSON();
          var now = numToday.split('T')[0];
        //   let limitNum = this.state.day.length / 5;

        for (let i=0; i < this.state.day.length; i++) {
            let holdWeekDay = document.getElementById("holdWeekDay");
            let weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            let eachDay = this.state.day[i];
            let thatDay = new Date(eachDay);
            let weekDay = thatDay.getDay();
            var time = eachDay.split(' ')[1];

            // holdWeekDay.innerHTML = "";

            if(eachDay.startsWith(now)) {

           threeHours.push(
            <div>
                <Modal show={this.state.show} handleClose={this.hideModal}>
                  <h2 style={center}>{weekDays[weekDay]}</h2>
                  {/* <h4 style={center}>{time}</h4> */}
                    <div className="holdIcon">
                        <img src={`${iconurl}${this.state.icon[i]}${imgext}`} alt="weather icon" className="weather-icon" />
                        <h3>Humidity:</h3> <p>{this.state.humidity[i]}</p>
                        <h3>Weather:</h3> <p>{this.state.weather[i]}</p>
                        <h3>Description:</h3> <p>{this.state.weatherDescription[i]}</p>
                    </div>
                    <div className="tempHighLow">
                       <h3>High:</h3> <p className="temp">{this.state.minTemp[i]}&#176;F</p>
                        <p>|</p>
                       <h3>Low:</h3> <p className="temp">{this.state.maxTemp[i]}&#176;F</p>
                    </div>
                </Modal>
              <button type="button" onClick={this.showModal} className="threeHrButtons">
                <div className="weatherCard" key={i}>
                    <h3 style={center}>{weekDays[weekDay]} {time} </h3>
                    <div className="holdIcon">
                        <img src={`${iconurl}${this.state.icon[i]}${imgext}`} alt="weather icon" />
                    </div>
                    <div className="tempHighLow">
                        <span className="temp">{this.state.minTemp[i]}&#176;F</span>
                        <span className="divider">|</span>
                        <span className="temp">{this.state.maxTemp[i]}&#176;F</span>
                    </div>   

                      {/* <h3>open</h3> */}
                </div>
              </button> 

             </div>
            );
             console.log(weekDay)
             console.log(now)
            }
            // else if (limitNum === undefined) {
            //     fivedays.push(<h3>{this.state.error}</h3>)
            // }
         }
          return (
              <div className="section" style={height}>
                  <div className="container">
                  <h1 style={center} className="titleForecast">  Today's Forecast <Link to="/" style={noUnderline} className="homeBtn"><FontAwesomeIcon icon={faHome} /></Link> </h1>
                        <div style={formStyle}>
                            <Form newLocation={this.newLocation}
                            //  givenCity={this.state.newCityValue}
                            //  givenCountry={this.state.newCountryValue}
                        /></div>
                        <div className="holdWeekDay" id="holdWeekDay">
                          <div className="hourlyForecast">
                            {threeHours}
                          </div>  
                        </div>

                        <div className="holdFCBtns">
                            <Link to="./Day5" style={noUnderline}><button className="getForecasts" style={centerBtn}>Day 5</button></Link>
                            <Link to="./FiveDayForecast" style={noUnderline}><button className="getForecasts" style={centerBtn}>5-Day Forecast</button></Link>
                            <Link to="./Day2" style={noUnderline}><button className="getForecasts" style={centerBtn}>Day 2</button></Link>
                        </div>


                  </div>
              </div>
          );
      }


}

export default FiveDayForeCast; 
