import React from "react";

let iconurl = 'http://openweathermap.org/img/w/';
let imgext = '.png';

const capitalize = {
    textTransform: 'capitalize'
}

const tableStyles = {
	width: '80%',
	textAlign: 'left',
	color: 'black',
    /* display: flex; */
    /* flex-direction: column; */
    /* justify-content: center; */
    padding: '2rem 2rem'
}

const weatherInfo = {
	display: 'flex',
	justifyContent: 'center',
}

const CityWeather = props => (
	<div className="weather__info" style={weatherInfo}>
		<table style={tableStyles}>
			{	
				props.city && props.country && <tr className="weather__key"><td>Location:</td> 
					<td className="weather__value" style={capitalize}> { props.city }, { props.country }</td>
				</tr> 
			}
			{
				props.icon && <tr className="weather__key"><td> Icon:</td>
					<td><img src={`${iconurl}${ props.icon }${imgext}`} alt="weather icon" className="weather_icon" /></td>
				</tr>
			}
			{ 	
				props.temperature && <tr className="weather__key"><td>Temperature: </td> 
					<td className="weather__value"> { Math.round(props.temperature) }&#176;F</td>
				</tr> 
			}
			{ 	
				props.humidity && <tr className="weather__key"><td>Humidity: </td> 
					<td className="weather__value"> { props.humidity }% </td>
				</tr> 
			}
			{ 	
				props.description && <tr className="weather__key"><td> Conditions: </td>
					<td className="weather__value" style={capitalize} > { props.description } </td>
				</tr> 
			}
		
		</table>
   
	 { 
	 	props.error && <p className="weather__error">{ props.error }</p>  
	 }
	
	
	 
	 
	</div>
);

export default CityWeather;