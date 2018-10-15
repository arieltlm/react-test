import React from 'react';
import ReactDOM from 'react-dom';

import MediaQuery from 'react-responsive';

// antd 目前的默认文案是英文,antd 提供了一个 React 组件 LocaleProvider 用于全局配置国际化文案, 配置中文
// <LocaleProvider locale={zh_CN}><div>nihao</div> /></LocaleProvider>
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

// 组件
import PCIndex from './components/pcPages/pc_index';
import MobileIndex from './components/mobilePages/mobile_index';

import './assets/styles/app.scss';

ReactDOM.render((
    <LocaleProvider locale={zh_CN}>
        <div>
            
            <MobileIndex />
            <MediaQuery query="(min-device-width: 1824px)">
                <PCIndex />
            </MediaQuery>
            <MediaQuery query="(max-width: 1224px)">
                <div>You are sized like a tablet or mobile phone though</div>
            </MediaQuery>
        </div>
    </LocaleProvider>
), document.getElementById('app'));
