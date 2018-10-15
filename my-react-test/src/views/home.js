import React from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Link
} from 'react-router-dom';

const Page2 = ({ match }) => {
  return (
    <div>
      <h2>this is page2</h2>
      <ul>
        <li><Link to={`${match.url}/rendering`}>Rendring with React</Link></li>
        <li>
          <Link to={`${match.url}/components`}>Components</Link>
        </li>
        <li>
          <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
        </li>
        <li>
          <Link to={`${match.url}/cool`}>Cool</Link>
        </li>
      </ul>
      <FadingRoute path={`${match.url}/cool`} exact component={Hello}/>
      <Route path={`${match.url}/:topicId`} component={Topic} />
      <Route
        exact
        path={match.url}
        render={() => <h3>Please select a topic.</h3>}
      />
     
    </div>
  );
};
// // 包装/合成  (此处还有问题。。。。为何Hello组件不渲染呢 TODO)
const FadingRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    <Component {...props}/>
  )}/>
);

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
);
const Hello = () => (
  <div>
    <h3>
      hello world
    </h3>
  </div>
);

Page2.propTypes = {
  match: PropTypes.object
};
Topic.propTypes = {
  match: PropTypes.object
};
FadingRoute.propTypes = {
  component: PropTypes.func
};

export default Page2;