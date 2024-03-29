import React from 'react';
import ReactDOM from 'react-dom';
import Form from '../components/Form';
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
    textDecoration: 'none',
    color: 'black'
}
const noUnderlineHome = {
    textDecoration: 'none',
    // color: 'black'
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
           error: undefined,
        };
    }
    getWeather = () => {
        const api_call = `https://api.openweathermap.org/data/2.5/forecast?q=${this.state.givenCity},${this.state.givenCountry}&appid=${APPID}&units=imperial`;

        axios.get(api_call).then(response => {
            this.setState({
                data: response.data
            });

            let day = [];
            let minTemp = [];
            let maxTemp = [];
            let icon = [];
            let humidity = [];

            for (let i=0; i < this.state.data.list.length; i++ ) {
                day.push(this.state.data.list[i].dt_txt);
                minTemp.push(Math.floor(this.state.data.list[i].main.temp_min));
                maxTemp.push(Math.round(this.state.data.list[i].main.temp_max));
                icon.push(this.state.data.list[i].weather[0].icon);
                humidity.push(this.state.data.list[i].main.humidity);
            }
            this.setState({
                city: this.state.data.city.name,
                country: this.state.data.city.country,
                day,
                minTemp,
                maxTemp,
                icon,
                humidity
              });
        })

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
          let fivedays = [];
          let iconurl = 'https://openweathermap.org/img/w/';
          let imgext = '.png';
          let limitNum = this.state.day.length / 5;

        for (let i=0; i < this.state.day.length; i = i + limitNum) {
            let weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            let dayForecast = [];
              dayForecast[8] = 'Day1';
              dayForecast[16] = 'Day2'; 
              dayForecast[24] = 'Day3'; 
              dayForecast[32] = 'Day4'; 
              dayForecast[40] = 'Day5';


            let eachDay = this.state.day[i];
            let thatDay = new Date(eachDay);
            let weekDay = thatDay.getDay();
            if(eachDay) {

            fivedays.push(
            <Link style={noUnderline} to = {`./${dayForecast[i + limitNum]}`}><div className="five4castcard">
                <h3>{weekDays[weekDay]}</h3>
                <div className="holdIcon">
                    <img src={`${iconurl}${this.state.icon[i]}${imgext}`} alt="weather icon" />
                </div>
                <div className="tempHighLow">
                    <span className="temp">{this.state.minTemp[i]}&#176;F</span>
                    <span>|</span>
                    <span className="temp">{this.state.maxTemp[i]}&#176;F</span>
                </div>    
            </div>
            </Link>
            );
             console.log(weekDay)
            }
            else if (limitNum === undefined) {
                fivedays.push(<h3>{this.state.error}</h3>)
            }
         }
          return (
              <div className="section" style={height}>
                  <div className="container">
                        <h1 style={center} className="titleForecast">5-Day Forecast <Link to="/" style={noUnderlineHome} className="homeBtn"><FontAwesomeIcon icon={faHome} /></Link></h1>
                        <div style={formStyle}><Form newLocation={this.newLocation}/></div>
                        <div className="holdWeekDay">
                            <div className="fiveDays">
                                {fivedays}
                            </div>
                        </div>
                        <Link to="/" style={noUnderline}><button className="getForecasts" style={centerBtn}>Go Home</button></Link>


                  </div>
              </div>
          );
      }


}

export default FiveDayForeCast; 
