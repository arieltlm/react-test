  
// 是项目的JS打包入口文件
import React from 'react';
import ReactDOM from 'react-dom';
// 导入项目的根组件
import App from './app/index.js';



ReactDOM.render(
  <App />, document.getElementById('app')
);
