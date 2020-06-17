import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect,
  Switch,
} from 'react-router-dom';
import createAppStore from './redux/index';
import {Provider} from 'react-redux';

import Home from './views/home';
import Page1 from './views/page1';
import Page2 from './views/page2';
import useState from './views/useState';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={createAppStore()}>
    <Router basename="/" >
      <div className="main-wapper">
        <div className="nav-box">
            <NavLink to="/home" activeClassName="li-active">home</NavLink>
            <NavLink exact to="/page1" activeClassName="li-active">page1</NavLink>
            <NavLink exact to="/page2" activeClassName="li-active">page2</NavLink>
            <NavLink exact to="/useState" activeClassName="li-active">useState test</NavLink>
        </div>
        <div className="content-box">
        <Switch>
            <Route path="/home" component={Home} />
            <Route path="/page1" component={Page1} />
            <Route path="/page2" component={Page2} />
            <Route path="/useState" component={useState} />
            <Redirect to="/home" />
        </Switch>
        </div>
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
