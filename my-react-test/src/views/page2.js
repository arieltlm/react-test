import React from 'react';
import PropTypes from 'prop-types';

class Page2 extends React.Component {
  constructor (props){
    super(props);
  }
  render () {
    console.log(this.props.match);
    return (
      <div>
        <p>this is Page2</p>
      </div>
    );
  }
}
Page2.propTypes = {
  match: PropTypes.object
};
export default Page2;