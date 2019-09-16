// 加react-action之后的

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
// import {increment, descement} from '../redux/action';
import action from '../redux/action';

// 原class形式的
/* class Counter extends React.Component {
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
} */
const linkArr = [11111,1414,14141241]
function CounterHook(props) {
    const {num, number,increment, descement} = props;
    const [initNum, setNum] = useState(1);

    const nowTime = new Date().toLocaleString();
    const [nowDate, setTime] = useState(nowTime)
    

    useEffect(() => {
        console.log(num)
        setNum(num); // 当输入框的num发生变化时，initNum的初始值也随之发生变化为num的值
        console.log(num)
    }, [num])


    // 那假设我需要设置完后的值做一些操作，怎么在设置完立马拿到新设置的state
    useEffect(() => {
        console.log('打印设置完的值（即当前值）【初始打印一次，然后每次打印都在下面这个console之后打印】：'+nowDate)
        const intervalTime = setInterval(() => {
            setTime(new Date().toLocaleString())
            console.log('打印的是上一次的nowDate值:' + nowDate)// 打印的是上一次的nowDate值
        }, 3000);
        return () => { // 此处不清除定时 切换页面就会出问题，定时器不会停止，所以需要在组件卸载时清除组件
            clearInterval(intervalTime)
        }
    })
    useEffect(() => {
        // 只有mount时调用这里
        console.log('只有mount时调用这里：'+nowDate)
    },[]) // []代表依赖的数据

    // 两种定义方法均可
    function handleReset(){
        setNum(1)
    }
    const handleReset5 = () => {
        setNum(5)
    }
    const [activeLiIndex, setActiveLiIndex] = useState(0) 
    const handleClick = (index) => {
        setActiveLiIndex(index)
    }
    return (
        <div>
          <span>{number}</span><br />
          <button onClick={() => increment(num)}>加{num}</button>
          <button onClick={descement}>减一</button>
          <hr/>
          <div>
                <span>当前值：{initNum}</span>
                <button onClick={() => setNum(initNum * 2 )}>2倍</button>
                <button onClick={handleReset}>重置为1</button>
                <button onClick={handleReset5}>重置为5</button>
          </div>

          <div>
              <h4>显示当前时间</h4>
              <p>{nowDate}</p>
          </div>
          <ul>
          {linkArr.map((item, index) => (
                <li
                    key={item.path} 
                    role="presentation"
                    onClick={() => handleClick(index)} 
                    className={`${index === activeLiIndex ? ' active' : ''}`}
                >
                    nibobobobob
                </li>
            ))}
          </ul>
        </div>
      );
}


CounterHook.propTypes = {
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
})(CounterHook);
export {hoc as CounterHook};