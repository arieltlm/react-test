import React from 'react';
// toggle组件
class Toggle extends React.Component{
    constructor (props) {
        super(props);
        this.state = {
            isToggleOn: true
        };
        // this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick (e, flag) {
        console.log(flag);
        this.setState((prevState) => ({
            isToggleOn: !prevState.isToggleOn
        }));
    }

    render () {
        return (
            <button onClick={(e) => {this.handleClick(e, this.state.isToggleOn)}}>
                {this.state.isToggleOn ? 'ON' : 'OFF'}
            </button>
        )
    }
}

export default Toggle;