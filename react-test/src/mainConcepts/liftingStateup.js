import React from "react";
/**
 * 根据水温计算水是否煮沸
 *
 * @param {*} props
 * @returns
 */
function BoilIs (props) {
    const celsius = props.celsius;
    if (celsius >= 100) {
        return <p>The water would boil!</p>
    }
    return <p>The water would not boil!</p>
}
class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     temperature: ''
        // }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange (e) {
        this.props.onTempratureChange(e.target.value);
    }
    render () {
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
            <legend>Enter temperature in {scaleName[scale]}:</legend>
                <input type="text" value={temperature}
                onChange={this.handleChange}/>
            </fieldset>
        )
    }
}
const scaleName = {
    'c': 'Celisus',
    'f': 'Fahrenheit'
}

function toCelsisu(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}
function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
    const input = parseFloat(temperature);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}
class Calculator extends React.Component {
    constructor(props) {
        super (props);
        this.state = {
            temperature: '',
            scale: 'c'
        };
        this.handleCelsius = this.handleCelsius.bind(this);
        this.handleFahrenheit = this.handleFahrenheit.bind(this);
    }
    handleCelsius (temperature) {
        this.setState({
            temperature, scale: 'c'
        })
    }
    handleFahrenheit (temperature) {
        this.setState({
            temperature, scale: 'f'
        })
    }
    render () {
        const temperature = this.state.temperature;
        const cTemp = this.state.scale === 'f' ? tryConvert(temperature, toCelsisu) : temperature;
        const fTemp = this.state.scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;
        return (
            <div className="twoTemp">
                <TemperatureInput scale='c' temperature={cTemp}  onTempratureChange={this.handleCelsius}/>
                <TemperatureInput scale='f' temperature={fTemp}  onTempratureChange={this.handleFahrenheit}/>
                <BoilIs celsius={parseFloat(cTemp)}></BoilIs>
           </div>
        )
    }
}

export default Calculator;