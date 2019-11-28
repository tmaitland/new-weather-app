import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Day1 from './forecast/Day1';
import Day2 from './forecast/Day2';
import Day3 from './forecast/Day3';
import Day4 from './forecast/Day4';
import Day5 from './forecast/Day5';
import FiveDayForecast from './forecast/FiveDayForecast';
// import ThreeHourForecast from './forecast/ThreeHourForecast';
import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

export const routing = (
    <Router>
      <div>
        <Route exact path="/" component={App} />
        <Route exact path="/forecast/FiveDayForecast" component={FiveDayForecast} />
        {/* <Route exact path="/forecast/ThreeHourForecast" component={ThreeHourForecast} /> */}
        <Route exact path="/forecast/Day1" component={Day1} />
        <Route exact path="/forecast/Day2" component={Day2} />
        <Route exact path="/forecast/Day3" component={Day3} />
        <Route exact path="/forecast/Day4" component={Day4} />
        <Route exact path="/forecast/Day5" component={Day5} />
        {/* <Route path="/users" component={Users} />
        <Route path="/contact" component={Contact} /> */}
      </div>
    </Router>
  )

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
