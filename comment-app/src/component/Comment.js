import React, {Component} from 'react';
import PropTypes from 'prop-types';


export default class Comment extends Component {
    static propTypes = {
        createdTime: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        index: PropTypes.number,
        handleDelete: PropTypes.func
    }
    constructor(props) {
        super(props);
        this.state={
            timeString: ''
        }
    }
    componentDidMount() {
        this._updateTimeString();
        this._timer = setInterval(
            this._updateTimeString.bind(this),
            5000
        )
    }
    componentWillUnmount() {
        clearInterval(this._timer)
    }
    _updateTimeString() {
        const {createdTime} = this.props;
        const duration = (+Date.now() - createdTime) / 1000;
        this.setState({
            timeString: duration > 60
              ? `${Math.round(duration / 60)} 分钟前`
              : `${Math.round(Math.max(duration, 1))} 秒前`
          })
    }
    _getProcessedContent (content) {
        return content
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
        .replace(/`([\S\s]+?)`/g, '<code>$1</code>')
    }
    handleDelete = (index) => (e) => {
        this.props.handleDelete && this.props.handleDelete(index)
    }
    render() {
        const {username, content,index}  = this.props;
        return (
            <div className="comment">
                <div className="comment-user">
                    <span>{username}：</span>
                </div> 
                <p dangerouslySetInnerHTML={{
                __html: this._getProcessedContent(content)
                }} /> 
                <span className='comment-createdtime'>
                    {this.state.timeString}
                </span>
                <span className='comment-delete' onClick={this.handleDelete(index)}>
                    删除
                </span>
            </div>
        )
    }
}