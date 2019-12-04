import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
    NavLink,
    withRouter
} from 'react-router-dom';

import Home from './views/home';
import Page1 from './views/page1';
import Page2 from './views/page2';
import Page3 from './views/page3';
import Page4 from './views/page4';

import './style.css';

ReactDOM.render(
    <Router basename="/">
        <div className="router-box">
            <div className="nav-box">
                <ul>
                    <li>
                        <NavLink exact to="/" activeClassName="li-active">home</NavLink>
                    </li>
                    <li>
                        <NavLink to="page1" activeClassName="li-active">page1</NavLink>
                    </li>
                    <li>
                        <NavLink exact to="page2" activeClassName="li-active">page2</NavLink>
                    </li>
                    <li>
                        <NavLink exact to="page3" activeClassName="li-active">page3</NavLink>
                    </li>
                    <li>
                        <NavLink exact to="page4" activeClassName="li-active">websocket</NavLink>
                    </li>
                </ul>
            </div>
            <div className="content-box">
                <Route path="/" exact component={Home} />
                <Route path="/page1" component={Page1} />
                <Route path="/page2" component={Page2} />
                <Route path="/page3" component={Page3} />
                <Route path="/page4" component={Page4} />
            </div>
        </div>
    </Router>,
    document.getElementById('app')
)

