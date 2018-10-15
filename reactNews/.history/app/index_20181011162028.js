import React from 'react';
import ReactDOM from 'react-dom';

// antd 目前的默认文案是英文,antd 提供了一个 React 组件 LocaleProvider 用于全局配置国际化文案, 配置中文
// <LocaleProvider locale={zh_CN}><div>nihao</div> /></LocaleProvider>
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';

// 组件
import PcHeader from './components/pcPages/pc_header';

import './assets/styles/app.scss';

ReactDOM.render((
    <LocaleProvider locale={zh_CN}>
        <div>
            <PcHeader />
        </div>
    </LocaleProvider>
), document.getElementById('app'));
