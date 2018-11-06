import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

import MediaQuery from 'react-responsive';

// antd 目前的默认文案是英文,antd 提供了一个 React 组件 LocaleProvider 用于全局配置国际化文案, 配置中文
// <LocaleProvider locale={zh_CN}><div>nihao</div> /></LocaleProvider>
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

// 组件
import PCIndex from './components/pcPages/pc_index';
import MobileIndex from './components/mobilePages/mobile_index';
import PCNewsDetails from './components/pcPages/pc_news_details';
import MobileNewsDetails from './components/mobilePages/mobile_news_details';

import './assets/styles/app.scss';


ReactDOM.render((
    <LocaleProvider locale={zh_CN}>
        <div>
            <MediaQuery query="(min-device-width: 1224px)">
                <Router>
                    <Switch>
                        <Route exact={true} path="/" component={PCIndex}></Route>
                        <Route path="/details/:uniquekey" component={PCNewsDetails}></Route>
                    </Switch>
                </Router>
            </MediaQuery>
            <MediaQuery query="(max-device-width: 1224px)">
                <Router>
                    <Switch>
                        <Route exact={true} path="/" component={MobileIndex}></Route>
                        <Route path="/details/:uniquekey" component={MobileNewsDetails}></Route>
                    </Switch>
                </Router>
            </MediaQuery>
        </div>
    </LocaleProvider>
), document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
