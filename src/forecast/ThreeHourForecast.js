import React from 'react';
import ReactDOM from 'react-dom';

const divStyle = {
    // width:'100%',   
    // color: '#000066',
    color:'white',
    backgroundColor: 'black'
}

 const left = {
     float: 'left',
     backgroundSize: '100% 100%',
     backgroundPosition: 'center',
     backgroundRepeat:'no-repeat',
     backgroundColor:'#66ccff',
     width:'100%',
     height: '800px'
 }
//  const left1 = {
//      float: 'left',
//      backgroundSize: '100% 100%',
//      backgroundPosition: 'center',
//      backgroundRepeat:'no-repeat',
//      backgroundColor:'white',
//      width:'50%',
//      height: '800px'
//  }
const OpenWeatherMapHelper = require("openweathermap-node");
const helper = new OpenWeatherMapHelper({
    APPID: '9347522dfc18eb6dc577618e6c9e8db1',
    units:"imperial"
});

class ThreeHourForecast extends React.Component{ 
    constructor(props) {
        super(props);

        this.state = {
            dates: new Array(),
            mins : new Array(),
            maxs : new Array(),
            icons: new Array(),
            dayNum: props.dayNum,
            dateReq: props.dayNum    

        }
        this.getWeatherData();
    }
    getWeatherData(){
        let dates = this.state.dates;
        let mins = this.state.mins;
        let maxs = this.state.maxs;
        let icons = this.state.icons;
        let dayNum = this.state.dayNum;
        let dateReq = this.state.dayNum;

        dates = new Array();
        mins = new Array();
        maxs = new Array();
        icons = new Array();
        // dayNum = new Array();
        
        
        
        helper.getThreeHourForecastByCityName("Miami", (err,threeHourForecast) => {
            if (err){
                console.log(err);
        
            }else{
                for (let i=0;i < threeHourForecast.list.length; i++ ) {
                    dates.push(threeHourForecast.list[i].dt_txt);
                    mins.push(Math.floor(temperatureConverter(threeHourForecast.list[i].main.temp_min)));
                    maxs.push(Math.floor(temperatureConverter(threeHourForecast.list[i].main.temp_max)));
                    icons.push(threeHourForecast.list[i].weather[0].icon);
                }
            }
            console.log(dates.length);
            console.log(mins.length);
            console.log(maxs.length);
            console.log(icons.length);


           
          
            var today = new Date();
            dayNum = today.getDay();
            // this.setState({dayNum});

            this.setState({
                dates: dates,
                mins: mins,
                maxs: maxs,
                icons: icons,
                dayNum: dayNum,
                dateReq: '2019-07-23'
            });

        });


        
        function temperatureConverter(valNum) {
            valNum = parseFloat(valNum);
            return((valNum-273.15)*1.8)+32;
        }
    }


    render(){
        const items = [];

        let iconurl = 'http://openweathermap.org/img/w/';

        let imgext = '.png';

        let cityName = <input type="text" id="cityName" />;
        

        for (let i=0; i < this.state.dates.length; i++) {
           if(this.state.dates[i].startsWith(this.state.dateReq)) {
           items.push(<tr><td>{this.state.dates[i]}</td><td><img src={`${iconurl}${this.state.icons[i]}${imgext}`} alt="weather icon" /></td><td>{this.state.mins[i]}</td><td>{this.state.maxs[i]}</td></tr>)
            console.log(items)
           }
        }
        return(
            <div style ={divStyle}>
                <div style={left}>

                    <h1> Today's Weather Information:</h1>
                    <br/>
                    <table border="1">
                        <tr><td>Date</td><td>Weather</td><td>Min</td><td>Max</td></tr>
                        {items}
                    </table>
                </div>


            </div>
        );
    }
}

export default ThreeHourForecast;