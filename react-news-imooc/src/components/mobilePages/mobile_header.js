import React from 'react';
import { 
    Icon,
    // Form,
    message} from 'antd';

// 组件
import {LoginModal} from '../pcPages/pc_login_modal';
// 直接在html代码中引入的图片不会被webpack打包，必须JS引入，或者css/less中引入
const logoImg = require('../../assets/images/logo.png');

export default class MobileHeader extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            action: 'login',
            current: 'top',
            hasLogined: false,
            userNickName: '',
            userid: '0',
            modalVisible: false,
        };
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeTab = this.onChangeTab.bind(this);
    }
    componentWillMount () {
        if(localStorage.userid !== '') {
            this.setState({
                hasLogined: true,
                userNickName: localStorage.username,
                userid: localStorage.userid
            })
        }
    }
    // modal的显示隐藏
    setModalVisible(value) {
        this.setState({
            modalVisible: value
        });
    }
    showModal() {
        this.setModalVisible(true);
    }
    handleOk() {
        this.setModalVisible(false);
    }
    handleCancel() {
        this.setModalVisible(false);
    }
    onChangeTab (activeKey) {
        if (activeKey === '1') {
            this.setState({
                action: 'login'
            })
        } else {
            this.setState({
                action: 'register'
            })
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        // this.props.form.validateFields((err, values) => {
        //     if (!err) {
        //         console.log('Received values of form: ', values);
        //     } else {
        //         console.log();
        //     }
        // });
        console.log(this.formRef.getItemsValue()); 
        // this.props.getFormRef(this.formRef.getItemsValue());
        const myFetchOptions = {
            methods: 'GET'
        };
        let formData = this.formRef.getItemsValue();
        console.log(formData);
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action +
        "&username=" + formData.userName + "&password=" + formData.password +
        "&r_userName="+formData.r_userName+"&r_password="+formData.r_password+"&r_confirmPassword="+formData.r_confirmPassword,
        myFetchOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            this.setState({userNickName: data.NickUserName, userid: data.UserId})
            localStorage.username = data.NickUserName;
            localStorage.userid = data.UserId;
        })
        if (this.state.action === 'login') {
            this.setState({
                hasLogined: true
            })
        }
        message.success('请求成功！');
        this.setModalVisible(false);
    }
    login () {
        this.setModalVisible(true);
    }
    logout () {
        localStorage.username = '';
        localStorage.userid = '';
        this.setState({
            hasLogined: false
        })
    }
    render () {
        const userShow = this.state.hasLogined ?
		// <Link>
			<Icon type="inbox" onClick={this.logout.bind(this)}/>
		:
		<Icon type="setting" onClick={this.login.bind(this)}/>
        return (
            <div id="mobileHeader">
                <header>
                    <img src={logoImg} alt="logo"/>
                    <span>ReactNews</span>
                    {userShow}
                </header>
                
                <LoginModal
                    modalVisible={this.state.modalVisible}
                    handleOk={this.handleOk}
                    handleCancel={this.handleCancel}
                    handleSubmit={this.handleSubmit}
                    wrappedComponentRef={(form) => this.formRef = form}  //5、使用wrappedComponentRef 拿到子组件传递过来的ref（官方写法）
                ></LoginModal>
            </div>
        );
    }
}