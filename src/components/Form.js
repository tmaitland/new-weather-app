import React from "react";


const Form = props => (
	<form onSubmit={props.newLocation} method="GET">
		<input type="text" name="newCity" className="cityCountry" placeholder="City..."/>
		<input type="text" name="newCountry" className="cityCountry" placeholder="Country..."/>
		<button className="getWeather">Get Weather</button>
	</form>
);

export default Form;