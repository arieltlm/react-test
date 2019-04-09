import React, {Component} from 'react';


export default class CommentInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            content: ''
        }
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

    handleSubmit = () => {
        const {username, content} = this.state;
        this.props.handleSubmit && this.props.handleSubmit({username, content})
        this.setState({content: ''})
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
                        onChange={this.handleChange(1)}/>
                    </div>
                </div>
                <div className='comment-field'>
                    <span className='comment-field-name'>评论内容：</span>
                    <div className='comment-field-input'>
                        <textarea 
                         value={content}
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