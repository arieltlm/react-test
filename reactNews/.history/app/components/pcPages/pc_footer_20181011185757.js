import React from 'react';
import { Row, Col} from 'antd';

export default class PCFooter extends React.Component {
    render () {
        return (
            <header>
                <Row>
                    <Col span={2}></Col>
                    <Col span={4}>
                        @copy &nbsp; {new Date()} ReactNews.  All Rights Reserved.
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </header>
        );
    }
}