import React from 'react';
import {Counter} from '../component/counter';

class Page1 extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <Counter />
    );
  }
}
export default Page1;