import React from 'react';
import {CounterHook} from '../component/counter-hook';
import {Counter} from '../component/counter';

class Page1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 1,
    }
  }
  handleChange = (e) => {
    this.setState({number: e.target.value})
  }
  render () {
    const { number } = this.state;
    return (
      <div>
        <input type="text" value={number} onChange={this.handleChange}/>
        <div><span>此次加值：</span><span>{number}</span></div>
        <Counter num={number}/>
        <hr/>
        <h2>CounterHook实现的:</h2>
        <CounterHook num={number}/>
      </div>
    );
  }
}
export default Page1;