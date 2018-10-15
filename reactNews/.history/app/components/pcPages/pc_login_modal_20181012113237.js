import React from 'react';
import { 
    Icon,
    Modal,
    Form,
    Input,
    Checkbox,
    Button} from 'antd';

import PropTypes from 'prop-types';

const FormItem = Form.Item;

export default class LoginModal extends React.Component {
    constructor (props) {
        super(props);
    }
   
    render () {
        const { getFieldDecorator } = this.props.form;
        return (
            <Modal
                title="用户中心"
                visible={this.props.modalVisible}
                onOk={this.props.handleOk}
                onCancel={this.props.handleCancel}
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
        );
    }
}
LoginModal.propTypes = {
    form: PropTypes.object,
    modalVisible: PropTypes.bool,
    handleOk: PropTypes.func,
    handleCancel: PropTypes.func,
};