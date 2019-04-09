import React, {Component} from 'react';
import PropTypes from 'prop-types';


export default class CommentInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            content: ''
        }
    }
    componentWillMount() {
        this._loadUserName();
    }
    componentDidMount() {
        this.textComment.focus();
    }
    _saveUserName(username) {
        localStorage.setItem('username', username)
    }
    _loadUserName() {
        const {username} = localStorage;
        username && this.setState({username})
    }
    handleChange = (flag) => (e) => {
        if(flag === 1) {
            this.setState({
                username: e.target.value
            })
        } else {
            this.setState({
                content: e.target.value
            })
        }
    }
    handleSaveUserName = (e) => {
        this._saveUserName(e.target.value)
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
                        onChange={this.handleChange(1)}/>
                    </div>
                </div>
                <div className='comment-field'>
                    <span className='comment-field-name'>评论内容：</span>
                    <div className='comment-field-input'>
                        <textarea 
                            ref={(textComment) => this.textComment = textComment}
                            value={content}
                            onKeyPress={this.handleKeySubmit}
                            onChange={this.handleChange(2)}/>
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

CommentInput.propTypes = {
    handleSubmit: PropTypes.func
}