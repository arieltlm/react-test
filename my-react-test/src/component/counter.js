import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {increment, descement} from '../redux/action';

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.handledesc = this.handledesc.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this); 
  }
  handledesc () {
    this.props.descement();
  }
  handleIncrement () {
    this.props.increment();
  }
  render () {
    return (
      <div>
        <span>{this.props.number}</span><br />
        <button onClick={this.handleIncrement}>加一</button>
        <button onClick={this.handledesc}>减一</button>
      </div>
    );
  }
}
Counter.propTypes = {
  number:PropTypes.number.isRequired,
  descement: PropTypes.func.isRequired,
  increment: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  console.log(state);
  //   const {number} = state;
  //   return {number};
  const number = state;
  return {number};
};
  
const mapDispatchToProps = dispatch => {
  return bindActionCreators({increment, descement}, dispatch);
};
  
const hoc = connect(mapStateToProps, mapDispatchToProps)(Counter);
export {hoc as Counter};