import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from './react-redux'

class ThemeSwitch extends Component {
    static propTypes = {
        themeColor: PropTypes.string,
        onSwitchColor: PropTypes.func
    }
    handleSwitchColor (color) {
        if (this.props.onSwitchColor) {
            this.props.onSwitchColor(color)
        }
    }
    render () {
        return (
            <div>
                <button style={{ color: this.props.themeColor }}
                onClick={this.handleSwitchColor.bind(this, 'red')}>Red</button>
                <button style={{ color: this.props.themeColor }}
                onClick={this.handleSwitchColor.bind(this, 'blue')}>Blue</button>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
      onSwitchColor: (color) => {
        dispatch({ type: 'CHANGE_COLOR', themeColor: color })
      }
    }
}
const mapStateToProps = (state) => {
    return {
        themeColor: state.themeColor
    }
}
ThemeSwitch = connect(mapStateToProps, mapDispatchToProps)(ThemeSwitch)
export default ThemeSwitch;