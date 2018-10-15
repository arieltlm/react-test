import React from 'react';
import { Row, Col, Menu, Icon} from 'antd';

// 直接在html代码中引入的图片不会被webpack打包，必须JS引入，或者css/less中引入
export default class PCHeader extends React.Component {
    render () {
        return (
            <header>
                <Row>
                    <Col span={2}></Col>
                    <Col span={4}>
                        @copy &nbsp; {new Date()}  All Right re
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </header>
        );
    }
}