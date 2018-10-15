import React from 'react';
import { Row, Col } from 'antd';


// 直接在html代码中引入的图片不会被webpack打包，必须JS引入，或者css/less中引入
const logoImg = require('../../assets/images/logo.png');
export default class PCHeader extends React.Component {
    render () {
        return (
            <header>
                <Row>
                    <Col span={2}></Col>
                    <Col span={4}>
                        <a href="/" className="logo">
                            <img src={logoImg} alt="logo"/>
                            <h1>ReactNews</h1>
                        </a>
                    </Col>
                    <Col span={16}></Col>
                    <Col span={2}></Col>
                </Row>
            </header>
        );
    }
}