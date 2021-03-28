import React from "react";
import Day1 from "../forecast/Day1";
import Day2 from "../forecast/Day2";
import Day3 from "../forecast/Day3";
import Day4 from "../forecast/Day4";
import Day5 from "../forecast/Day5";
import FiveDayForecast from "../forecast/FiveDayForecast";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


const Form = props => (
	<form onSubmit={props.newLocation} method="GET">
		<input type="text" defaultValue={'Miami'} name="newCity" className="cityCountry" placeholder="City..."/>
		<input type="text" defaultValue={'USA'} name="newCountry" className="cityCountry" placeholder="Country..."/>
		<button className="getWeather"><FontAwesomeIcon icon={faSearch} /></button>
	</form>
);

export default Form; 