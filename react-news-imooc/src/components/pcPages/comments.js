import React from 'react';
import { Row, Col, Form} from 'antd';


const FormItem = Form.Item;
const { TextArea } = Input;
class Comments extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="comments">
                <Row>
                    <Col span={2}></Col>
                    <Col span={20}>
                        <Form onSubmit={this.handleSubmit.bind(this)}>
                            <FormItem label="您的评论">
                                {getFieldDecorator('comments', {
                                    rules: [{ required: true, message: '请输入评论!' }],
                                })(
                                    <TextArea rows={4}  />
                                )}
                            </FormItem>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                提交评论
                            </Button>
                        </Form>
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </div>
        );
    }
}

const Comments = Form.create()(Comments);
export default Comments;