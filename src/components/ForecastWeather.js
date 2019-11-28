import React from "react";

let iconurl = 'http://openweathermap.org/img/w/';
let imgext = '.png';

const capitalize = {
    textTransform: 'capitalize'
}

const tableStyles = {
	width: '80%',
    textAlign: 'left',
    /* display: flex; */
    /* flex-direction: column; */
    /* justify-content: center; */
    padding: '2rem 2rem'
}

const weatherInfo = {
	display: 'flex',
	justifyContent: 'center',
}

const ForecastWeather = props => (
	<div className="weather__info" style={weatherInfo}>
		<table style={tableStyles}>
			{
				props.icon && <tr className="weather__key"><td> Icon:</td>
					<td><img src={`${iconurl}${ props.icon }${imgext}`} alt="weather icon" className="weather_icon" /></td>
				</tr>
			}
			{	
				props.city && props.country && <tr className="weather__key"><td>Location:</td> 
					<td className="weather__value"> { props.city }, { props.country }</td>
				</tr> 
			}
			{ 	
				props.minTemp && <tr className="weather__key"><td>Low Temperature: </td> 
					<td className="weather__value"> { Math.round(props.minTemp) }&#176;F</td>
				</tr> 
			}
			{ 	
				props.maxTemp && <tr className="weather__key"><td>High Temperature: </td> 
					<td className="weather__value"> { Math.round(props.maxTemp) }&#176;F</td>
				</tr> 
			}
			{ 	
				props.humidity && <tr className="weather__key"><td>Humidity: </td> 
					<td className="weather__value"> { props.humidity }% </td>
				</tr> 
			}
			{ 	
				props.day && <tr className="weather__key"><td> Day: </td>
					<td className="weather__value" style={capitalize} > { props.day } </td>
				</tr> 
			}
		
		</table>
   
	 { 
	 	props.error && <p className="weather__error">{ props.error }</p>  
	 }
	
	
	 
	 
	</div>
);

export default ForecastWeather;