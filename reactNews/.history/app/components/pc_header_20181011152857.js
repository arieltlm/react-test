import React from 'react';
import { Row, Col } from 'antd';

export default class PCHeader extends React.Component {
  render () {
    return (
      <header>
        <Row>
          <Col span={2}></Col>
          <Col span={4}>
            <a href="/" className="logo">
              <img src="../assets/images/news.png" alt="logo"/>
              <span>ReactNews</span>
            </a>
          </Col>
          <Col span={2}></Col>
        </Row>
      </header>
    );
  }
}