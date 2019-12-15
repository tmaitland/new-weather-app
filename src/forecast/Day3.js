import React from 'react';
import ReactDOM from 'react-dom';
import Form from '../components/Form';
import '../App.css';
import axios from 'axios';
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
            error: undefined,
        };
      }
        


    getWeather = () => {
        const api_call = `http://api.openweathermap.org/data/2.5/forecast?q=${this.state.givenCity},${this.state.givenCountry}&appid=${APPID}&units=imperial`;
        let today = new Date();
        let numToday = today.toJSON();
        var now = numToday.split('T')[0];

        axios.get(api_call).then(response => {
            this.setState({
                data: response.data
            });
            console.log(response.data)

            let day = [];
            let minTemp = [];
            let maxTemp = [];
            let icon = [];
            let humidity = [];

            for (let i=0; i < this.state.data.list.length; i++ ) {
                day.push(this.state.data.list[i].dt_txt);
                minTemp.push(Math.floor(this.state.data.list[i].main.temp_min));
                maxTemp.push(Math.floor(this.state.data.list[i].main.temp_max));
                icon.push(this.state.data.list[i].weather[0].icon);
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
          let iconurl = 'http://openweathermap.org/img/w/';
          let imgext = '.png';
          let today = new Date();
          let thirdDay = new Date(today);
          thirdDay.setDate(today.getDate()+2);
          let dayThree = thirdDay.toJSON();
          dayThree = dayThree.split('T')[0];
        //   let limitNum = this.state.day.length / 5;

        for (let i=0; i < this.state.day.length; i++) {
            let holdWeekDay = document.getElementById("holdWeekDay");
            let weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            let eachDay = this.state.day[i];
            let thatDay = new Date(eachDay);
            let weekDay = thatDay.getDay();
            var time = eachDay.split(' ')[1];

            // holdWeekDay.innerHTML="";
            
            if(eachDay.startsWith(dayThree)) {
            
           threeHours.push(
            <div className="weatherCard">
                <h3 style={center}>{weekDays[weekDay]} {time} </h3>
                <div className="holdIcon">
                    <img src={`${iconurl}${this.state.icon[i]}${imgext}`} alt="weather icon" />
                </div>
                <div className="tempHighLow">
                    <span className="temp">{this.state.minTemp[i]}&#176;F</span>
                    <span className="temp">{this.state.maxTemp[i]}&#176;F</span>
                </div>    
            </div>
            );
             console.log(weekDay);
             console.log(this.state.day.length);
            }
            // else if (limitNum === undefined) {
            //     fivedays.push(<h3>{this.state.error}</h3>)
            // }
         }
          return (
              <div className="section" style={height}>
                  <div className="container">
                        <h1 style={center}>Day Three's Forecast</h1>
                        <div style={formStyle}><Form newLocation={this.newLocation}/></div>
                        <div className="holdWeekDay">{threeHours}</div>
                        <div className="holdFCBtns">
                            <Link to="/" style={noUnderline}><button className="getForecasts" style={centerBtn}>Go Back Home</button></Link>
                            <Link to="./FiveDayForecast" style={noUnderline}><button className="getForecasts" style={centerBtn}>Go Back to 5-Day</button></Link>
                        </div>
                       
                      
                  </div>
              </div>
          );
      }
    
  
}

export default FiveDayForeCast;