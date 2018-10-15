import React from 'react';

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