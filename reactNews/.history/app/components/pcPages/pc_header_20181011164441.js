import React from 'react';
import { Row, Col, Menu, Icon} from 'antd';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


// 直接在html代码中引入的图片不会被webpack打包，必须JS引入，或者css/less中引入
const logoImg = require('../../assets/images/logo.png');
export default class PCHeader extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            current: 'top'
        };
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick () {

    }
    render () {
        return (
            <header>
                <Row>
                    <Col span={2}></Col>
                    <Col span={4}>
                        <a href="/" className="logo">
                            <img src={logoImg} alt="logo"/>
                            <span>ReactNews</span>
                        </a>
                    </Col>
                    <Col span={16}>
                        <Menu
                            onClick={this.handleClick}
                            selectedKeys={[this.state.current]}
                            mode="horizontal"
                        >
                        
                        </Menu>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </header>
        );
    }
}