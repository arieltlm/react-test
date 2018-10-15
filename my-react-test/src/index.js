import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
} from 'react-router-dom';
import createAppStore from './redux/index';
import {Provider} from 'react-redux';

import Home from './views/home';
import Page1 from './views/page1';
import Page2 from './views/page2';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={createAppStore()}>
    <Router basename="/">
      <div>
        <div className="nav-box">
          <ul>
            <li>
              <NavLink exact to="/home" activeClassName="li-active">home</NavLink>
            </li>
            <li>
              <NavLink to="page1" activeClassName="li-active">page1</NavLink>
            </li>
            <li>
              <NavLink exact to="page2" activeClassName="li-active">page2</NavLink>
            </li>
          </ul>
        </div>
        <div className="content-box">
          <Route path="/home" component={Home} />
          <Route path="/page1" component={Page1} />
          <Route path="/page2" component={Page2} />
        </div>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
