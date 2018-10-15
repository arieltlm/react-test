import React from 'react';

class Reservation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isGoing: true,
            numberIfGusets: 2
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }
    render() {
        return (
            <form>
                <label>IsGoing:
                    <input type="chechbox"
                    name="isGoing"
                    checked={this.state.isGoing}
                    onChange={this.handleInputChange}/>
                </label>
                <br />
                <label>
                    <input type="number"
                    name="numberIfGusets"
                    value={this.state.numberIfGusets}
                    onChange={this.handleInputChange}/>
                </label>
            </form>
        );
    }
}
export default Reservation;