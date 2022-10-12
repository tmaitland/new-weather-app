import React from "react";

let iconurl = 'https://openweathermap.org/img/w/';
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
    padding: '0rem'
}

const weatherInfo = {
	display: 'flex',
	justifyContent: 'center',
}

const CityWeather = props => (
	<div className="weather__info" style={weatherInfo}>
		<table style={tableStyles}>
			{	
				props.city && props.country && props.icon && <tr className="weather__key cityLocation frontPageWeather" style={capitalize}><h4 className="cityAndIcon">{ props.city }, { props.country } </h4> <img src={`${iconurl}${ props.icon }${imgext}`} alt="weather icon" className="weather_icon" />
					{/* <td className="weather__value ">  </td> */}
				</tr> 
			}

			{ 	
				props.temperature && <tr className="weather__key"><td><h4>Temperature:</h4> </td> 
					<td className="weather__value"> { Math.round(props.temperature) }&#176;F</td>
				</tr> 
			}
			{ 	
				props.humidity && <tr className="weather__key"><td><h4>Humidity: </h4></td> 
					<td className="weather__value"> { props.humidity }% </td>
				</tr> 
			}
			{ 	
				props.weather && <tr className="weather__key"><td><h4>Weather:</h4>  </td>
					<td className="weather__value" style={capitalize} > { props.weather } </td>
				</tr> 
			}

			{ 	
				props.description && <tr className="weather__key"><td><h4>Conditions:</h4>  </td>
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
