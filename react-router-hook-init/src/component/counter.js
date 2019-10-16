// 加react-action之后的

import React from 'react';
import PropTypes from 'prop-types';
// import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// import {increment, descement} from '../redux/action';
import action from '../redux/action';

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
    const {num} = this.props;
    this.props.increment(num);
  }
  render () {
    const {num, number} = this.props;
    return (
      <div>
        <span>{number}</span><br />
        <button onClick={this.handleIncrement}>加{num}</button>
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

// 原来的redux使用
/* const mapStateToProps = state => {
  console.log(state);
    const {number} = state;
    return {number}; // mapStateToProps必须返回一个对象
};
  
const mapDispatchToProps = dispatch => {
  return bindActionCreators({increment, descement}, dispatch);
};
  
const hoc = connect(mapStateToProps, mapDispatchToProps)(Counter);
export {hoc as Counter}; */

// 加了redux-acitons之后的
const hoc = connect((state) => {
    return {number: state.number}
}, {
    increment: action.increment,
    descement: action.descement
})(Counter);
export {hoc as Counter};