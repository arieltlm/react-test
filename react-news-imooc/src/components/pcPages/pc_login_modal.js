import React from 'react';
import { 
    Icon,
    Modal,
    Form,
    Input,
    Tabs,
    Button} from 'antd';

import PropTypes from 'prop-types';

import {formItemLayout} from '../../utils/StyleUtil';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class LoginModal extends React.Component {
    getItemsValue = ()=>{    //3、自定义方法，用来传递数据（需要在父组件中调用获取数据）
        const valus= this.props.form.getFieldsValue();       //4、getFieldsValue：获取一组输入控件的值，如不传入参数，则获取全部组件的值
        return valus;
    }
    render () {
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                title="用户中心"
                visible={this.props.modalVisible}
                onOk={this.props.handleOk}
                onCancel={this.props.handleCancel}
                okText="关闭"
                centered={true}
                wrapClassName={'login-box'}
            >
                <Tabs type="card"
                defaultActiveKey="1"
                onChange={this.props.onChangeTab}>
                    <TabPane tab="登陆" key="1">
                            <Form onSubmit={this.props.handleSubmit} className="login-form" horizontal="true">
                                <FormItem label="用户名" {...formItemLayout}>
                                    {getFieldDecorator('userName', {
                                        rules: [{ required: true, message: '请输入你的用户名!' }],
                                    })(
                                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                                    )}
                                </FormItem>
                                <FormItem label="密码" {...formItemLayout}>
                                    {getFieldDecorator('password', {
                                        rules: [{ required: true, message: '请输入你的密码!' }],
                                    })(
                                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                                    )}
                                </FormItem>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    登陆
                                </Button>
                            </Form>
                        </TabPane>
                    <TabPane tab="注册" key="2">
                        <Form onSubmit={this.props.handleSubmit} className="login-form" horizontal="true">
                            <FormItem label="用户名" {...formItemLayout}>
                                {getFieldDecorator('r_userName', {
                                    rules: [{ required: true, message: '请输入你的用户名!' }],
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                                )}
                            </FormItem>
                            <FormItem label="密码" {...formItemLayout}>
                                {getFieldDecorator('r_password', {
                                    rules: [{ required: true, message: '请输入你的密码!' }],
                                })(
                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                                )}
                            </FormItem>
                            <FormItem label="确认密码" {...formItemLayout}>
                            {getFieldDecorator('r_confirmPassword', {
                                    rules: [{ required: true, message: '请再次输入你的密码!' }],
                                })(
                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                                )}
                            </FormItem>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                注册
                            </Button>
                        </Form>
                    </TabPane>
                </Tabs>
            </Modal>
        );
    }
}
LoginModal.propTypes = {
    form: PropTypes.object,
    modalVisible: PropTypes.bool,
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
    handleSubmit: PropTypes.func,
    onChangeTab: PropTypes.func,
};

const hoc = Form.create()(LoginModal);

export {hoc as LoginModal};