import React from 'react';
function BiolingVerdict(props){
    const celsius = props.celsius;
    if (celsius >= 100) {
        return <p>The water would boil!</p>;
    }
    return <p>The water would not boil!</p>;
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            temp:''
        };
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange (e) {
        this.setState({
            temp: e.target.value
        })
    }
    render () {
        return (<fieldset>
            <legend>Enter temperature in Celsius:</legend>
            <input type="text" 
            value={this.state.temp}
            onChange={this.handleChange}/>
            <BiolingVerdict celsius={this.state.temp}></BiolingVerdict>
        </fieldset>)
    }
}

export default Calculator;