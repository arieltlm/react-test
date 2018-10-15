import React from 'react';
import { 
    Row,
    Col,
    Menu,
    Icon,
    Modal,
    Form,
    Input,
    Checkbox,
    Button} from 'antd';

// 直接在html代码中引入的图片不会被webpack打包，必须JS引入，或者css/less中引入
const logoImg = require('../../assets/images/logo.png');


const FormItem = Form.Item;

class PCHeader extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            current: 'top',
            hasLogined: false,
            userNickName: '',
            modalVisible: false,
        };
        this.handleClick = this.handleClick.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
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
        const { getFieldDecorator } = this.props.form;

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
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <FormItem>
                                {getFieldDecorator('userName', {
                                    rules: [{ required: true, message: 'Please input your username!' }],
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: 'Please input your Password!' }],
                                })(
                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                                )}
                            </FormItem>
                            <FormItem>
                                {getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(
                                    <Checkbox>Remember me</Checkbox>
                                )}
                                <a className="login-form-forgot" href="">Forgot password</a>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Log in
                                </Button>
                                    Or <a href="">register now!</a>
                            </FormItem>
                        </Form>
                    </Modal>
                    <Col span={2}></Col>
                </Row>
            </header>
        );
    }
}

export default PCHeader = Form.create()(PCHeader);
