import React from 'react';

// 直接在html代码中引入的图片不会被webpack打包，必须JS引入，或者css/less中引入
const logoImg = require('../../assets/images/logo.png');

export default class MobileHeader extends React.Component {
    render () {
        return (
            <header>
                <a href="/" className="logo">
                    <img src={logoImg} alt="logo"/>
                    <span>ReactNews</span>
                </a>
            </header>
        );
    }
}