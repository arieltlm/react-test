/**
 * 功能：原始表-启动流弹框
 * 作者：tlm
 * 日期： 2019-07-29
 */
import { React, PropTypes, PureComponent } from 'framework/Util'
import { Modal, Form, Input, Button } from 'antd'
import config from 'conf'

import './scss/index.scss'

const { constant: { streamformItemLayout } } = config

class StartModal extends PureComponent{
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    
    formSet = () => {
        const { form: { getFieldDecorator }, paramsData } = this.props
        const formItem = []
        for (const item in paramsData) {
            if (Object.prototype.hasOwnProperty.call(paramsData, item)) {
                formItem.push(
                    <Form.Item label={item} key={item}>
                        {getFieldDecorator(item, {
                            initialValue: paramsData[item],
                            rules: [
                                {
                                    required: true,
                                    message: `请输入${item}!`,
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                )
            }
        }
        return formItem
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { form, handlePost } = this.props

        form.validateFields((err, fieldsValue) => {
            if (!err) {
                console.log(fieldsValue)
                handlePost(fieldsValue)
            }
        })
    }

    render() {
        const { handleCancel, visible, title } = this.props
        
        return (
            <Modal
                title={`启动${title}`}
                visible={visible}
                styleName="start-stream"
                closable={false}
                width={600}
                maskClosable={false}
                footer={null}
            >
                <Form {...streamformItemLayout} onSubmit={this.handleSubmit}>
                    {this.formSet()}
                    <Form.Item
                        className="footer-btn-group"
                        wrapperCol={{
                            xs: { span: 24, offset: 0 },
                            sm: { span: 16, offset: 8 },
                        }}
                    >
                        <Button onClick={handleCancel}>取消</Button> 
                        <Button type="primary" htmlType="submit">确认</Button>
                    </Form.Item>
                </Form>  
            </Modal>
        )
    }
}

StartModal.propTypes = {
    form: PropTypes.object.isRequired,
    paramsData: PropTypes.object.isRequired,
    handlePost: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
}

const StartModals = Form.create()(StartModal)

export default StartModals
