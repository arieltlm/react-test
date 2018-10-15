import React from 'react';
import { 
    Row,
    Col,
    Menu,
    Icon,
    Modal,
    Button} from 'antd';

// 直接在html代码中引入的图片不会被webpack打包，必须JS引入，或者css/less中引入
const logoImg = require('../../assets/images/logo.png');
export default class PCHeader extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            current: 'top',
            hasLogined: false,
            userNickName: '',
            modalVisible: false,
        };
        this.handleClick = this.handleClick.bind(this);
        this.this.showModal = this.this.showModal.bind(this);
    }
    handleClick (e) {
        this.setState({
            current: e.key
        });
    }
    showModal () {
        this.setState({
            modalVisible: true
        });
    }
    handleOk () {
        this.setState({
            modalVisible: false
        });
    }
    handleCancel () {
        this.setState({
            modalVisible: false
        });
    }
    render () {
        const userShow = this.state.hasLogined
            ? <Menu.Item key="logout" className="log">
                <span>{this.state.userNickName}</span>
                {/* <Link> */}
                <Button type="dashed">个人中心</Button>
                {/* </Link> */}
                <Button> 退出</Button>
            </Menu.Item> 
            :<Menu.Item key="register" className="log" onClick={this.showModal}>
                <Icon type="appstore"/>注册/登录
            </Menu.Item> ;
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
                            <Menu.Item key="top">
                                <Icon type="appstore" />头条
                            </Menu.Item>
                            <Menu.Item key="shehui">
                                <Icon type="appstore" />社会
                            </Menu.Item>
                            <Menu.Item key="guonei">
                                <Icon type="appstore" />国内
                            </Menu.Item>
                            <Menu.Item key="yule">
                                <Icon type="appstore" />娱乐
                            </Menu.Item>
                            <Menu.Item key="tiyu">
                                <Icon type="appstore" />体育
                            </Menu.Item>
                            <Menu.Item key="keji">
                                <Icon type="appstore" />科技
                            </Menu.Item>
                            <Menu.Item key="shishang">
                                <Icon type="appstore" />时尚
                            </Menu.Item>
                            {userShow}
                        </Menu>
                    </Col>
                    <Modal
                        title="用户中心"
                        visible={this.state.modalVisible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        okText="确定"
                    >
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                        <p>Some contents...</p>
                    </Modal>
                    <Col span={2}></Col>
                </Row>
            </header>
        );
    }
}