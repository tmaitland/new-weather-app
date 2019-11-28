import React from 'react';
import CurrentWeather from './components/CurrentWeather';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import './App.css';



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="leftHeader">
          <div className="weatherApp-title">
            <h1>About <span className="bordered">the</span> Weather</h1>
            <p>See what the weather's like around the globe.</p>
            <Link to ='./forecast/FiveDayForecast'>
            <button className="getForecasts">View 5-Day Forecast</button>
            </Link>
            
          </div>
        </div>
        <div className="rightInfo">
          <CurrentWeather />
          
        </div>
      </header>
    </div>
  );
}

export default App;
