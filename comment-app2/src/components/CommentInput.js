import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class CommentInput extends Component {
    static propTypes = {
        username: PropTypes.any,
        handleSubmit: PropTypes.func,
        onUserNameInputBlur: PropTypes.func
    }
    static defaultProps = {
        username: ''
    }
    constructor(props) {
        super(props);
        this.state = {
            username: props.username,
            content: ''
        }
    }
    componentDidMount() {
        this.textComment.focus();
    }
    handleChange = (param) => (e) => {
        this.setState({
            [param]: e.target.value
        })
    }
    handleSaveUserName = (e) => {
        if(this.props.onUserNameInputBlur) {
            this.props.onUserNameInputBlur(e.target.value)
        }
    }
    handleSubmit = () => {
        const {username, content} = this.state;
        this.props.handleSubmit && this.props.handleSubmit({username, content,createdTime: +new Date()})
        this.setState({content: ''})
    }
    handleKeySubmit = (e) => {
        // 回车提交评论
        if(e.nativeEvent.keyCode === 13) {
            this.handleSubmit()
        }
    }
    
    render() {
        const {username, content} = this.state;
        return (
            <div className='comment-input'>
                <div className='comment-field'>
                    <span className='comment-field-name'>用户名：</span>
                    <div className='comment-field-input'>
                        <input 
                        value={username}
                        onBlur={this.handleSaveUserName}
                        onChange={this.handleChange('username')}/>
                    </div>
                </div>
                <div className='comment-field'>
                    <span className='comment-field-name'>评论内容：</span>
                    <div className='comment-field-input'>
                        <textarea 
                            ref={(textComment) => this.textComment = textComment}
                            value={content}
                            onKeyPress={this.handleKeySubmit}
                            onChange={this.handleChange('content')}/>
                    </div>
                </div>
                <div className='comment-field-button'>
                    <button onClick={this.handleSubmit}>
                        发布
                    </button>
                </div>
            </div>
        )
    }
}

