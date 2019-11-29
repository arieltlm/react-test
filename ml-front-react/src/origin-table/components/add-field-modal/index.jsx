/**
 * 功能：原始表字段-增加字段
 * 作者：tlm
 * 日期： 2019-07-29
 */
import { React, PropTypes, PureComponent, Helper } from 'framework/Util'
import { Modal, Form, Input, Button } from 'antd'
import config from 'conf'

import WarningModal from '@/components/warning-modal'

import './scss/index.scss'

const { constant: { addFieldformItemLayout } } = config

class AddField extends PureComponent{
    constructor(props) {
        super(props)
        this.state = {
            fieldsValue: {},
        }
    }

    handleSubmit= (e) => {
        e.preventDefault()
        const { form, handleWarningModalShow, callBackFn } = this.props

        form.validateFields((err, fieldsValue) => {
            if (!err) {
                this.setState({
                    fieldsValue
                })
                handleWarningModalShow()
            }
            callBackFn()
        })
    }

    validateEnName =(rule, value, callback) => {
        if (value) {
            if (!Helper.validateEnField(value)){
                callback('字段英文名不能为空，只能以英文字母开始，包含英文字母和数字，长度小于等于32！')
            }
        }
        callback()
    }

    validateCnName =(rule, value, callback) => {
        if (value) {
            if (!Helper.validateCnField(value)){
                callback('字段中文名不能为空且长度小于等于64！')
            }
        }
        callback()
    }

    render() {
        const { 
            form: { getFieldDecorator }, 
            visible, 
            warningModalVisible,
            handleCancel,
            handleAddFieldSubmit,
            handleWarningModalClose
        } = this.props
        const { fieldsValue } = this.state
        return (
            <Modal
                title="增加字段"
                visible={visible}
                centered
                onCancel={handleCancel}
                styleName="add-field"
                closable={false}
                footer={null}
                width={600}
                maskClosable={false}
            >
                <Form {...addFieldformItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="字段英文名">
                        {getFieldDecorator('attrNameEn', {
                            rules: [
                                { required: true, message: '请输入字段英文名!' },
                                {
                                    validator: this.validateEnName,
                                }],
                        })(
                            <Input type="text" placeholder="请输入字段英文名" />,
                        )}
                    </Form.Item>
                    <Form.Item label="字段中文名">
                        {getFieldDecorator('attrNameCn', {
                            rules: [
                                { required: true, message: '请输入字段中文名!' },
                                { validator: this.validateCnName }
                            ]
                        })(
                            <Input type="text" placeholder="请输入字段中文名" />,
                        )}
                    </Form.Item>
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
                {warningModalVisible
               && (
                   <WarningModal
                       visible={warningModalVisible} 
                       handleCancel={handleWarningModalClose}
                       handleSubmits={() => handleAddFieldSubmit(fieldsValue)}
                   />
               )
                } 
            </Modal>
        )
    }
}

AddField.propTypes = {
    visible: PropTypes.bool.isRequired,
    warningModalVisible: PropTypes.bool.isRequired,
    form: PropTypes.object.isRequired,
    handleCancel: PropTypes.func.isRequired,
    handleAddFieldSubmit: PropTypes.func.isRequired,
    handleWarningModalClose: PropTypes.func.isRequired,
    handleWarningModalShow: PropTypes.func.isRequired,
    callBackFn: PropTypes.func.isRequired,
}

const AddFields = Form.create()(AddField)

export default AddFields
